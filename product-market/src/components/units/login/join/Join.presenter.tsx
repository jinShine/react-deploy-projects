import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ProfileUploader from "src/commons/ui/uploads";
import * as S from "./Join.styles";
import { IJoinFormInput, joinSchema } from "./Join.types";

interface IProps {
  onClickSubmit: (data: IJoinFormInput) => void;
  onClickMoveToLogin: () => void;
}

export default function JoinUI(props: IProps) {
  const { handleSubmit, control, formState } = useForm<IJoinFormInput>({
    resolver: yupResolver(joinSchema),
    mode: "onSubmit",
  });

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>회원가입</S.Title>
      </S.TitleWrapper>
      <S.FormWrapper onSubmit={handleSubmit(props.onClickSubmit)}>
        {/* <S.ProfileUploaderWrapper>
          <ProfileUploader width={150} height={150} setFile={props.setFile} />
        </S.ProfileUploaderWrapper> */}
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <S.InputField
              placeholder="이름 입력"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <S.ErrorMessage>{formState.errors.name?.message}</S.ErrorMessage>
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
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field: { onChange, value } }) => (
            <S.InputPasswordField
              placeholder="비밀번호 확인"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <S.ErrorMessage>
          {formState.errors.passwordConfirm?.message}
        </S.ErrorMessage>
        <S.JoinButton htmlType="submit">회원가입</S.JoinButton>
      </S.FormWrapper>
      <S.LoginInfoWrapper>
        <S.LoginHelpTitle>이미 아이디가 있으신가요?</S.LoginHelpTitle>
        <S.MoveToLoginButton onClick={props.onClickMoveToLogin}>
          로그인
        </S.MoveToLoginButton>
      </S.LoginInfoWrapper>
    </S.Wrapper>
  );
}
