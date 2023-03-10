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
const darkSelector = (state) => state.darkSlice.dark;

const lostApesCountSlice = createSlice({
  name: "lostApesCount",
  initialState: 0,
  reducers: {
    setLostApesCount: (state, action) => {
      return action.payload;
    },
  },
});

const noTransfersCountSlice = createSlice({
  name: "noTransfersCountSlice",
  initialState: 0,
  reducers: {
    setNoTransfersCount: (state, action) => {
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    [etherscanApi.reducerPath]: etherscanApi.reducer,
    [alchemyApi.reducerPath]: alchemyApi.reducer,
    darkSlice: darkSlice.reducer,
    lostApesCountSlice: lostApesCountSlice.reducer,
    noTransfersCountSlice: noTransfersCountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([etherscanApi.middleware, alchemyApi.middleware]),
});

const { toggleDark } = darkSlice.actions;
const { setLostApesCount } = lostApesCountSlice.actions;
const { setNoTransfersCount } = noTransfersCountSlice.actions;

export { store, toggleDark, darkSelector };
export { setLostApesCount, setNoTransfersCount };
