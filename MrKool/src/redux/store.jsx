import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";
// import { api } from "../util/api";
import authSlice from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        // [api.reducerPath]: api.reducer,
        auth: authSlice
    },
    // middleware: getDefaulMiddleWare => getDefaulMiddleWare().concat(api.middleware),
    devTools: true
})