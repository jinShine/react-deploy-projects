import styled from "@emotion/styled";
import { Input } from "antd";

const { Search } = Input;

interface IProps {
  onChangeSearchbar: (value: string) => void;
}

export default function SearchBar(props: IProps) {
  return (
    <Wrapper>
      <Search
        placeholder="상품을 검색해 주세요."
        allowClear
        enterButton="검색"
        size="large"
        onSearch={props.onChangeSearchbar}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 42%;
`;
