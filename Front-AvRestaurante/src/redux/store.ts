import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"

//PRATELEIRA, COMO SE FOSSE UM REPOSITOR

export const store = configureStore({
    reducer: {
        auth : authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;