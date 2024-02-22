import { createSlice } from "@reduxjs/toolkit";

interface WriteState {
  contents: string;
}

const initialState: WriteState = {
  contents: "",
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    writeContents(state, action) {
      state.contents = action.payload;
    },
  },
});

export const { writeContents } = writeSlice.actions;
export default writeSlice.reducer;
