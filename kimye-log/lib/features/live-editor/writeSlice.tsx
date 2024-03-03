import { createSlice } from "@reduxjs/toolkit";

interface WriteState {
  title: string;
  tags: string[];
  contents: string;
  // lastLine: number;
  images: string[];
  publishVisible: boolean;
}

const initialState: WriteState = {
  title: "",
  tags: [],
  contents: "",
  // lastLine: 0,
  images: [],
  publishVisible: false,
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    setReduxTitle(state, action) {
      state.title = action.payload;
    },
    setReduxTags(state, action) {
      state.tags = action.payload;
    },
    setReduxContents(state, action) {
      state.contents = action.payload;
    },
    // setReduxLineNumber(state, action) {
    //   state.lastLine = action.payload;
    // },
    setReduxImages(state, action) {
      state.images = action.payload;
    },

    toggleVisible(state) {
      state.publishVisible = !state.publishVisible;
    },
  },
});

export const {
  setReduxTitle,
  setReduxTags,
  setReduxContents,
  // setReduxLineNumber,
  setReduxImages,
  toggleVisible,
} = writeSlice.actions;
export default writeSlice.reducer;
