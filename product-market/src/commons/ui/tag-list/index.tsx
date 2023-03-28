import styled from "@emotion/styled";
import { Space, Tag } from "antd";

interface IProps {
  data?: string[] | null;
}

export const Tags = (props: IProps) => {
  return (
    <Wrapper size={[0, 0]} wrap={false}>
      {props.data!.length > 0 ? (
        props.data!.map((el, index) => (
          <TagContent key={index}>{`#${el}`}</TagContent>
        ))
      ) : (
        <Empty />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Space)`
  margin-top: 16px;
  height: 13px;
  width: 500px;
`;

const TagContent = styled(Tag)`
  font-size: 8px;
  color: ${(props) => props.theme.text.disable};
`;

const Empty = styled.div`
  height: 13px;
`;
