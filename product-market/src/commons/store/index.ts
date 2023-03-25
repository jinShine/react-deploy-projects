import { atom } from "recoil";

export const visitedPageState = atom({
  key: `visitedPageState`,
  default: "",
});

export const accessTokenState = atom<string | null>({
  key: `accessTokenState`,
  default: null,
});

export const isLoggedInState = atom({
  key: `isLoggedInState`,
  default: false,
});
