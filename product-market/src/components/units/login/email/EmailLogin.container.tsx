import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import EmailLoginUI from "./EmailLogin.presenter";
import { IEmailLoginFormInput } from "./EmailLogin.types";

export default function EmailLogin() {
  const { push } = useMoveToPage();
  const { emailLogin, fetchUserInfo } = useAuth();
  const [toast, toastHolder] = useToast();

  const onClickSubmit = async (data: IEmailLoginFormInput) => {
    emailLogin(data.email, data.password).then((result) => {
      if (result.success) {
        void push("/");
      } else {
        toast.error(result.message);
      }
    });
  };

  const onClickJoin = () => void push("/login/join");

  return (
    <>
      {toastHolder}
      <EmailLoginUI onClickSubmit={onClickSubmit} onClickJoin={onClickJoin} />
    </>
  );
}
