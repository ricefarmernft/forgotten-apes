import { configureStore } from "@reduxjs/toolkit";
import { etherscanApi} from "../services/apecoinAPI";

export default configureStore({
    reducer: {
        [etherscanApi.reducerPath]: etherscanApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: {
                ignoredPaths: ['items.data']
            },
            serializableCheck: {ignoredPaths: ['some.nested.paths']}
        }).concat(etherscanApi.middleware),
})