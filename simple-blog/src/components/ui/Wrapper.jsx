import React from "react";
import styled from "styled-components";

const Wrapper = ({ children }) => {
  return <SWrapper>{children}</SWrapper>;
};

export default Wrapper;

/* Style */
const SWrapper = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;
