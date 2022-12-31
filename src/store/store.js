import { configureStore, createSlice } from "@reduxjs/toolkit";
import { etherscanApi } from "../services/etherscanApi";
import { alchemyApi } from "../services/alchemyApi";

const initialState = {
  dark: false,
};

const darkSlice = createSlice({
  name: "dark",
  initialState,
  reducers: {
    toggleDark: (state) => {
      return {
        ...state,
        dark: !state.dark,
      };
    },
  },
});

const darkSelector = (state) => state.darkSlice.dark


const store = configureStore({
  reducer: {
    [etherscanApi.reducerPath]: etherscanApi.reducer,
    [alchemyApi.reducerPath]: alchemyApi.reducer,
    darkSlice: darkSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      etherscanApi.middleware,
      alchemyApi.middleware,
    ]),
});

const { toggleDark } = darkSlice.actions;


export { store, toggleDark, darkSelector };

