import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import JoinUI from "./Join.presenter";
import { IJoinFormInput } from "./Join.types";

export default function Join() {
  const { push } = useMoveToPage();
  const [toast, toastHolder] = useToast();

  const { join } = useAuth();

  const onClickSubmit = (data: IJoinFormInput) => {
    console.log(data);
    join(data.name, data.email, data.password).then((result) => {
      if (result.success) {
        toast.success(result.message);
        void push("/login/email", 2);
      } else {
        toast.error(result.message);
      }
    });
  };

  const onClickMoveToLogin = () => {
    void push("/login/email");
  };

  return (
    <>
      {toastHolder}
      <JoinUI
        onClickSubmit={onClickSubmit}
        onClickMoveToLogin={onClickMoveToLogin}
      />
    </>
  );
}
