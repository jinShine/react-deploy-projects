import { useForm } from "react-hook-form";
import { Button, Input } from "antd";
import styled from "@emotion/styled";

export default function EmailLogin() {
  const { register, handleSubmit, formState } = useForm();
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>안녕하세요</Title>
      </TitleWrapper>

      <FormWrapper>
        <InputField placeholder="이메일 입력" {...register("email")} />
        <InputPasswordField
          placeholder="비밀번호 입력"
          {...register("password")}
        />
        <LoginButton>로그인</LoginButton>
      </FormWrapper>
      <JoinInfoWrapper>
        <JoinHelpTitle>아직 계정이 없으신가요?</JoinHelpTitle>
        <MoveToJoinButton>회원가입</MoveToJoinButton>
      </JoinInfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const InputField = styled(Input)`
  height: 46px;
  margin-top: 16px;
`;

const InputPasswordField = styled(Input.Password)`
  height: 46px;
  margin-top: 16px;
`;

const LoginButton = styled(Button)`
  height: 52px;
  background-color: ${(props) => props.theme.text.primary};
  color: white;
  font-size: 16px;
  font-weight: 800;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const JoinInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const JoinHelpTitle = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.text.tertiary};
  margin-right: 12px;
`;

const MoveToJoinButton = styled.span`
  color: ${(props) => props.theme.text.primary};
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
`;
