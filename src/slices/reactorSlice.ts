import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Reactor } from '../modules/NuclearApi'
import { api } from '../api'
import { REACTORS_MOCK } from '../modules/mock';

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
    loading: false
};

export const getReactorList = createAsyncThunk(
    'reactors/getReactorList',
    async (_, { getState, rejectWithValue }) => {
      const { reactor }: any = getState();
      try {
        const response = await api.reactors.getReactorList({reactor_name: reactor.searchValue});
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
      return response.data; // Возвращаем данные нового спикера
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
      return reactorId; // Возвращаем ID удаленного спикера
    } catch (error) {
      return rejectWithValue('Ошибка при удалении реактора');
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
          //.addCase(getReactorList.pending, (state) => {
          //  state.loading = true;
          //})
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
            state.reactorsData.reactors.push(action.payload); // Добавляем нового спикера в список
          })

          .addCase(deleteReactor.fulfilled, (state, action) => {
            const reactorId = action.payload;
            state.reactorsData.reactors = state.reactorsData.reactors.filter(
              (reactor) => String(reactor.id) !== reactorId
            ); // Удаляем спикера из списка
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