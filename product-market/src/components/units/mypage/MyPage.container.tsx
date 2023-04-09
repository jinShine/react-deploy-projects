import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import MyPageUI from "./MyPage.presenter";

export default function MyPage() {
  const { push } = useMoveToPage();

  const onClickModifyProfile = () => push("/mypage/modify/profile");

  return (
    <MyPageUI
      onClickModifyProfile={onClickModifyProfile}
      onClickSetting={() => push("/mypage/setting")}
    />
  );
}
