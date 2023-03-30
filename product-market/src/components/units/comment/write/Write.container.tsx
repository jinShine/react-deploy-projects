import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
} from "src/commons/types/graphql/types";
import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import CommentWriteUI from "./Write.presenter";
import { ICommentInput } from "./Write.types";
import { CREATE_USEDITEM_QUESTION } from "./Writer.queries";

export default function CommentWrite() {
  const { push, query } = useMoveToPage();
  const { isLoggedIn } = useAuth();

  const useFormtReturn = useForm<ICommentInput>({
    mode: "onSubmit",
  });

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USEDITEM_QUESTION);

  const onClickSubmit = async (data: ICommentInput) => {
    if (!data.comment) return;

    try {
      const result = await createUseditemQuestion({
        variables: {
          useditemId: query.useditemId,
          createUseditemQuestionInput: {
            contents: data.comment,
          },
        },
      });

      useFormtReturn.setValue("comment", "");
    } catch (error) {
      Modal.error({ content: (error as Error).message });
    }
  };

  return (
    <CommentWriteUI
      isLoggedIn={isLoggedIn}
      useForm={useFormtReturn}
      onClickSubmit={onClickSubmit}
    />
  );
}
