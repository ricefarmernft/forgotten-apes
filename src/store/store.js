import { configureStore } from "@reduxjs/toolkit";
import { etherscanApi} from "../services/apecoinAPI";

export default configureStore({
    reducer: {
        [etherscanApi.reducerPath]: etherscanApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(etherscanApi.middleware),
})