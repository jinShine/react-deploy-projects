import {
  DollarOutlined,
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Space } from "antd";
import { useAuth } from "src/components/hooks/useAuth";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { useToast } from "src/components/hooks/useToast";
import { IconTitle } from "../ui/icon-title";
import { PopoverView } from "../ui/pop-over";

export default function GlobalNavigationBar() {
  const { push } = useMoveToPage();
  const { isLoggedIn, userInfo, logout } = useAuth();
  const [toast, toastHolder] = useToast();

  const onClickLogout = () => {
    logout();

    toast.success("로그아웃 되었습니다.");
  };

  const content = (
    <PopOverWrapper>
      <PopOverTitle>{userInfo ? `${userInfo.name}님` : "로그인"}</PopOverTitle>
      <PopOverPoint>100,000P</PopOverPoint>
      <Divider />
      <Button
        type="text"
        icon={<UserOutlined />}
        onClick={() => push("/mypage")}
      >
        마이페이지
      </Button>
      <Divider />
      <Button type="text" icon={<DollarOutlined />}>
        충전하기
      </Button>
      <Divider />
      <Button type="text" icon={<ExportOutlined />} onClick={onClickLogout}>
        로그아웃
      </Button>
    </PopOverWrapper>
  );

  return (
    <Wrapper>
      {toastHolder}
      <LogoWrapper onClick={() => push("/")}>Logo</LogoWrapper>
      <Space>
        {isLoggedIn ? (
          <PopoverView content={content} trigger="click">
            <>
              <IconTitle title={userInfo ? `${userInfo.name}님` : "로그인"}>
                <UserOutlined />
              </IconTitle>
            </>
          </PopoverView>
        ) : (
          <IconTitle title="로그인" onClick={() => push("/login/email")}>
            <UserOutlined />
          </IconTitle>
        )}
        <IconTitle title="장바구니" count={0}>
          <ShoppingCartOutlined />
        </IconTitle>
      </Space>
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
