# Nomad_React_Crypto-Tracker

## Installation

#### react-ts

`npx create-react-app my-app --template typescript`

#### styled-components

`npm i styled-components`

#### styled-components type definition

`npx create-react-app my-app --template typescript`

#### react-query

`npm i react-query`

#### react-query type definition

`npm i --save-dev @types/react-query`

## explain

#### ERROR! Link 의 state

- 주소창(localhost:3000/)에서 state 로 정보를 보낸 페이지(localhost:3000/btc-bitcoin)로 접속할 경우 Link 를 통해 보낸 state 를 읽어오지 못하는 에러 발생??
  => 시크릿창으로 위 상황을 실행해봐도 name 을 읽어올 수 없다는 에러 발생

#### API

- 코인의 정보 : https://api.coinpaprika.com/v1/coins/:coinId
- 코인의 가격 : https://api.coinpaprika.com/v1/tickers/:coinId

#### nested route

- router v5 : Switch, Route 사용
- router v6 : Outlet, children 사용 => children 할 때는 / 붙이지 않아도 자동 인식

#### 경로 일치 확인

- router v5 : useRouteMatch 의 경우 반환되는 데이터 중 isExact O
- router v6 : useMatch 의 경우 반환되는 데이터 중 isExact X
- 공통 : 일치하면 해당 path 정보 반환, 일치하지 않으면 null

#### react-query

- 초기 세팅 : index.ts

```
const queryClient = new QueryClient(); // 추가

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}> // 추가
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
```

- react-query 는 서버에서 받아온 데이터를 삭제하지 않고 캐시에 저장하고 유지
- 따라서 useEffect 처럼 컴포넌트를 계속 랜더링할 때마다 API 에 접근하는 것이 아닌 저장하여 계속 사용
- 사용법 : const { isLoading, data} = useQuery('queryKey', queryFn)
- queryKey : react query 는 query 를 key 를 보고 인식하기 때문에 고유한 값을 작성.
  1. 같은 queryFn 에 다른 값을 넣는 경우(검색, 조회, ...) 계속 변경되는 해당 값을 작성해야 함!!!(id, title, ...)
  2. 다른 queryFn 이더라도 같은 key 가지면 문제 발생. react query 에서 key 를 array 로 보고 있기 때문에 => ['다름을 명시', 같은 key] 이런 식으로 작성

#### APEXCHARTS

- js chart library 로 다양한 차트 형태로 데이터를 시각화해줄 수 있는 라이브러리
- 설치 : npm install --save react-apexcharts apexcharts
- [APEXCHARTS](https://apexcharts.com/react-chart-demos/) 참고
- 옵션 :
  1. type : 어떤 형태의 그래프를 할 건지 지정
  2. series : 어떻게 데이터를 보이게 할 건지 지정, 여러 그래프 가능, name 과 data 형태
  3. options : 테마, 스타일링 등 지정 (다른 옵션들은 문서에서 확인 가능)

#### react-helmet

- 홈페이지 제목 바꾸기 : 컴포넌트인데 어떤 걸 render 하든 문서의 head 로 감
- 설치 : npm install react-helmet
- type definition : npm i --save-dev @types/react-helmet
