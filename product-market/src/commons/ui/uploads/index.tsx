import styled from "@emotion/styled";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationImage } from "./checkValidationImage";

interface IProps {
  height: number;
  width: number;
  fileUrl?: string | null;
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function ProfileUploader(props: IProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onClickFindFile = () => {
    fileRef.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.currentTarget.files?.[0], 5);
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      if (typeof data.target?.result === "string") {
        setImageUrl(data.target?.result);
      }
    };

    props.setFile!(file);
  };

  return (
    <>
      {imageUrl ? (
        <UploadImage
          src={imageUrl}
          width={props.width ?? 78}
          height={props.height ?? 78}
          onClick={onClickFindFile}
        />
      ) : (
        <DefaultUpload
          src="/images/ic-profile.svg"
          width={props.width ?? 78}
          height={props.height ?? 78}
          onClick={onClickFindFile}
        />
      )}

      <UploadFileHidden
        type="file"
        ref={fileRef}
        // multiple={props.multiple}
        // onChange={props.onChangeFile}
        // onChange={() => (onChangeFile) => props.onChangeFile}
        onChange={onChangeFile}
      />
    </>
  );
}

/////////////////////////////////////////
// Style

const UploadImage = styled.img`
  width: ${(props: IProps) => `${props.width}px`};
  height: ${(props: IProps) => `${props.height}px`};
  border-radius: ${(props: IProps) => `${props.width / 2}px`};
  object-fit: cover;
  cursor: pointer;
`;

const DefaultUpload = styled.img`
  width: ${(props: IProps) => `${props.width}px`};
  height: ${(props: IProps) => `${props.height}px`};
  border-radius: ${(props: IProps) => `${props.width / 2}px`};
  object-fit: cover;
  outline: none;
  border: none;
  cursor: pointer;
`;

const UploadFileHidden = styled.input`
  display: none;
`;
