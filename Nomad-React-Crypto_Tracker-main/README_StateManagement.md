# Nomad_React_Crypto-Tracker_StateManagement

## Dark mode, Light mode Switch

### ❌ Recoil : State Management

- (useOutletContext)[https://velog.io/@qkr135qkr/react-router-dom-v6%EC%97%90%EC%84%9C-%EC%9E%90%EC%8B%9D-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EA%B2%8C-props%EB%A5%BC-%EC%A0%84%EB%8B%AC%ED%95%B4%EB%B3%B4%EC%9E%90]

- 간단 설명
  App (isDark, modifierFn)
  -> Coins (modifierFn) -> Coin -> Chart (isDark)

- isDark 상세 설명

1. App 에서 Outlet 에 context
2. Coins 에서 useOutletContext 로 받아오고 Coin 로 Link 를 통해 state 넘겨주기
3. Coin 에서 useLocation 으로 state 받아서 Chart 로 Link 를 통해 state 넘겨주기
4. Chart 에서 useLocation 으로 state 받아서 mode 탐지

<br />

### ⭕ Recoil : State Management

#### Recoil?

- 상태 관리 라이브러리 중 하나로 페이스북에서 만듦.
- props 로 내려서 해당 props 를 사용하지 않는 컴포넌트들도 해당 데이터를 받아줘야 하는 번거로운 기존의 방식과는 달리 전역적으로 상태 관리를 해주는 기능을 가지고 있다

#### Installation

```
npm install recoil
```

#### Explain

- index.js 에 RecoilRoot 로 감싸주기
- src 폴더에 전역 관리를 해줄 atom.ts 파일 생성
- atom 생성, key 와 default 값 필수

- useRecoilValue : atom 에 있는 값을 가져다가 쓸 때
- useSetRecoilState : atom 에 있는 값을 변경할 때, useState 의 setter 함수와 동일하게 사용
