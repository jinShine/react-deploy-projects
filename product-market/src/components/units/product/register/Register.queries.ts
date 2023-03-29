import { gql } from "@apollo/client";

export const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUsedItemInput: $createUseditemInput) {
      _id
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// createUseditem(
//   createUseditemInput: {
//     name: "LG 모니터"
//     remarks: "LG 28MQ780 모니터"
//     contents: "모니터 팝니다 새삥임"
//     price: 20000
//     tags: ["IT", "가전", "생활"]
//     useditemAddress: {
//       zipcode: "02-215"
//       address: "무학로 91"
//       addressDetail: "아파트으으으"
//       lat: 0.1
//       lng: 0.2
//     }
//     images: []
//   }
// ) {
//   _id
//   name
//   remarks
// }
