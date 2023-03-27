import styled from "@emotion/styled";

export const EmptyImage = () => {
  return (
    <Wrapper>
      <Empty src="/images/ic-empty.svg" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: rgba(240, 240, 240, 0.8);
`;

const Empty = styled.img`
  width: 50px;
  aspect-ratio: 1;
`;
