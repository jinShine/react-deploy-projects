import { gql, useMutation } from "@apollo/client";
import { IMutation } from "src/commons/types/graphql/types";
import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import EmailLoginUI from "./EmailLogin.presenter";
import { IEmailLoginFormInput } from "./EmailLogin.types";

export default function EmailLogin() {
  const { push } = useMoveToPage();
  const { isLoggedIn, emailLogin } = useAuth();
  const [toast, toastHolder] = useToast();

  const RESTORE_ACCESS_TOKEN = gql`
    mutation restoreAccessToken {
      restoreAccessToken {
        accessToken
      }
    }
  `;

  const [restoreAccessToken] =
    useMutation<Pick<IMutation, "restoreAccessToken">>(RESTORE_ACCESS_TOKEN);

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
