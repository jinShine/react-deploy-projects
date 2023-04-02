import styled from "@emotion/styled";
import { Carousel } from "antd";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 126px 0 126px;
`;

export const CarouselWrapper = styled(Carousel)`
  width: 700px;
  border-radius: 20px;
`;

export const CarouselContent = styled.img`
  height: 500px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  margin: 16px 0;
`;

export const SellerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SellerImage = styled.img`
  height: 40px;
  aspect-ratio: 1;
`;

export const SellerName = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.text.secondary};
  margin-left: 6px;
`;

export const PickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-left: 20px;
`;

export const PickImage = styled.img`
  height: 24px;
  aspect-ratio: 1;
  cursor: pointer;
`;

export const PickCount = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.text.secondary};
  padding-bottom: 2px;
  padding-left: 4px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.divider};
`;

export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 40px;
`;

export const Remarks = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.text.tertiary};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 4px;
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 22px;
  font-weight: 700;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 12px;
`;

export const CreatedAt = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.text.tertiary};
  padding-top: 10px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-top: 20px;
`;

export const Price = styled.h1`
  font-size: 20px;
  font-weight: 700;
  padding-top: 20px;
`;

export const Contents = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.text.primary};
  margin-top: 40px;
  width: 100%;
  min-height: 150px;
  border: none;
`;

export const LocationTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const LocationAddress = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.text.tertiary};
  margin-top: 12px;
`;
