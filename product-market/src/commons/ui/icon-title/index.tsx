import styled from "@emotion/styled";
import { Badge } from "antd";

interface IProps {
  title: string;
  count?: number | null;
  children: JSX.Element;
  onClick?: () => void;
}

export const IconTitle = (props: IProps) => {
  return (
    <Wrapper onClick={props.onClick}>
      {props.count != null ? (
        <Badge count={props.count} showZero>
          <ImageWrapper>{props.children}</ImageWrapper>
        </Badge>
      ) : (
        <ImageWrapper>{props.children}</ImageWrapper>
      )}

      <Title>{props.title}</Title>
    </Wrapper>
  );
};

////////////////////////////////
// styled

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

const Title = styled.span`
  padding-top: 6px;
  font-size: 12px;
`;
