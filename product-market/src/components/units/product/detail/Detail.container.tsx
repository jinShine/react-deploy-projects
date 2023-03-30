import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import ProductDetailUI from "./Detail.presenter";
import { FETCH_USED_ITEM } from "./Detail.queries";

export default function ProductDetail() {
  const { push, query } = useMoveToPage();

  const { data: useditem } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: query.useditemId as string },
  });

  return <ProductDetailUI useditem={useditem} />;
}
