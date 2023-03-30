import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import CommentListUI from "./List.presenter";
import { FETCH_USED_ITEMS_QUESTIONS } from "./List.queries";

export default function CommentList() {
  const { push, query } = useMoveToPage();

  const { data: commentDatas, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEMS_QUESTIONS, {
    variables: { page: 0, useditemId: query.useditemId },
  });

  const onLoadMore = () => {
    if (!commentDatas) return;

    void fetchMore({
      variables: {
        page: Math.ceil(commentDatas.fetchUseditemQuestions.length / 10 + 1),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemQuestions) {
          return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };
        }

        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  const onClickUpdate = () => {};

  const onClickDelete = () => {};

  return (
    <CommentListUI
      commentDatas={commentDatas}
      onLoadMore={onLoadMore}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
    />
  );
}
