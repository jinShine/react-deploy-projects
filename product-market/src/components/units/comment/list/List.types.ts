import { MouseEvent } from "react";
import { IQuery } from "./../../../../commons/types/graphql/types";

export interface ICommentUIProps {
  isEdit: boolean;
  commentDatas?: Pick<IQuery, "fetchUseditemQuestions">;
  pageStart: number;
  onLoadMore: (page: number) => void;
  hasMore?: boolean;
  onClickUpdate: () => void;
  onClickDelete: (event: MouseEvent<HTMLDivElement>) => void;
}
