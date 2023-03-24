import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { IconTitle } from "../ui/icon-title";

export default function GlobalNavigationBar() {
  return (
    <Wrapper>
      <LogoWrapper>Logo</LogoWrapper>
      <IconWrapper>
        <IconTitle title="로그인">
          <UserOutlined />
        </IconTitle>
        <IconTitle title="장바구니" count={0}>
          <ShoppingCartOutlined />
        </IconTitle>
      </IconWrapper>
    </Wrapper>
  );
}

////////////////////////////////
// styled

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 74px;
  background-color: white;
  padding: 0 24px;
`;

const LogoWrapper = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
