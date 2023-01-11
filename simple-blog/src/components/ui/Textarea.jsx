import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Error from "./Error";

const Textarea = (props) => {
  const { height, placeholder, value, onChange, errorMessage } = props;
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    onChange(event);
    setError(event.target.value ? "" : errorMessage);
  };

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <STextarea
        height={height}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
      <Error>{error}</Error>
    </>
  );
};

export default Textarea;

/* Style */
const STextarea = styled.textarea`
  width: calc(100% - 32px);
  ${(props) => props.height && `height: ${props.height}px;`}
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
`;
