import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "src/commons/types/graphql/types";
import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import EmailLoginUI from "./EmailLogin.presenter";
import { LOGIN_USER } from "./EmailLogin.queries";
import { IFormInput } from "./EmailLogin.types";

export default function EmailLogin() {
  const { push } = useMoveToPage();
  const { isLoggedIn, emailLogin } = useAuth();
  const [toast, toastHolder] = useToast();

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onClickSubmit = async (data: IFormInput) => {
    emailLogin(data.email, data.password).then(({ success, message }) => {
      console.log(success);
      toast.error(message);
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
