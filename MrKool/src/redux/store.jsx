import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";
// import { api } from "../util/api";
import authSlice from "./slice/authSlice";
import orderSlice from "./slice/orderSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        // [api.reducerPath]: api.reducer,
        auth: authSlice,
        order: orderSlice,
    },
    // middleware: getDefaulMiddleWare => getDefaulMiddleWare().concat(api.middleware),
    devTools: true
})