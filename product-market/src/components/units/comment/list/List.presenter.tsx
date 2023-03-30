import { MouseEvent } from "react";
import { IQuery } from "src/commons/types/graphql/types";
import CommentInfiniteUI from "./List.infiniteUI";
import * as S from "./List.styles";

interface ICommonListUIProps {
  commentDatas?: Pick<IQuery, "fetchUseditemQuestions">;
  onLoadMore: (page: number) => void;
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

export default function CommentListUI(props: ICommonListUIProps) {
  return (
    <S.Wrapper>
      <CommentInfiniteUI
        isEdit={false}
        commentDatas={props.commentDatas}
        pageStart={0}
        onLoadMore={props.onLoadMore}
        hasMore={true}
        onClickUpdate={props.onClickUpdate}
        onClickDelete={props.onClickDelete}
      />
    </S.Wrapper>
  );
}
