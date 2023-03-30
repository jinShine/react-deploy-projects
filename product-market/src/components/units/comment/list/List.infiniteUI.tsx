import InfiniteScroll from "react-infinite-scroller";
import CommentListItem from "src/commons/ui/comment-list";
import { ICommentUIProps } from "./List.types";

export default function CommentInfiniteUI(props: ICommentUIProps) {
  return (
    <InfiniteScroll
      pageStart={props.pageStart}
      loadMore={props.onLoadMore}
      hasMore={props.hasMore}
      useWindow={true}
    >
      {props.commentDatas ? (
        props.commentDatas?.fetchUseditemQuestions.map((commentData) => (
          <CommentListItem
            key={commentData._id}
            isEdit={props.isEdit}
            commentData={commentData}
            onClickUpdate={props.onClickUpdate}
            onClickDelete={props.onClickDelete}
          />
        ))
      ) : (
        <></>
      )}
    </InfiniteScroll>
  );
}
