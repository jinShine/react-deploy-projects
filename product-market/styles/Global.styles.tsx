import { css, Global } from "@emotion/react";
import { reset } from "styled-reset";

const style = css`
  ${reset}
`;

export const GlobalStyles = () => {
  return <Global styles={style} />;
};
