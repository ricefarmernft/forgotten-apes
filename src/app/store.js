import { configureStore } from "@reduxjs/toolkit";
import {apecoinApi} from "../services/apecoinAPI";

export default configureStore({
    reducer: {
        [apecoinApi.reducerPath]: apecoinApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apecoinApi.middleware),
})