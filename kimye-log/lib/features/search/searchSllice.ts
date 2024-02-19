import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResult } from "@/utils/post-utils";
import { PostData } from "@/utils/post-utils";

// First, create the thunk 공식문서 참고
/**
 * input에 입력한 검색결과로 thunk middleware
 */
export const searchPostByInput = createAsyncThunk(
  "search/fetchByInput",
  async (searchQuery: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const result = await response.json();
      return thunkAPI.fulfillWithValue(result);
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
      const response = await fetch(`/api/tag?tag=${tag}`);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
);
/**
 * 최근 post를 가져온다
 */
export const fetchRecentPosts = createAsyncThunk(
  "search/fetchAllPosts",
  async (thunkAPI) => {
    try {
      const response = await fetch(`/api/posts`);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
);

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
      // const newPosts = action.payload.result;
      // // 중복된 게시물을 확인하고 새로운 게시물만 추가
      // newPosts.forEach((newPost: PostData) => {
      //   const existingPostIndex = state.posts.findIndex(
      //     (post) => post.slug === newPost.slug
      //   );
      //   if (existingPostIndex === -1) {
      //     state.posts.push(newPost);
      //   }
      // });
      state.posts = action.payload.result;
      state.loading = "fulfilled";
    }),
      builder.addCase(searchPostByInput.pending, (state, action) => {
        state.loading = "pending";
      }),
      //recent post
      builder.addCase(fetchRecentPosts.fulfilled, (state, action) => {
        const result = action.payload.result;
        state.posts = result;
        state.loading = "fulfilled";
      }),
      builder.addCase(fetchRecentPosts.pending, (state, action) => {
        state.loading = "pending";
      }),
      //searchByTag
      builder.addCase(searchPostByTag.fulfilled, (state, action) => {
        const result = action.payload.result;
        state.posts = result;
        state.loading = "fulfilled";
      }),
      builder.addCase(searchPostByTag.pending, (state, action) => {
        state.loading = "pending";
      });
  },
});

export default searchSlice.reducer;