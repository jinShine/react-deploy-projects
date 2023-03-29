import { globalTheme } from "@/styles/theme/globalTheme";
import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Space, Upload, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { JSXElementConstructor, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { KakaoMap } from "src/commons/ui/kakao-map";
import { AddressInfo } from "src/components/hooks/usePostcode";
import * as S from "./Register.styles";
import { IProductRegisterInput, productRegisterSchema } from "./Register.types";

interface IProps {
  onClickSubmit: (data: IProductRegisterInput) => void;
  onChangeAttachedImage:
    | ((info: UploadChangeParam<UploadFile<any>>) => void)
    | undefined;
  onPreviewAttachedImage: ((file: UploadFile<any>) => void) | undefined;
  onClickPostSearch: () => void;
  addressInfo: AddressInfo;
  toastHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function ProductRegisterUI(props: IProps) {
  const { handleSubmit, control, formState } = useForm<IProductRegisterInput>({
    resolver: yupResolver(productRegisterSchema),
    mode: "onSubmit",
  });

  return (
    <>
      {props.toastHolder}
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>상품등록</S.Title>
        </S.TitleWrapper>
        <S.FormWrapper onSubmit={handleSubmit(props.onClickSubmit)}>
          <S.ProductNameWrapper>
            <S.InputWrapper width={"65%"}>
              <S.Label>상품명</S.Label>
              <Controller
                name="productName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField
                    placeholder="모니터"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <S.ErrorMessage>
                {formState.errors.productName?.message}
              </S.ErrorMessage>
            </S.InputWrapper>
            <S.InputWrapper width={"30%"}>
              <S.Label>가격</S.Label>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField
                    placeholder="30000"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <S.ErrorMessage>{formState.errors.price?.message}</S.ErrorMessage>
            </S.InputWrapper>
          </S.ProductNameWrapper>
          <S.InputWrapper>
            <S.Label>한줄요약</S.Label>
            <Controller
              name="remarks"
              control={control}
              render={({ field: { onChange, value } }) => (
                <S.InputField
                  placeholder="LG전자 28MQ780 모니터"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <S.ErrorMessage>{formState.errors.remarks?.message}</S.ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label>내용</S.Label>
            <Controller
              name="contents"
              control={control}
              render={({ field: { onChange, value } }) => (
                <S.Contents
                  placeholder="내용을 작성해주세요."
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <S.ErrorMessage>
              {formState.errors.contents?.message}
            </S.ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper style={{ marginTop: "40px" }}>
            <S.Label>사진첨부 (3개까지 가능)</S.Label>
            <Upload
              listType="picture-card"
              maxCount={3}
              multiple
              style={{ color: `${globalTheme.color.primary}` }}
              onChange={props.onChangeAttachedImage}
              onPreview={props.onPreviewAttachedImage}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </S.InputWrapper>
          <S.ZipcodeWrapper>
            <Space direction="vertical" style={{ flexGrow: 1 }}>
              <S.InputWrapper>
                <S.Label>주소</S.Label>
                <Space>
                  <S.InputField readOnly value={props.addressInfo.zonecode} />
                  <S.PostSearchButton onClick={props.onClickPostSearch}>
                    검색
                  </S.PostSearchButton>
                </Space>
              </S.InputWrapper>
              <S.InputField readOnly value={props.addressInfo.address} />
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField
                    placeholder="상세주소를 입력해주세요."
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <S.ErrorMessage>
                {formState.errors.address?.message}
              </S.ErrorMessage>
            </Space>
            <KakaoMap
              lat={33.55635}
              lng={126.795841}
              style={{
                height: "190px",
                aspectRatio: "1.8",
                marginLeft: "50px",
              }}
            />
          </S.ZipcodeWrapper>
          <S.InputWrapper>
            <S.Label>태그</S.Label>
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <S.InputField
                  placeholder="ex) IT, 생활, 가전"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </S.InputWrapper>
          <S.SubmitWrapper>
            <S.SubmitButton
              isActivedColor={
                formState.isValid
                  ? globalTheme.color.primary
                  : globalTheme.text.disable
              }
              htmlType="submit"
            >
              {/* {props.isEdit ? "수정하기" : "등록하기"} */}
              등록
            </S.SubmitButton>
          </S.SubmitWrapper>
        </S.FormWrapper>
      </S.Wrapper>
    </>
  );
}
