import { AimOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

export interface AddressInfo {
  zonecode?: number | null;
  address?: string | null;
}

export const usePostcode = () => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    zonecode: null,
    address: null,
  });

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log("우편번호 : ", data.zonecode);
    console.log("주소 : ", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddressInfo({ zonecode: data.zonecode, address: fullAddress });

    hidePostcode();
  };

  const showPostcode = () => {
    Modal.confirm({
      icon: <AimOutlined />,
      title: "주소검색",
      content: (
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
      ),
      width: "60%",
      okCancel: false,
      okText: "취소",
      okType: "default",
    });
  };

  const hidePostcode = () => {
    Modal.destroyAll();
  };

  return {
    showPostcode,
    hidePostcode,
    addressInfo,
  };
};
