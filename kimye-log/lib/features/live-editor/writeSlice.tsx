import { createSlice } from "@reduxjs/toolkit";

interface WriteState {
  contents: string;
  publishVisible: boolean;
}

const initialState: WriteState = {
  contents: "",
  publishVisible: false,
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    writeContents(state, action) {
      state.contents = action.payload;
    },
    toggleVisible(state) {
      state.publishVisible = !state.publishVisible;
    },
  },
});

export const { writeContents, toggleVisible } = writeSlice.actions;
export default writeSlice.reducer;
