import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./slice/serviceSlice";
import userSlice from "./slice/userSlice";
// import { api } from "../util/api";
import authSlice from "./slice/authSlice";
import areaSlice from "./slice/areaSlice";
import modelSlice from "./slice/modelSlice";
import requestSlice from "./slice/requestSlice";
import stationSlice from "./slice/stationSlice";
import paymentSlice from "./slice/paymentSlice";
import orderSlice from "./slice/orderSlice";

export const store = configureStore({
    reducer: {
        service: serviceSlice,
        accounts: userSlice,
        auth: authSlice,
        area: areaSlice,
        model: modelSlice,
        request: requestSlice,
        station: stationSlice,
        payment: paymentSlice,
        order: orderSlice,
    },
    // middleware: getDefaulMiddleWare => getDefaulMiddleWare().concat(api.middleware),
    devTools: true
})