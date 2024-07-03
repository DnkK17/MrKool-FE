import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./slice/serviceSlice";
import userSlice from "./slice/userSlice";
// import { api } from "../util/api";
import authSlice from "./slice/authSlice";
import orderSlice from "./slice/orderSlice";
import areaSlice from "./slice/areaSlice";
import modelSlice from "./slice/modelSlice";

export const store = configureStore({
    reducer: {
        service: serviceSlice,
        user: userSlice,
        // [api.reducerPath]: api.reducer,
        auth: authSlice,
        order: orderSlice,
        area: areaSlice,
        model: modelSlice,
    },
    // middleware: getDefaulMiddleWare => getDefaulMiddleWare().concat(api.middleware),
    devTools: true
})