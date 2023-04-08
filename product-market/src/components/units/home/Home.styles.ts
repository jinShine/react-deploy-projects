import styled from "@emotion/styled";
import { Carousel } from "antd";

export const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CarouselWrapper = styled(Carousel)`
  margin-top: 16px;
`;

export const CarouselContent = styled.img`
  height: 350px;
  width: 100%;
  object-fit: cover;
`;

export const BestItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const BestItemTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
  padding: 20px 10px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
`;

export const SelectedTab = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.color.primary};
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
