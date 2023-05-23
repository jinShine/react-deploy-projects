import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { useInfoState } from "src/commons/store";
import {
  IMutation,
  IMutationUpdateUserArgs,
  IMutationUploadFileArgs,
} from "src/commons/types/graphql/types";
import { IUserInfo } from "src/commons/types/userInfo";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import ModifyProfileUI from "./ModifyProfile.presenter";
import { UPDATE_USER, UPLOAD_FILE } from "./ModifyProfile.queries";
import { useAuth } from "src/components/hooks/useAuth";
import { userInfo } from "os";

export default function ModifyProfile() {
  const { push } = useMoveToPage();
  const { isLoggedIn, userInfo, setUserInfo } = useAuth();
  const [toast, toastHolder] = useToast();

  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>();

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  useEffect(() => {
    if (!isLoggedIn) {
      push("/login/email");
    }
  }, []);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onClickModifyUser = async (event: MouseEvent) => {
    try {
      let picture: string | undefined;

      if (file) {
        const uploadFileResult = await uploadFile({ variables: { file } });
        picture = uploadFileResult.data?.uploadFile.url;
      } else {
        picture = userInfo?.picture ?? "";
      }

      const updateUserResult = await updateUser({
        variables: {
          updateUserInput: {
            picture,
            name,
          },
        },
      });

      const user = updateUserResult.data?.updateUser;
      const newUserInfo: IUserInfo = {
        email: user?.email,
        name: user?.name ?? "",
        picture,
      };

      setUserInfo(newUserInfo);

      toast.success("프로필 수정 완료");

      push("/mypage", 1);
    } catch (error) {
      Modal.error({ content: (error as Error).message });
    }
  };

  const onClickChangePassword = (event: MouseEvent) => {
    push("/mypage/modify/password");
  };

  return (
    <>
      {toastHolder}
      <ModifyProfileUI
        setFile={setFile}
        onChangeName={onChangeName}
        onClickModifyUser={onClickModifyUser}
        onClickChangePassword={onClickChangePassword}
      />
    </>
  );
}
