import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userDetails/userSlice";
import marketReducer from "../redux/marketDetails/marketSlice";
import kartReducer from "../redux/marketDetails/kartSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        market:marketReducer,
        kart:kartReducer
    }
})