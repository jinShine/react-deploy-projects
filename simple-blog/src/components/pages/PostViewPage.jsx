import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouterPath } from "../../shared/Router";
import { __getPost, __postPost } from "../../redux/modules/postsSlice";

import styled from "styled-components";
import CommentList from "../list/comment/CommentList";
import Header from "../ui/Header";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Wrapper from "../ui/Wrapper";
import {
  __deleteComment,
  __getCommentsByTodoId,
  __postComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";

const PostViewPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postID } = useParams();
  const { isLoading, posts, error, post } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);

  const [comment, setComment] = useState("");

  const onClickCommentDeleteHandler = (commentID) => {
    console.log("댓글 삭제");
    dispatch(__deleteComment(commentID));
  };
  const onClickCommentModifyHandler = (comment) => {
    console.log("댓글 수정");
    dispatch(__updateComment({ ...comment, postId: postID }));
  };

  useEffect(() => {
    dispatch(__getPost(postID));
    dispatch(__getCommentsByTodoId(postID));
  }, []);

  return (
    <Wrapper>
      <SWrapper>
        <Header title="Jinnify 블로그" />
        <SContainer>
          <Button
            title="뒤로 가기"
            onClick={() => {
              navigate("/");
            }}
          />
          <SPostContainer>
            <STitleText>{post.title}</STitleText>
            <SContentText>{post.content}</SContentText>
          </SPostContainer>

          <SCommentLabel>댓글</SCommentLabel>
          <CommentList
            comments={comments}
            onClickDelete={onClickCommentDeleteHandler}
            onClickModify={onClickCommentModifyHandler}
          />

          <Textarea
            height={40}
            value={comment}
            placeholder={"댓글을 추가해주세요. (100자 이내)"}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            maxLength={100}
          />
          <Button
            title="댓글 작성하기"
            onClick={() => {
              if (comment) {
                const payload = { postId: post.id, comment };
                dispatch(__postComment(payload));
                setComment("");
              }
            }}
          />
        </SContainer>
      </SWrapper>
    </Wrapper>
  );
};

export default PostViewPage;

/* Style */
const SWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  max-width: calc(100% - 200px);

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const SPostContainer = styled.div`
  width: calc(100% - 32px);
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const STitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const SContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;

const SCommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
