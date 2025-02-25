import {createSlice} from '@reduxjs/toolkit'
import { Reactor } from '../modules/NuclearApi'

interface ReactorsState {
    searchValue: string;
    reactors: Reactor[];
    loading: boolean;
}

const initialState: ReactorsState = {
    searchValue: '',
    reactors: [],
    loading: false,
};

const reactorsSlice = createSlice({
    name: 'reactors',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },
});

export const {setSearchValue} = reactorsSlice.actions;
export const selectSearchValue = (state: { filter: ReactorsState }) => state.filter.searchValue;
export default reactorsSlice.reducer;