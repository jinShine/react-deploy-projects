import { UseFormReturn } from "react-hook-form";

export interface ICommentInput {
  comment: string;
}

export interface ICommentWriteUIProps {
  useForm: UseFormReturn<ICommentInput, any>;
  onClickSubmit: (data: ICommentInput) => void;
}
