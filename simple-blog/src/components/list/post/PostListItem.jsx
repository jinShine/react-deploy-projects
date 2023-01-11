import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";

const PostListItem = (props) => {
  const { post, onClickItem, onClickDelete } = props;

  const onClickItemHandler = () => {
    onClickItem(post);
  };
  const onClickDeleteHandler = (event) => {
    event.stopPropagation();
    onClickDelete(post);
  };

  return (
    <>
      <SWrapper onClick={onClickItemHandler}>
        <STitle>{post.title}</STitle>
        <Button onClick={onClickDeleteHandler}>삭제</Button>
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
