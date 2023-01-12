import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";

const PostListItem = (props) => {
  const { post, onClickItem, onClickDelete, onClickModify } = props;

  const onClickItemHandler = () => {
    onClickItem(post);
  };
  const onClickDeleteHandler = (event) => {
    event.stopPropagation();
    onClickDelete(post);
  };
  const onClickModifyHandler = (event) => {
    event.stopPropagation();
    onClickModify(post);
  };

  return (
    <>
      <SWrapper onClick={onClickItemHandler}>
        <STitle>{post.title}</STitle>
        <Button title="삭제" onClick={onClickDeleteHandler}></Button>
        <Button title="수정" onClick={onClickModifyHandler}></Button>
      </SWrapper>
    </>
  );
};

export default PostListItem;

/* Style */
const SWrapper = styled.div`
  padding: 16px;
  border: 1px solid grey;
  cursor: pointer;
  background: white;

  &:hover {
    background: lightgray;
  }
`;

const STitle = styled.p`
  font-size: 20px;
  font-weight: 500px;
`;
