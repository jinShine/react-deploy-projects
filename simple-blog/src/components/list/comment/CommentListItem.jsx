import React from "react";
import styled from "styled-components";

const CommentListItem = (props) => {
  const { comment } = props;

  return (
    <SWrapper>
      <SContentText>{comment.content}</SContentText>
    </SWrapper>
  );
};

export default CommentListItem;

/* Style */
const SWrapper = styled.div`
  width: calc(100% - 32px);
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;

  :hover {
    background: lightgrey;
  }
`;

const SContentText = styled.p`
  font-size: 16px;
  white-space: pre-wrap;
`;
