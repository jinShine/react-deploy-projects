import styled from "@emotion/styled";
import { SyntheticEvent } from "react";
import SettingItem from "src/commons/ui/setting-item";
import { SettingData } from "./Setting.types";

interface IProps {
  onClickItem: (event: SyntheticEvent) => void;
}

export default function SettingUI(props: IProps) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>설정</Title>
      </TitleWrapper>
      <ItemWrapper>
        <SettingItem
          settingData={SettingData.modifyUserInfo}
          title="회원 정보 수정"
          showIndicator={true}
          showDivider={true}
          onClick={props.onClickItem}
        />
        <SettingItem
          settingData={SettingData.logout}
          title="로그아웃"
          onClick={props.onClickItem}
        />
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
