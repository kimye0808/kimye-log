import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headerSlice from "./features/header/headerSlice";
import searchSllice from "./features/search/searchSllice";
import writeSlice from "./features/live-editor/writeSlice";

const rootReducer = combineReducers({
  header: headerSlice,
  search: searchSllice,
  write: writeSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
