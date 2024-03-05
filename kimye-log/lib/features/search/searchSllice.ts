import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getSearchResult } from "@/utils/post-utils";
// import { PostData } from "@/utils/post-utils";
import { PostData } from "@/utils/format-file";
import { RawPostData, formatPostData } from "@/utils/format-file";

// First, create the thunk 공식문서 참고
/**
 * input에 입력한 검색결과로 thunk middleware
 */
export const searchPostByInput = createAsyncThunk(
  "search/fetchByInput",
  async (searchQuery: string, thunkAPI) => {
    try {
      const response = await fetch(
        `/api/search?q=${searchQuery}&page=1&limit=10`
      );
      const result = await response.json();
      const postsData = await Promise.all(
        result?.posts.map((post: RawPostData) => formatPostData(post))
      );
      return thunkAPI.fulfillWithValue(postsData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
/**
 * 클릭한 tag로 검색한 결과를 가져온다
 */
export const searchPostByTag = createAsyncThunk(
  "search/fetchByTagName",
  async (tag: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/tag?tag=${tag}&page=1&limit=10`);
      const result = await response.json();
      const postsData = await Promise.all(
        result?.posts.map((post: RawPostData) => formatPostData(post))
      );
      return thunkAPI.fulfillWithValue(postsData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// /**
//  * 최근 post를 가져온다
//  */
// export const fetchRecentPosts = createAsyncThunk(
//   "search/fetchAllPosts",
//   async (thunkAPI) => {
//     try {
//       const response = await fetch(`/api/posts`);
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return error;
//     }
//   }
// );

/**
 * type 및 initial state
 */
interface SearchState {
  posts: PostData[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
}

const initialState: SearchState = {
  posts: [],
  loading: "idle",
};

/**
 * 검색 결과 및 태그 결과를 store
 */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchPostByInput.fulfilled, (state, action) => {
      // state.posts = action.payload.result;
      state.posts = action.payload;
      state.loading = "fulfilled";
    }),
      builder.addCase(searchPostByInput.pending, (state, action) => {
        state.loading = "pending";
      }),
      //recent post
      // builder.addCase(fetchRecentPosts.fulfilled, (state, action) => {
      //   const result = action.payload.result;
      //   state.posts = result;
      //   state.loading = "fulfilled";
      // }),
      // builder.addCase(fetchRecentPosts.pending, (state, action) => {
      //   state.loading = "pending";
      // }),
      //searchByTag
      builder.addCase(searchPostByTag.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = "fulfilled";
      }),
      builder.addCase(searchPostByTag.pending, (state, action) => {
        state.loading = "pending";
      });
  },
});

export default searchSlice.reducer;
