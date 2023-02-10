import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import commentsSlice from "../modules/commentsSlice";
import postsSlice from "../modules/postsSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { posts: postsSlice, comments: commentsSlice },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
