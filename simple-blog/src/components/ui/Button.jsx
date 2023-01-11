import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { title, onClick } = props;

  return <SButton onClick={onClick}>{title || "버튼"}</SButton>;
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
