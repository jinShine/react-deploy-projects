const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

/* 
coinId: string | undefined 라고 지정해주지 않으면 
Argument of type 'string | undefined' is not assignable to parameter of type 'string'. 
위의 에러가 남
참고 : https://tkdodo.eu/blog/react-query-and-type-script 의 Type safety with the enabled option 부분
*/
export const fetchCoinInfo = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchCoinTicker = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}
