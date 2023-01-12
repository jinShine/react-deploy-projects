import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "../modules/commentsSlice";
import postsSlice from "../modules/postsSlice";

const store = configureStore({
  reducer: { posts: postsSlice, comments: commentsSlice },
});

export default store;
