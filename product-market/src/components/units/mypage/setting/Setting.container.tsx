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
        push("/mypage/modify");
        break;
      case SettingData.logout:
        logout();
        push("/");
        break;
    }
  };

  return <SettingUI onClickItem={onClickItem} />;
}
