import "@emotion/react";
import { Theme } from "./emotion.d";
import { globalTheme } from "./globalTheme";

type ExtendedTheme = typeof globalTheme;

declare module "@emotion/react" {
  interface Theme extends ExtendedTheme {}
}
