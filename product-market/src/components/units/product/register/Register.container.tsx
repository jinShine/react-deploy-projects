import { useMutation } from '@apollo/client'
import { Modal, UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
  IMutationUploadFileArgs,
  IQuery,
} from 'src/commons/types/graphql/types'
import { useMoveToPage } from 'src/components/hooks/useMoveToPage'
import { usePostcode } from 'src/components/hooks/usePostcode'
import { useToast } from 'src/components/hooks/useToast'
import ProductRegisterUI from './Register.presenter'
import { CREATE_USED_ITEM, UPDATE_USED_ITEM, UPLOAD_FILE } from './Register.queries'
import { IProductRegisterInput } from './Register.types'
import { useRecoilValue } from 'recoil'
import { coordinateState } from '@/src/commons/store'

interface IProps {
  isEdit: boolean
  useditemData?: Pick<IQuery, 'fetchUseditem'>
}

export default function ProductRegister(props: IProps) {
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const coordinates = useRecoilValue(coordinateState)
  const { showPostcode, addressInfo, setAddressInfo } = usePostcode()
  const [toast, toastHolder] = useToast()
  const { push, query } = useMoveToPage()

  const [createUseditem] = useMutation<
    Pick<IMutation, 'createUseditem'>,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM)

  const [updateUseditem] = useMutation<
    Pick<IMutation, 'updateUseditem'>,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM)

  const [uploadFile] = useMutation<
    Pick<IMutation, 'uploadFile'>,
    IMutationUploadFileArgs
  >(UPLOAD_FILE)

  useEffect(() => {
    setImageURLs(props.useditemData?.fetchUseditem.images ?? [])
  }, [])

  const newFileList = (): UploadFile<any>[] => {
    if (!props.useditemData) {
      return []
    }

    if (!props.useditemData.fetchUseditem.images) {
      return []
    }

    return props.useditemData.fetchUseditem.images.map((el, index) => {
      const list: UploadFile<any> = {
        uid: '',
        name: '',
      }
      list.uid = `-${index}`
      list.name = `image.${el.split('.')[1]}`
      list.status = 'done'
      list.url =
        process.env.NEXT_PUBLIC_STORAGE_URI +
        `/${props.useditemData?.fetchUseditem?.images?.[index]}`
      return list
    })
  }

  const onClickSubmit = async (data: IProductRegisterInput) => {
    const contents = data.contents === '<p><br></p>' ? '' : data.contents

    try {
      await createUseditem({
        variables: {
          createUseditemInput: {
            name: data.productName,
            remarks: data.remarks,
            contents: contents,
            price: data.price,
            tags: data.tags.split(',').map(tag => tag.trim()),
            useditemAddress: {
              zipcode: String(addressInfo.zonecode),
              address: addressInfo.address,
              addressDetail: data.addressDetail,
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
            images: imageURLs,
          },
        },
      })

      toast.success('상품 등록 성공🎉')
      void push('/', 1.5)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const onClickUpdate = async (data: IProductRegisterInput) => {
    console.log(data)
    console.log(addressInfo)
    console.log(imageURLs)

    if (imageURLs.length === 0) {
      toast.error('이미지를 등록해주세요. (최소 1개)')
      return
    }

    const contents = data.contents === '<p><br></p>' ? '' : data.contents

    try {
      await updateUseditem({
        variables: {
          updateUseditemInput: {
            name: data.productName,
            remarks: data.remarks,
            contents: contents,
            price: data.price,
            tags: data.tags.split(',').map(tag => tag.trim()),
            useditemAddress: {
              zipcode: String(addressInfo.zonecode),
              address: addressInfo.address,
              addressDetail: data.addressDetail,
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
            images: imageURLs,
          },
          useditemId: query.useditemId as string,
        },
      })
      toast.success('상품 수정 성공🎉')
      void push('/', 1.5)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const onChangeAttachedImage: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    try {
      const uploadedFiles = newFileList
        .filter(file => (file.size ?? 0) > 0)
        .map(file => uploadFile({ variables: { file: file.originFileObj } }))

      const result = await Promise.all(uploadedFiles)
      const existingUrls = newFileList
        .filter(file => file.status === 'done')
        .map(file => file.url?.replace('https://storage.googleapis.com/', '') ?? '')
      const urls = result.map(res => res.data?.uploadFile.url ?? '')

      setImageURLs([...existingUrls, ...urls].filter(url => url.length > 0))
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message })
    }
  }

  const onPreviewAttachedImage = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onRemoveAttachedImage = (file: UploadFile) => {
    console.log('onRemoveAttachedImage', file)
  }

  const onClickPostSearch = () => showPostcode()

  return (
    <ProductRegisterUI
      isEdit={props.isEdit}
      useditemData={props.useditemData}
      newFileList={newFileList}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeAttachedImage={onChangeAttachedImage}
      onPreviewAttachedImage={onPreviewAttachedImage}
      onRemoveAttachedImage={onRemoveAttachedImage}
      onClickPostSearch={onClickPostSearch}
      addressInfo={addressInfo}
      setAddressInfo={setAddressInfo}
      toastHolder={toastHolder}
    />
  )
}
