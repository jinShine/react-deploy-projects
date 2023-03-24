import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "src/commons/store";

export const useMoveToPage = () => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const push = (path: string) => {
    setVisitedPage(path);
    void router.push(path);
  };

  return {
    visitedPage,
    push,
  };
};
