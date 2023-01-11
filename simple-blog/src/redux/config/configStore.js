import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../modules/postsSlice";

const store = configureStore({
  reducer: { posts: postsSlice },
});

export default store;
