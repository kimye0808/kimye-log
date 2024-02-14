import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  navbarVisible: boolean;
}

const initialState: HeaderState = {
  navbarVisible: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggle(state) {
      state.navbarVisible = !state.navbarVisible;
    },
  },
});

export const { toggle } = headerSlice.actions;
export default headerSlice.reducer;
