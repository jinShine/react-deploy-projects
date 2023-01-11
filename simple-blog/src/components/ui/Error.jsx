import React from "react";
import styled from "styled-components";

const Error = ({ children }) => {
  return <SError>{children}</SError>;
};

export default Error;

/* Style */
const SError = styled.div`
  padding-bottom: 10px;
  font-size: 14px;
  color: red;
`;
