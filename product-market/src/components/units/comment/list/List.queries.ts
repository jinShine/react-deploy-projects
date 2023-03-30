import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_QUESTIONS = gql`
  query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
    fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
      _id
      contents
      user {
        _id
        email
        name
        picture
      }
    }
  }
`;
