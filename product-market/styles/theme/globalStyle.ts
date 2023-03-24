import { css } from "@emotion/react";
import { reset } from "styled-reset";
import { globalTheme } from "./globalTheme";

export const globalStyle = css`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    color: ${globalTheme.text.primary};
  }
`;
