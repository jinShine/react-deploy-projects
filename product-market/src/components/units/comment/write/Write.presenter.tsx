import { CommentOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useAuth } from "src/components/hooks/useAuth";
import * as S from "./Write.styles";
import { ICommentWriteUIProps } from "./Write.types";

const { TextArea } = Input;

export default function CommentWriteUI(props: ICommentWriteUIProps) {
  const { isLoggedIn } = useAuth();

  const [isLoggedInState, setIsLoggedInState] = useState(false);

  useEffect(() => {
    setIsLoggedInState(isLoggedIn);
  }, []);

  return (
    <S.Wrapper>
      <S.FormWrapper onSubmit={props.useForm.handleSubmit(props.onClickSubmit)}>
        <S.SubmitButtonWrapper>
          <Space>
            <CommentOutlined />
            <span>댓글</span>
          </Space>
          {isLoggedIn && (
            <S.SubmitButton htmlType="submit">등록</S.SubmitButton>
          )}
        </S.SubmitButtonWrapper>
        <Controller
          name="comment"
          control={props.useForm.control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder={
                isLoggedInState
                  ? "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                  : "댓글을 작성하려면 로그인이 필요합니다."
              }
              showCount
              maxLength={100}
              style={{ height: 80, resize: "none" }}
              value={value}
              onChange={onChange}
              disabled={!isLoggedInState}
            />
          )}
        />
      </S.FormWrapper>
    </S.Wrapper>
  );
}
