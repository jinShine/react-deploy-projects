import { gql } from "@apollo/client";

export const CREATE_USEDITEM_QUESTION = gql`
  mutation createUseditemQuestion(
    $useditemId: ID!
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
  ) {
    createUseditemQuestion(
      useditemId: $useditemId
      createUseditemQuestionInput: $createUseditemQuestionInput
    ) {
      _id
      contents
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;
