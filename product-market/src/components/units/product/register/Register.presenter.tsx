import { globalTheme } from "@/styles/theme/globalTheme";
import { PlusOutlined } from "@ant-design/icons";
import { Space, Upload } from "antd";
import Head from "next/head";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import * as S from "./Register.styles";

interface IProductRegisterInput {
  productName: string;
  price: number;
}

declare const window: typeof globalThis & {
  kakao: any;
};

export default function ProductRegisterUI() {
  const { handleSubmit, control, formState } = useForm<IProductRegisterInput>({
    mode: "onSubmit",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5c86c19d347c4caed39d146dad0a72a9";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        console.log(map);

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, []);

  return (
    <>
      {/* {props.isOpen && (
        <S.AddressModal visible={true}>
          <S.AddressSearchInput onComplete={props.onCompleteAddressSearch} />
        </S.AddressModal>
      )} */}
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>상품등록</S.Title>
        </S.TitleWrapper>
        <S.FormWrapper>
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
            </S.InputWrapper>
          </S.ProductNameWrapper>
          <S.InputWrapper>
            <S.Label>한줄요약</S.Label>
            <Controller
              name="remark"
              control={control}
              render={({ field: { onChange, value } }) => (
                <S.InputField
                  placeholder="LG전자 28MQ780 모니터"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {/* <S.Error>{props.titleError}</S.Error> */}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label>내용</S.Label>
            <S.Contents placeholder="내용을 작성해주세요." />
            {/* <S.Error>{props.contentsError}</S.Error> */}
          </S.InputWrapper>
          <S.InputWrapper style={{ marginTop: "40px" }}>
            <S.Label>사진첨부</S.Label>
            <Upload
              // action="/upload.do"
              listType="picture-card"
              maxCount={3}
              multiple
              style={{ color: `${globalTheme.color.primary}` }}
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
                  <S.InputField
                    readOnly
                    placeholder="02215"
                    // value={}
                  />
                  {/* <S.SearchButton onClick={props.onClickAddressSearch}> */}
                  <S.PostSearchButton>검색</S.PostSearchButton>
                </Space>
              </S.InputWrapper>
              <S.InputField
                readOnly
                // value={}
              />
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
            </Space>
            <S.KakaoMap id="map" />
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
            {/* <S.Error>{props.titleError}</S.Error> */}
          </S.InputWrapper>

          <S.SubmitWrapper>
            <S.SubmitButton
            // onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            // isActive={props.isEdit ? true : props.isActive}
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
