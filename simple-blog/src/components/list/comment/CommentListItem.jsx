import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

const CommentListItem = ({ comment, onClickDelete, onClickModify }) => {
  const [isModifyComment, setIsModifyComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const onClickModifyCancel = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onClickModifyHandler = (event) => {
    event.stopPropagation();
    onClickModify({ id: comment.id, comment: commentText });
    toggleModifyComment();
  };

  const onClickDeleteHandler = (event) => {
    event.stopPropagation();
    onClickDelete(comment.id);
  };

  const onClickModifyToggleHandler = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onChangeModifyComment = (event) => {
    setCommentText(event.target.value);
  };

  function toggleModifyComment() {
    setIsModifyComment((prev) => !prev);
  }

  useEffect(() => {
    setCommentText(comment.comment);
  }, []);

  return (
    <SWrapper>
      {isModifyComment ? (
        <>
          <Textarea
            height={30}
            value={commentText}
            onChange={onChangeModifyComment}
          />
          <div>
            <Button title={"취소"} onClick={onClickModifyCancel} />
            <Button title={"저장"} onClick={onClickModifyHandler} />
          </div>
        </>
      ) : (
        <>
          <SContentText>{comment.comment}</SContentText>
          <div>
            <Button title={"삭제"} onClick={onClickDeleteHandler} />
            <Button title={"수정"} onClick={onClickModifyToggleHandler} />
          </div>
        </>
      )}
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
