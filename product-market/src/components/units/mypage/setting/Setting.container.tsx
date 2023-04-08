import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import SettingUI from "./Setting.presenter";
import { SyntheticEvent } from "react";
import { SettingData } from "./Setting.types";
import { useAuth } from "src/components/hooks/useAuth";

export default function Setting() {
  const { push } = useMoveToPage();
  const { logout } = useAuth();

  const onClickItem = (event: SyntheticEvent) => {
    switch (Number(event.currentTarget.id)) {
      case SettingData.modifyUserInfo:
        console.log("회원 정보 수정");
        push("/");
        break;
      case SettingData.logout:
        console.log("로그아웃");
        logout();
        push("/");
        break;
    }
  };

  return <SettingUI onClickItem={onClickItem} />;
}
