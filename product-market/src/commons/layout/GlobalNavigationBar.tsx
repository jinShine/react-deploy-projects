import {
  DollarOutlined,
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button } from "antd";
import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { IconTitle } from "../ui/icon-title";
import { PopoverView } from "../ui/pop-over";

export default function GlobalNavigationBar() {
  const { push } = useMoveToPage();
  const { isLoggedIn, userInfo, logout } = useAuth();

  const content = (
    <PopOverWrapper>
      <PopOverTitle>{userInfo ? `${userInfo.name}님` : "로그인"}</PopOverTitle>
      <PopOverPoint>100,000P</PopOverPoint>
      <Divider />
      <Button type="text" icon={<DollarOutlined />}>
        충전하기
      </Button>
      <Divider />
      <Button type="text" icon={<ExportOutlined />} onClick={logout}>
        로그아웃
      </Button>
    </PopOverWrapper>
  );

  return (
    <Wrapper>
      <LogoWrapper onClick={() => push("/login")}>Logo</LogoWrapper>
      <IconWrapper>
        {isLoggedIn ? (
          <PopoverView content={content} trigger="click">
            <>
              <IconTitle title={userInfo ? `${userInfo.name}님` : "로그인"}>
                <UserOutlined />
              </IconTitle>
            </>
          </PopoverView>
        ) : (
          <IconTitle title={`로그인`} onClick={() => push("/login/email")}>
            <UserOutlined />
          </IconTitle>
        )}
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

const PopOverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopOverTitle = styled.span`
  font-size: 15px;
  font-weight: 800;
`;

const PopOverPoint = styled.span`
  font-size: 11px;
  font-weight: 600;
`;

const Divider = styled.div`
  background-color: ${(props) => props.theme.color.divider};
  height: 1px;
  width: 100%;
  margin: 10px 0;
`;
