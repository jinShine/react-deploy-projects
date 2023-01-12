import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../api/http";
import { actionType } from "./actionType";

/* Init value */
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  post: {},
};

/* Thunk */
export const __getPosts = createAsyncThunk(
  actionType.posts.GET_POSTS,
  async (_, thunkAPI) => {
    try {
      const result = await http.get(process.env.REACT_APP_BASE_URL + "/posts");
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postPost = createAsyncThunk(
  actionType.posts.POST_POST,
  async (post, thunkAPI) => {
    try {
      const result = await http.post(
        process.env.REACT_APP_BASE_URL + "/posts",
        post
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  actionType.posts.GET_POST,
  async (postID, thunkAPI) => {
    try {
      const result = await http.get(
        process.env.REACT_APP_BASE_URL + `/posts/${postID}`
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  actionType.posts.DELETE_POST,
  async (postID, thunkAPI) => {
    try {
      await http.delete(process.env.REACT_APP_BASE_URL + `/posts/${postID}`);
      return thunkAPI.fulfillWithValue(postID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updatePost = createAsyncThunk(
  actionType.posts.PUT_POST,
  async (post, thunkAPI) => {
    try {
      const result = await http.patch(
        process.env.REACT_APP_BASE_URL + `/posts/${post.id}`,
        post
      );

      if (result.status === 200) {
        thunkAPI.dispatch(__getPosts());
      }

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* Reducer */

/*
(builder) => {
      builder
      .addCase(__getPosts.pending, (state) => {state.isLoading = true;})
      .addCase(__getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(__getPosts).rejected, (state, action) => {
        state.isLoading = false;
      state.error = action.payload;
      }

    }
*/
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // POST 목록 조회
    [__getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // POST 생성
    [__postPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__postPost.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__postPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // POST 조회
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // POST 삭제
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.id !== parseInt(action.payload)
      );
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // POST 수정
    [__updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
