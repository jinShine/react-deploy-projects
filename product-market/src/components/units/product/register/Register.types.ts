import * as yup from "yup";
export interface IProductRegisterInput {
  productName: string;
  price: number;
  remarks: string;
  contents: string;
  address: string;
  tags: string;
  images?: string[] | null;
}

export interface ISubmitButtonProps {
  isActivedColor: string;
}

export const productRegisterSchema = yup.object({
  productName: yup.string().required("상풍명을 입력해주세요."),
  price: yup.number().required("가격을 입력해주세요."),
  remarks: yup.string().required("한줄요약을 입력해주세요."),
  contents: yup.string().required("내용을 입력해주세요."),
  address: yup.string().required("상세주소를 입력해주세요."),
});
