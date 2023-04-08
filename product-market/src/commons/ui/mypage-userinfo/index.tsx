import { SettingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button } from "antd";
import { MouseEvent } from "react";
import { useAuth } from "src/components/hooks/useAuth";

interface IProps {
  onClickSetting: (event: MouseEvent) => void;
}

export default function MyPageUserInfo(props: IProps) {
  const { userInfo } = useAuth();

  return (
    <Wrapper>
      <UserInfoWrapper>
        {userInfo?.picture ? (
          <UserProfile src={userInfo.picture} />
        ) : (
          <UserProfile src="/images/ic-profile.svg" />
        )}
        <UserWrapper>
          <UserName>{userInfo?.name}</UserName>
          <UserEmail>{userInfo?.email}</UserEmail>
        </UserWrapper>
      </UserInfoWrapper>
      <SettingButton
        shape="round"
        icon={<SettingOutlined />}
        size={"middle"}
        onClick={props.onClickSetting}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 34px;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 18px;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.text.primary};
`;

export const UserEmail = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: ${(props) => props.theme.text.tertiary};
  padding-top: 10px;
`;

export const SettingButton = styled(Button)`
  padding-top: 6px;
`;
