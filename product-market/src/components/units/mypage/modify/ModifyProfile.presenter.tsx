import styled from "@emotion/styled";
import { Button, Input } from "antd";
import ProfileUploader from "src/commons/ui/uploads";
import { useAuth } from "src/components/hooks/useAuth";

interface IProps {}

export default function ModifyProfileUI(props: IProps) {
  const { userInfo } = useAuth();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>회원 정보 수정</Title>
      </TitleWrapper>
      <ItemWrapper>
        <ProfileWrapper>
          <ProfileUploader width={130} height={130} />
        </ProfileWrapper>
        <InputWrapper>
          <Label>이메일</Label>
          <InputField value={userInfo?.email} disabled />
        </InputWrapper>
        <InputWrapper>
          <Label>이름</Label>
          <InputField value={userInfo?.name} />
        </InputWrapper>
        <InputWrapper>
          <SettingItemWrapper>
            <ChangePassword type="text">비밀번호 변경</ChangePassword>
          </SettingItemWrapper>
        </InputWrapper>
      </ItemWrapper>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 54px;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin-top: 30px;
`;

export const Label = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => props.theme.text.primary};
  padding: 10px 0;
`;

export const InputField = styled(Input)`
  height: 46px;
  margin-top: 6px;
  font-size: 18px;
`;

export const SettingItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ChangePassword = styled(Button)`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text.tertiary};
  margin-top: 30px;
`;
