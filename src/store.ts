import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { reactorReducer } from "./slices/reactorSlice"
import { useDispatch } from 'react-redux';
import userReducer from './slices/userSlice'; 
import { stationsReducer } from './slices/stationsSlice'
import { stationmanyReducer } from "./slices/stationmanySlice";

export const store = configureStore({
    reducer: combineReducers({
        reactor: reactorReducer,
        user: userReducer,
        station: stationsReducer,
        stations: stationmanyReducer
    })
})

export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch с поддержкой thunk
export type AppDispatch = typeof store.dispatch;

// Кастомный хук useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();