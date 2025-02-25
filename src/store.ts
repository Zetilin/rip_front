import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/reactorSlice"


export default configureStore({
    reducer: combineReducers({
        filter: dataReducer
    })
})