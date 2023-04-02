import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IUserInfo } from "../types/userInfo";

const { persistAtom } = recoilPersist();

export const visitedPageState = atom({
  key: `visitedPageState`,
  default: "",
});

export const accessTokenState = atom<string | null>({
  key: `accessTokenState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = atom<boolean>({
  key: `isLoggedInState`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const useInfoState = atom<IUserInfo | null>({
  key: `useInfoState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});
