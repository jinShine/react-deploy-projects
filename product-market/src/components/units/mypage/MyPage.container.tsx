import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import MyPageUI from "./MyPage.presenter";

export default function MyPage() {
  const { push } = useMoveToPage();

  return <MyPageUI onClickSetting={() => push("/mypage/setting")} />;
}
