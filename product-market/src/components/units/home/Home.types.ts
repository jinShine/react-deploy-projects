import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_OF_BEST = gql`
  query {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      contents
      price
      images
      pickedCount
    }
  }
`;
