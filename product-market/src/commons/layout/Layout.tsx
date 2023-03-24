import styled from "@emotion/styled";
import GlobalNavigationBar from "./GlobalNavigationBar";

interface IProps {
  children: JSX.Element;
}

export default function Layout(props: IProps) {
  return (
    <Wrapper>
      <GlobalNavigationBar />
      {props.children}
    </Wrapper>
  );
}

////////////////////////////////
// styled

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 1000px;
  min-width: 375px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;
