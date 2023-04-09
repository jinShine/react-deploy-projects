import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import ModifyProfileUI from "./ModifyProfile.presenter";

export default function ModifyProfile() {
  const { push } = useMoveToPage();

  const onClickChangePassword = (event: MouseEvent) => {
    console.log("######", event);
    push("/mypage/modify/password");
  };

  return <ModifyProfileUI onClickChangePassword={onClickChangePassword} />;
}
