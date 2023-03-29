import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "src/commons/store";

export const useMoveToPage = () => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const push = (path: string, seconds: number = 0, callback?: () => void) => {
    setVisitedPage(path);
    setTimeout(() => {
      void router.push(path);
    }, seconds * 1000);
  };

  return {
    visitedPage,
    push,
  };
};
