import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, UseFormHandleSubmit } from "react-hook-form";
import { emailLoginSchema, IFormInput } from "./EmailLogin.types";
import {
  ErrorMessage,
  FormWrapper,
  InputField,
  InputPasswordField,
  JoinHelpTitle,
  JoinInfoWrapper,
  LoginButton,
  MoveToJoinButton,
  Title,
  TitleWrapper,
  Wrapper,
} from "./EmailLogin.styles";
import { ChangeEvent } from "react";

interface IProps {
  onClickSubmit: (data: IFormInput) => void;
  onClickJoin: () => void;
}

export default function EmailLoginUI(props: IProps) {
  const { handleSubmit, control, formState } = useForm<IFormInput>({
    resolver: yupResolver(emailLoginSchema),
    mode: "onSubmit",
  });

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>안녕하세요</Title>
      </TitleWrapper>
      <FormWrapper onSubmit={handleSubmit(props.onClickSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              placeholder="이메일 입력"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage>{formState.errors.email?.message}</ErrorMessage>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputPasswordField
              placeholder="비밀번호 입력"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
        <LoginButton htmlType="submit">로그인</LoginButton>
      </FormWrapper>
      <JoinInfoWrapper>
        <JoinHelpTitle>아직 계정이 없으신가요?</JoinHelpTitle>
        <MoveToJoinButton onClick={props.onClickJoin}>
          회원가입
        </MoveToJoinButton>
      </JoinInfoWrapper>
    </Wrapper>
  );
}
