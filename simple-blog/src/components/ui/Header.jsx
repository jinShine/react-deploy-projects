import React from "react";
import styled from "styled-components";

const Header = (props) => {
  const { title } = props;

  return (
    <SWrapper>
      <STitle>{title}</STitle>
    </SWrapper>
  );
};

export default Header;

/* Style */
const SWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const STitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
`;
