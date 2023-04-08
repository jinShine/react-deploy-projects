import { useMutation } from "@apollo/client";
import { Modal, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { usePostcode } from "src/components/hooks/usePostcode";
import { useToast } from "src/components/hooks/useToast";
import ProductRegisterUI from "./Register.presenter";
import {
  CREATE_USED_ITEM,
  UPDATE_USED_ITEM,
  UPLOAD_FILE,
} from "./Register.queries";
import { IProductRegisterInput } from "./Register.types";

interface IProps {
  isEdit: boolean;
  useditemData?: Pick<IQuery, "fetchUseditem">;
}

export default function ProductRegister(props: IProps) {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const { showPostcode, addressInfo } = usePostcode();
  const [toast, toastHolder] = useToast();
  const { push, query } = useMoveToPage();

  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const [updateUseditem] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  // addressInfo.zonecode ?? props.useditemData?.useditemAddress?.zipcode;

  useEffect(() => {
    console.log("여기타니??????????", props.useditemData?.fetchUseditem.images);
    setImageURLs(props.useditemData?.fetchUseditem.images ?? []);
  }, []);

  console.log(
    "!@#!@#!@#!@#!@#",
    process.env.NEXT_PUBLIC_STORAGE_URI +
      `/${props.useditemData?.fetchUseditem?.images?.[0]}`
  );

  const newFileList = (): UploadFile<any>[] => {
    if (props.useditemData?.fetchUseditem === undefined) return [];

    return props.useditemData.fetchUseditem?.images.map((el, index) => {
      const list: UploadFile<any> = {
        uid: "",
        name: "",
      };
      list.uid = `-${index}`;
      list.name = `image.${el.split(".")[1]}`;
      list.status = "done";
      list.url =
        process.env.NEXT_PUBLIC_STORAGE_URI +
        `/${props.useditemData?.fetchUseditem?.images?.[index]}`;
      return list;
    });
  };

  const onClickSubmit = async (data: IProductRegisterInput) => {
    const contents = data.contents === "<p><br></p>" ? "" : data.contents;

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
              addressDetail: data.addressDetail,
              lat: 33.55635,
              lng: 126.795841,
            },
            images: imageURLs,
          },
        },
      });

      toast.success("상품 등록 성공🎉");
      void push("/", 1.5);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onClickUpdate = async (data: IProductRegisterInput) => {
    console.log(data);
    console.log(addressInfo.zonecode);
    console.log(addressInfo.address);
    console.log(imageURLs);

    const contents = data.contents === "<p><br></p>" ? "" : data.contents;

    try {
      // await updateUseditem({
      //   variables: {
      //     updateUseditemInput: {
      //       name: data.productName,
      //       remarks: data.remarks,
      //       contents: contents,
      //       price: data.price,
      //       tags: data.tags.split(",").map((tag) => tag.trim()),
      //       useditemAddress: {
      //         zipcode: addressInfo.zonecode,
      //         address: addressInfo.address,
      //         addressDetail: data.addressDetail,
      //         lat: 33.55635,
      //         lng: 126.795841,
      //       },
      //       images: imageURLs,
      //     },
      //     useditemId: query.useditemId as string,
      //   },
      // });
      // toast.success("상품 수정 성공🎉");
      // void push("/", 1.5);
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
      isEdit={props.isEdit}
      useditemData={props.useditemData}
      newFileList={newFileList}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeAttachedImage={onChangeAttachedImage}
      onPreviewAttachedImage={onPreviewAttachedImage}
      onClickPostSearch={onClickPostSearch}
      addressInfo={addressInfo}
      toastHolder={toastHolder}
    />
  );
}
