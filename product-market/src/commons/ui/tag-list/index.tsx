import styled from "@emotion/styled";

interface IProps {
  width?: number;
  height?: number;
  fontSize?: number;
  data?: string[] | null;
}

export const Tags = (props: IProps) => {
  return (
    <Wrapper>
      {props.data && props.data.map((el) => <Tag>{`#${el}`}</Tag>)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
  height: 13px;
`;

const Tag = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.text.disable};
`;
