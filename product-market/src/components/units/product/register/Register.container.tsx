import { useMutation } from "@apollo/client";
import { Modal, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUploadFileArgs,
} from "src/commons/types/graphql/types";
import ProductRegisterUI from "./Register.presenter";
import { CREATE_USED_ITEM, UPLOAD_FILE } from "./Register.queries";
import { IProductRegisterInput } from "./Register.types";

export default function ProductRegister() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = (data: IProductRegisterInput) => {
    console.log("### INPUT :", data);
    const contents = data.contents === "<p><br></p>" ? "" : data.contents;
    console.log("### contents :", contents);
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

  return (
    <ProductRegisterUI
      onClickSubmit={onClickSubmit}
      onChangeAttachedImage={onChangeAttachedImage}
      onPreviewAttachedImage={onPreviewAttachedImage}
    />
  );
}
