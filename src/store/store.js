import { configureStore } from "@reduxjs/toolkit";
import { etherscanApi } from "../services/etherscanApi";
import { alchemyApi } from "../services/alchemyApi";

export default configureStore({
  reducer: {
    [etherscanApi.reducerPath]: etherscanApi.reducer,
    [alchemyApi.reducerPath]: alchemyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ["items.data"],
      },
      serializableCheck: { ignoredPaths: ["some.nested.paths"] },
    }).concat([etherscanApi.middleware, alchemyApi.middleware]),
});
