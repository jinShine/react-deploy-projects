import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import EmailLoginUI from "./EmailLogin.presenter";
import { LOGIN_USER } from "./EmailLogin.queries";
import { IFormInput } from "./EmailLogin.types";

export default function EmailLogin() {
  const { push } = useMoveToPage();
  const [toast, toastHolder] = useToast();

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onClickSubmit = async (data: IFormInput) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      // 홈으로 이동
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onClickJoin = () => void push("/login/join");

  return (
    <>
      {toastHolder}
      <EmailLoginUI onClickSubmit={onClickSubmit} onClickJoin={onClickJoin} />
    </>
  );
}
