import { globalTheme } from '@/styles/theme/globalTheme'
import { PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Space, Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import { IQuery } from 'src/commons/types/graphql/types'
import { KakaoMap } from 'src/commons/ui/kakao-map'
import { AddressInfo } from 'src/components/hooks/usePostcode'
import * as S from './Register.styles'
import { IProductRegisterInput, productRegisterSchema } from './Register.types'

interface IProps {
  isEdit: boolean
  useditemData?: Pick<IQuery, 'fetchUseditem'>
  newFileList: () => UploadFile<any>[]
  onClickSubmit: (data: IProductRegisterInput) => void
  onClickUpdate: (data: IProductRegisterInput) => void
  onChangeAttachedImage: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined
  onPreviewAttachedImage: ((file: UploadFile<any>) => void) | undefined
  onClickPostSearch: () => void
  addressInfo: AddressInfo
  toastHolder: ReactElement<any, string | JSXElementConstructor<any>>
}

export default function ProductRegisterUI(props: IProps) {
  const useditemData = props.useditemData?.fetchUseditem

  const { handleSubmit, control, formState, reset } = useForm<IProductRegisterInput>({
    resolver: yupResolver(productRegisterSchema),
    mode: 'onSubmit',
  })

  const [fileList, setFileList] = useState<UploadFile[]>(props.newFileList)

  useEffect(() => {
    const ddd = useditemData?.useditemAddress?.address === null ? 'hidden' : ''

    reset({
      productName: useditemData?.name ?? '',
      price: Number(useditemData?.price ?? 0),
      remarks: useditemData?.remarks ?? '',
      contents: useditemData?.contents,
      images: useditemData?.images,
      addressDetail: useditemData?.useditemAddress?.addressDetail ?? '',
      tags: useditemData?.tags?.toString(),
    })
    setFileList(props.newFileList)
  }, [useditemData])

  return (
    <>
      {props.toastHolder}
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>{props.isEdit ? '상품수정' : '상품등록'}</S.Title>
        </S.TitleWrapper>
        <S.FormWrapper
          onSubmit={
            props.isEdit
              ? handleSubmit(props.onClickUpdate)
              : handleSubmit(props.onClickSubmit)
          }>
          <S.ProductNameWrapper>
            <S.InputWrapper width={'65%'}>
              <S.Label>상품명</S.Label>
              <Controller
                name="productName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField placeholder="모니터" value={value} onChange={onChange} />
                )}
              />
              <S.ErrorMessage>{formState.errors.productName?.message}</S.ErrorMessage>
            </S.InputWrapper>
            <S.InputWrapper width={'30%'}>
              <S.Label>가격</S.Label>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField placeholder="30000" value={value} onChange={onChange} />
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
            <S.ErrorMessage>{formState.errors.contents?.message}</S.ErrorMessage>
          </S.InputWrapper>
          <S.InputWrapper style={{ marginTop: '40px' }}>
            <S.Label>사진첨부 (3개까지 가능)</S.Label>
            <Upload
              listType="picture-card"
              maxCount={3}
              multiple
              style={{ color: `${globalTheme.color.primary}` }}
              onChange={props.onChangeAttachedImage}
              onPreview={props.onPreviewAttachedImage}
              defaultFileList={fileList}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </S.InputWrapper>
          <S.ZipcodeWrapper>
            <Space direction="vertical" style={{ flexGrow: 1 }}>
              <S.InputWrapper>
                <S.Label>거래장소</S.Label>
                <Space>
                  <S.InputField
                    readOnly
                    value={
                      props.addressInfo.zonecode ??
                      useditemData?.useditemAddress?.zipcode ??
                      ''
                    }
                  />
                  <S.PostSearchButton onClick={props.onClickPostSearch}>
                    검색
                  </S.PostSearchButton>
                </Space>
              </S.InputWrapper>
              <S.InputField
                readOnly
                value={
                  props.addressInfo.address ??
                  useditemData?.useditemAddress?.address ??
                  ''
                }
              />

              <Controller
                name="addressDetail"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.InputField
                    placeholder="상세주소를 입력해주세요."
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <S.ErrorMessage>{formState.errors.addressDetail?.message}</S.ErrorMessage>
            </Space>

            <KakaoMap
              address={
                props.addressInfo.address ?? useditemData?.useditemAddress?.address
              }
              style={{
                height: '190px',
                aspectRatio: '1.8',
                marginLeft: '50px',
                visibility:
                  useditemData?.useditemAddress?.address === null ? 'hidden' : 'visible',
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
            <S.SubmitButton isValid={formState.isValid} htmlType="submit">
              {props.isEdit ? '수정' : '등록'}
            </S.SubmitButton>
          </S.SubmitWrapper>
        </S.FormWrapper>
      </S.Wrapper>
    </>
  )
}
