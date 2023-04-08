import { Modal } from "antd";

export const checkValidationImage = (file: File | undefined, limit: number) => {
  const sizeLimit = limit * 1024 * 1024;

  if (!file?.size) {
    Modal.error({ content: "파일이 없습니다." });
    return false;
  }

  if (file.size > sizeLimit) {
    Modal.error({ content: `파일이 너무 큽니다. (제한: ${limit}MB` });
    return false;
  }

  if (
    !file.type.includes("png") &&
    !file.type.includes("jpg") &&
    !file.type.includes("jpeg")
  ) {
    Modal.error({
      content: "파일 확장자가 올바르지 않습니다.(png, jpg, jpeg만 가능)",
    });
    return false;
  }

  return file;
};
