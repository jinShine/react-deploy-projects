import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as S from "./EmailLogin.styles";
import { emailLoginSchema, IEmailLoginFormInput } from "./EmailLogin.types";

interface IProps {
  onClickSubmit: (data: IEmailLoginFormInput) => void;
  onClickJoin: () => void;
}

export default function EmailLoginUI(props: IProps) {
  const { handleSubmit, control, formState } = useForm<IEmailLoginFormInput>({
    resolver: yupResolver(emailLoginSchema),
    mode: "onSubmit",
  });

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>안녕하세요</S.Title>
      </S.TitleWrapper>
      <S.FormWrapper onSubmit={handleSubmit(props.onClickSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <S.InputField
              placeholder="이메일 입력"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <S.ErrorMessage>{formState.errors.email?.message}</S.ErrorMessage>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <S.InputPasswordField
              placeholder="비밀번호 입력"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <S.ErrorMessage>{formState.errors.password?.message}</S.ErrorMessage>
        <S.LoginButton htmlType="submit">로그인</S.LoginButton>
      </S.FormWrapper>
      <S.JoinInfoWrapper>
        <S.JoinHelpTitle>아직 계정이 없으신가요?</S.JoinHelpTitle>
        <S.MoveToJoinButton onClick={props.onClickJoin}>
          회원가입
        </S.MoveToJoinButton>
      </S.JoinInfoWrapper>
    </S.Wrapper>
  );
}
