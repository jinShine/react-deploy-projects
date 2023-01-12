import React from "react";
import styled from "styled-components";

const Button = ({ title = "버튼", onClick }) => {
  return <SButton onClick={onClick}>{title}</SButton>;
};

export default Button;

/* Style */
const SButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-radius: 8px;
  cursor: pointer;
`;
