import { useMutation } from "@apollo/client";
import { Modal, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUploadFileArgs,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { usePostcode } from "src/components/hooks/usePostcode";
import { useToast } from "src/components/hooks/useToast";
import ProductRegisterUI from "./Register.presenter";
import { CREATE_USED_ITEM, UPLOAD_FILE } from "./Register.queries";
import { IProductRegisterInput } from "./Register.types";

export default function ProductRegister() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const { showPostcode, addressInfo } = usePostcode();
  const [toast, toastHolder] = useToast();
  const { push } = useMoveToPage();

  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = async (data: IProductRegisterInput) => {
    const contents = data.contents === "<p><br></p>" ? "" : data.contents;
    console.log("### contents :", contents);

    console.log("### INPUT :", data);

    try {
      await createUseditem({
        variables: {
          createUseditemInput: {
            name: data.productName,
            remarks: data.remarks,
            contents: contents,
            price: data.price,
            tags: data.tags.split(",").map((tag) => tag.trim()),
            useditemAddress: {
              zipcode: addressInfo.zonecode,
              address: addressInfo.address,
              addressDetail: data.address,
              lat: 33.55635,
              lng: 126.795841,
            },
            images: imageURLs,
          },
        },
      });

      toast.success("상품 등록 성공🎉");
      void push("/", 2);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onChangeAttachedImage: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    try {
      const uploadFiles = newFileList.map((file) =>
        uploadFile({ variables: { file: file.originFileObj } })
      );
      const result = await Promise.all(uploadFiles);
      const urls = result.map((res) => res.data?.uploadFile.url ?? "");
      setImageURLs(urls);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onPreviewAttachedImage = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onClickPostSearch = () => showPostcode();

  return (
    <ProductRegisterUI
      onClickSubmit={onClickSubmit}
      onChangeAttachedImage={onChangeAttachedImage}
      onPreviewAttachedImage={onPreviewAttachedImage}
      onClickPostSearch={onClickPostSearch}
      addressInfo={addressInfo}
      toastHolder={toastHolder}
    />
  );
}
