import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import ModifyProfileUI from "./ModifyProfile.presenter";

export default function ModifyProfile() {
  const { push } = useMoveToPage();

  return <ModifyProfileUI />;
}
