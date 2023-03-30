import styled from "@emotion/styled";
import { Button, Rate } from "antd";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 126px 126px 126px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const SubmitButton = styled(Button)`
  height: 40px;
  background-color: ${(props) => props.theme.text.primary};
  color: white;
  font-size: 16px;
  font-weight: 800;
`;
