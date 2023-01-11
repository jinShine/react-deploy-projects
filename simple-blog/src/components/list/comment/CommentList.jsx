import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

const CommentList = (props) => {
  const { comments } = props;

  return (
    <SWrapper>
      {comments &&
        comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
    </SWrapper>
  );
};

export default CommentList;

/* Style */
const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
