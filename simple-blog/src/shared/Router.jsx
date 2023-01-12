import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../components/pages/MainPage";
import PostViewPage from "../components/pages/PostViewPage";
import PostWritePage from "../components/pages/PostWritePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterPath.index} element={<MainPage />} />
        <Route path={RouterPath.postWrite} element={<PostWritePage />} />
        <Route path={RouterPath.postDetail} element={<PostViewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

export const RouterPath = {
  index: "/",
  postWrite: "/post-write",
  postWrite: "/post-write",
  postDetail: "/post/:postID",
};
