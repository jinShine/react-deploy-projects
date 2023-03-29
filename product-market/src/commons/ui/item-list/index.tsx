import styled from "@emotion/styled";
import { Image } from "antd";
import { MouseEvent } from "react";
import { IUseditem } from "src/commons/types/graphql/types";
import { EmptyImage } from "../empty-image";
import { Tags } from "../tag-list";

interface IProps {
  id: string;
  data?: IUseditem;
  onClickItem: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function ItemList(props: IProps) {
  const data = props.data;
  return (
    <>
      <Wrapper id={props.id} onClick={props.onClickItem}>
        {data?.images?.[0] ? (
          <Thumbnail
            src={`https://storage.googleapis.com/${data?.images?.[0]}`}
            alt="상품 이미지"
            width={120}
            height={120}
          />
        ) : (
          <EmptyImage height={120} width={120} />
        )}
        <InfoWrapper>
          <Name>{data?.name ? data.name : "제목 없음"}</Name>
          <Remark>{data?.remarks}</Remark>
          <Tags data={data?.tags} />
          <SellerPickInfoWrapper>
            <SellerWrapper>
              <SellerImage src="/images/ic-profile.svg" />
              <SellerName>{data?.seller?.name ?? "판매자"}</SellerName>
            </SellerWrapper>
            <PickWrapper>
              <PickImage src="/images/ic-heart.svg" />
              <PickCount>{data?.pickedCount ?? 0}</PickCount>
            </PickWrapper>
          </SellerPickInfoWrapper>
        </InfoWrapper>
        <Price>{`${data?.price?.toLocaleString()}원`}</Price>
      </Wrapper>
      <Divider />
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 165px;
  width: 100%;
  padding: 14px 0;
`;

const Thumbnail = styled(Image)`
  object-fit: cover;
  width: 120px;
  height: 120px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: center;
  width: calc(100% - 350px);
  height: 100%;
  padding: 10px 0;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
  padding: 6px 0;
`;

const Remark = styled.span`
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.text.secondary};
  margin-top: 6px;
  height: 13px;
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
  width: 130px;
  text-align: end;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.divider};
`;

const SellerPickInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
`;

const SellerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

const SellerImage = styled.img`
  height: 20px;
  aspect-ratio: 1;
`;

const SellerName = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.text.tertiary};
  padding-bottom: 2px;
  padding-left: 2px;
`;

const PickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-left: 20px;
`;

const PickImage = styled.img`
  height: 16px;
  aspect-ratio: 1;
`;

const PickCount = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.text.tertiary};
  padding-bottom: 2px;
  padding-left: 2px;
`;
