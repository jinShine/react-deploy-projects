import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const PostList = (props) => {
  const { posts, onClickItem, onClickDelete, onClickModify } = props;

  return (
    <SWrapper>
      {posts &&
        posts.map((post) => {
          return (
            <PostListItem
              key={post.id}
              post={post}
              onClickItem={onClickItem}
              onClickDelete={onClickDelete}
              onClickModify={onClickModify}
            />
          );
        })}
    </SWrapper>
  );
};

export default PostList;

/* Style */
const SWrapper = styled.div`
  width: 100%;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
