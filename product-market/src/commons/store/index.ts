import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const visitedPageState = atom({
  key: `visitedPageState`,
  default: "",
});

export const accessTokenState = atom<string>({
  key: `accessTokenState`,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = atom({
  key: `isLoggedInState`,
  default: false,
});
