import styled from "@emotion/styled";
import { Button, Input } from "antd";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

type StyleProps = {
  width?: string | "100%";
};

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

export const ProductNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.div`
  padding-bottom: 12px;
  padding-left: 2px;
  font-size: 14px;
  font-weight: 700;
`;

export const InputField = styled(Input)`
  height: 46px;
`;

export const InputWrapper = styled.div<StyleProps>`
  width: ${(props) => props.width};
  padding-top: 40px;
`;

export const Contents = styled(ReactQuill)`
  height: 300px;
`;

export const ZipcodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const PostSearchButton = styled(Button)`
  height: 46px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

export const KakaoMap = styled.div`
  height: 180px;
  aspect-ratio: 1.8;
  margin-left: 50px;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding-top: 80px;
  padding-bottom: 30px;
`;

export const SubmitButton = styled(Button)`
  height: 46px;
  width: 20%;
  background-color: ${(props) => props.theme.text.disable};
  color: white;
  font-size: 12px;
  font-weight: 500;

  /* background-color: ${(props: ISubmitButtonProps) =>
    props.isActive ? "yellow" : "none"}; */
`;

export const Error = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;

// export const AddressModal = styled(Modal)``;

// export const AddressSearchInput = styled(DaumPostcode)``;
