import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../api/http";
import { actionType } from "./actionType";

/* Init value */
const initialState = {
  comments: [],
  comment: {},
  isLoading: false,
  error: null,
};

/* Thunks */
export const __postComment = createAsyncThunk(
  actionType.comments.POST_COMMENT,
  async (comment, thunkAPI) => {
    try {
      const result = await http.post(
        process.env.REACT_APP_BASE_URL + "/comments",
        comment
      );
      console.log(result);

      if (result.status === 201) {
        thunkAPI.dispatch(__getCommentsByTodoId(comment.postId));
      }

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getCommentsByTodoId = createAsyncThunk(
  actionType.comments.GET_COMMENT_BY_POST_ID,
  async (postID, thunkAPI) => {
    try {
      const result = await http.get(
        process.env.REACT_APP_BASE_URL + `/comments?postId=${postID}`
      );
      console.log(result);

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  actionType.comments.DELETE_COMMENT,
  async (commentID, thunkAPI) => {
    try {
      const result = await http.delete(
        process.env.REACT_APP_BASE_URL + `/comments/${commentID}`
      );
      console.log(result);
      return thunkAPI.fulfillWithValue(commentID);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateComment = createAsyncThunk(
  actionType.comments.PUT_COMMENT,
  async (comment, thunkAPI) => {
    console.log("Payload", comment);
    try {
      const result = await http.patch(
        process.env.REACT_APP_BASE_URL + `/comments/${comment.id}`,
        comment
      );
      console.log(result);

      if (result.status === 200) {
        thunkAPI.dispatch(__getCommentsByTodoId(comment.postId));
      }

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
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
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // COMMENT 생성
    [__postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComment.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // COMMENT 조회
    [__getCommentsByTodoId.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCommentsByTodoId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getCommentsByTodoId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // COMMENT 삭제
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== parseInt(action.payload)
      );
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // COMMENT 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
