import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import ModifyPWUI from "./ModifyPW.presenter";
import { IModifyPWFormInput } from "./ModifyPW.types";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "./ModifyPw.queries";
import { IMutation } from "src/commons/types/graphql/types";
import { Modal } from "antd";
import { useToast } from "src/components/hooks/useToast";

export default function ModifyPW() {
  const { push } = useMoveToPage();
  const [toast, toastHolder] = useToast();

  const [resetPassword] =
    useMutation<Pick<IMutation, "resetUserPassword">>(RESET_PASSWORD);

  const onClickSubmit = async (data: IModifyPWFormInput) => {
    console.log(data);

    try {
      const result = await resetPassword({
        variables: {
          password: data.password,
        },
      });

      if (result.data?.resetUserPassword) {
        toast.success("변경 완료");
        push("/mypage/modify/profile", 1);
      }
    } catch (error) {
      Modal.error({ content: (error as Error).message });
    }
  };

  return (
    <>
      {toastHolder}
      <ModifyPWUI onClickSubmit={onClickSubmit} />;
    </>
  );
}
