import styled from "@emotion/styled";
import { EmptyImage } from "../empty-image";

interface IProps {
  imgURL?: string | null;
  title: string;
  remarks: string;
  price: number;
  pickCount: number;
}

export const ItemCard = (props: IProps) => {
  return (
    <Wrapper>
      {props.imgURL ? (
        <Thumbnail src={props.imgURL} alt="상품 이미지" />
      ) : (
        <EmptyImage />
      )}
      <Name>{props.title ? props.title : "제목없음"}</Name>
      <Remark>{props.remarks}</Remark>
      <PriceWrapper>
        <PickWrapper>
          <PickImage src="/images/ic-heart.svg" />
          <PickCount>{props.pickCount ?? 0}</PickCount>
        </PickWrapper>
        <Price>{`${props.price?.toLocaleString()}원`}</Price>
      </PriceWrapper>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 10px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 2px 10px rgba(76, 78, 100, 0.22);
  border-radius: 10px;
  padding: 10px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.divider};
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.text.primary};
  margin-top: 4px;
  padding: 6px 0;
`;

export const Remark = styled.span`
  font-size: 11px;
  font-weight: 300;
  color: ${(props) => props.theme.text.secondary};
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
  margin-top: 4px;
  padding: 6px 0;
`;

export const PickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

export const PickImage = styled.img`
  height: 11px;
  aspect-ratio: 1;
`;

export const PickCount = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.text.tertiary};
  padding-bottom: 2px;
  padding-left: 2px;
`;
