import styled from "@emotion/styled";
import { Button, Input } from "antd";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 34px;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export const InputField = styled(Input)`
  height: 46px;
  margin-top: 6px;
`;

export const InputPasswordField = styled(Input.Password)`
  height: 46px;
  margin-top: 6px;
`;

export const JoinButton = styled(Button)`
  height: 52px;
  background-color: ${(props) => props.theme.text.primary};
  color: white;
  font-size: 16px;
  font-weight: 800;
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const LoginInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoginHelpTitle = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.text.tertiary};
  margin-right: 12px;
`;

export const MoveToLoginButton = styled.span`
  color: ${(props) => props.theme.text.primary};
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.color.error};
  font-size: 12px;
  padding: 4px;
`;
