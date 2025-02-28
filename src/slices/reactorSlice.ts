import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Reactor } from '../modules/NuclearApi'
import { api } from '../api'
import { REACTORS_MOCK, SOLOREACTOR_MOCK } from '../modules/mock';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { FETCH_REACTOR, CREATE_REACTOR } from '../modules/graphql';

interface ReactorsData {
    draft_station: number | null;
    reactors_count: string | null;
    reactors: Reactor[];
}

interface ReactorsState {
    searchValue: string;
    //reactors: Reactor[];
    reactorsData: ReactorsData;
    loading: boolean;
    currentReactor: Reactor;
}

const initialState: ReactorsState = {
    //searchValue: '',
    //reactors: [],
    //loading: false,
    searchValue: '', // Поле для поиска (если нужно)
    reactorsData: {
        draft_station: null,
        reactors_count: null,
        reactors: [],
    },
    loading: false,
    currentReactor: {
      id: 0,
      name: '',
      fuel: '',
      status: 0,
      description: '',
      image: '',
    },
};

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});



export const getReactorList = createAsyncThunk(
    'reactors/getReactorList',
    async (_, { getState, rejectWithValue }) => {
      const { reactor }: any = getState();
      const timeout = 5000;
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Запрос превысил время ожидания'));
          }, timeout);
        });
        const response = await Promise.race([ 
        api.reactors.getReactorList({reactor_name: reactor.searchValue}), timeoutPromise,
      ]);
        return response.data;
      } catch (error) {
        return rejectWithValue('Ошибка при загрузке данных');
      }
    }
);

export const updateReactor = createAsyncThunk(
  'reactors/updateReactor',
  async ({ reactorId, data }: { reactorId: string; data: Reactor }, { rejectWithValue }) => {
    try {
      const response = await api.reactors.editSingleReactor(reactorId, data);
      return response.data; // Возвращаем только данные, без заголовков
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении реактора');
    }
  }
);

export const addReactor = createAsyncThunk(
  'reactors/addReactor',
  async (data: Reactor, { rejectWithValue }) => {
    try {
      const response = await api.reactors.createReactor(data); // Предположим, что API поддерживает создание
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении реактора');
    }
  }
);

export const deleteReactor = createAsyncThunk(
  'reactors/deleteReactor',
  async (reactorId: string, { rejectWithValue }) => {
    try {
      await api.reactors.deleteSingleReactor(reactorId); // Предположим, что API поддерживает удаление
      return reactorId; 
    } catch (error) {
      return rejectWithValue('Ошибка при удалении реактора');
    }
  }
);

export const createReactor = createAsyncThunk(
  'reactor/createReactor',
  async (name: string, description: string, fuel: string, status: number, { rejectWithValue }) => {
      try {
          const response = await client.mutate({
              mutation: CREATE_REACTOR,
              variables: { name: name,
                description: description,
                fuel: fuel,
                status: status
                }
          });
          return response.data.createReactor.reactor;
      } catch {
          return rejectWithValue('Не удалось создать реактор')
      }
  }
);

export const fetchReactor = createAsyncThunk(
  'reactor/fetchReactor',
  async (reactorId: number, { rejectWithValue }) => {
      try {
          const response = await client.query({
              query: FETCH_REACTOR,
              variables: { id: reactorId },
          });
          return response.data.reactor;
      } catch {
          return rejectWithValue('Не удалось получить реактор по id')
      }
  }
);

const reactorsSlice = createSlice({
    name: 'reactors',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchReactor.fulfilled, (state, action) => {
            state.loading = false;
            state.currentReactor = action.payload
          })
          .addCase(fetchReactor.rejected, (state, action) => {
            state.loading = false;
            state.currentReactor = SOLOREACTOR_MOCK;
          })
          .addCase(getReactorList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getReactorList.fulfilled, (state, action) => {
            state.loading = false;
            state.reactorsData = action.payload;
          })
          .addCase(getReactorList.rejected, (state) => {
            state.loading = false;
            state.reactorsData.draft_station = null;
            state.reactorsData.reactors_count = null;
            state.reactorsData.reactors = REACTORS_MOCK.reactors.filter((item) =>
              item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
            );
          })
          .addCase(addReactor.fulfilled, (state, action) => {
            state.reactorsData.reactors.push(action.payload); 
          })
          //.addCase(createReactor.fulfilled, (state, action) => {
          //  state.currentReactor.
          //})

          .addCase(deleteReactor.fulfilled, (state, action) => {
            const reactorId = action.payload;
            state.reactorsData.reactors = state.reactorsData.reactors.filter(
              (reactor) => String(reactor.id) !== reactorId
            ); 
          })
          .addCase(updateReactor.fulfilled, (state, action) => {
            const updatedReactor = action.payload;
            state.reactorsData.reactors = state.reactorsData.reactors.map((reactor) =>
              reactor.id === updatedReactor.id ? updatedReactor : reactor
            );
      });
    },
});

export const {setSearchValue} = reactorsSlice.actions;
export const selectSearchValue = (state: { filter: ReactorsState }) => state.filter.searchValue;
//export default reactorsSlice.reducer;
export const reactorReducer = reactorsSlice.reducer;