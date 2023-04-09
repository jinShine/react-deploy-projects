import styled from "@emotion/styled";
import { MouseEvent } from "react";
import MyPageUserInfo from "src/commons/ui/mypage-userinfo";

interface IProps {
  onClickModifyProfile: (event: MouseEvent) => void;
  onClickSetting: (event: MouseEvent) => void;
}

export default function MyPageUI(props: IProps) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>마이페이지</Title>
      </TitleWrapper>
      <MyPageUserInfo
        onClickModifyProfile={props.onClickModifyProfile}
        onClickSetting={props.onClickSetting}
      />
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
