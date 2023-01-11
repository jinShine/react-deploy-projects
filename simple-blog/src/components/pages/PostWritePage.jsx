import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../../shared/Router";
import { __postPost } from "../../redux/modules/postsSlice";

import styled from "styled-components";
import Header from "../ui/Header";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Wrapper from "../ui/Wrapper";

const PostWritePage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const onSubmitHandler = () => {
    if (validate(title, content)) {
      const payload = { title, content };

      dispatch(__postPost(payload));
      navigate(RouterPath.index);
    }
  };

  const validate = (title, content) => {
    if (title && content) {
      alert("게시글이 등록 되었습니다.");
    } else {
      if (!title) {
        setTitleError("제목을 입력해주세요");
      }
      if (!content) {
        setContentError("내용을 입력해주세요.");
      }
    }

    return title && content;
  };

  return (
    <Wrapper>
      <SWrapper>
        <Header title="Jinnify 블로그" />
        <SContainer>
          <Textarea
            height={20}
            placeholder="제목"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            errorMessage={titleError}
          />
          <Textarea
            height={480}
            placeholder="내용"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            errorMessage={contentError}
          />
          <Button title="작성하기" onClick={onSubmitHandler} />
        </SContainer>
      </SWrapper>
    </Wrapper>
  );
};

export default PostWritePage;

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
      margin-bottom: 8px;
    }
  }
`;
