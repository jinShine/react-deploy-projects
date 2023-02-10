import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px 20px;
`;
const Wrap = styled.p`
  padding: 8px 0;
`;
const Title = styled.strong`
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  width: 200px;
`;
const Detail = styled.span`
  font-size: 13px;
`;

const Price = () => {
  const { state } = useLocation();

  return (
    <Container>
      <Wrap>
        <Title>Ath Date</Title>
        <Detail>{state.usd.ath_date}</Detail>
      </Wrap>
      <Wrap>
        <Title>Ath Price</Title>
        <Detail>{state.usd.ath_price}</Detail>
      </Wrap>
      <Wrap>
        <Title>Market Cap</Title>
        <Detail>{state.usd.market_cap}</Detail>
      </Wrap>
      <Wrap>
        <Title>Market Cap Change 24h</Title>
        <Detail>{state.usd.market_cap}</Detail>
      </Wrap>
      <Wrap>
        <Title>Percent Change 1h</Title>
        <Detail>{state.usd.percent_change_1h}</Detail>
      </Wrap>
      <Wrap>
        <Title>Percent Change 24h</Title>
        <Detail>{state.usd.percent_change_24h}</Detail>
      </Wrap>
      <Wrap>
        <Title>Percent Change 1 Year</Title>
        <Detail>{state.usd.percent_change_1y}</Detail>
      </Wrap>
      <Wrap>
        <Title>Percent Change 1 Month</Title>
        <Detail>{state.usd.percent_change_30d}</Detail>
      </Wrap>
      <Wrap>
        <Title>Percent From Price Ath</Title>
        <Detail>{state.usd.percent_from_price_ath}</Detail>
      </Wrap>
      <Wrap>
        <Title>Price</Title>
        <Detail>{state.usd.price}</Detail>
      </Wrap>
      <Wrap>
        <Title>Volume 24h</Title>
        <Detail>{state.usd.volume_24h}</Detail>
      </Wrap>
      <Wrap>
        <Title>Volume 24h Change 24h</Title>
        <Detail>{state.usd.volume_24h_change_24h}</Detail>
      </Wrap>
    </Container>
  );
};

export default Price;
