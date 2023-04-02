import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import {
  IMutation,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
} from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import ProductDetailUI from "./Detail.presenter";
import { FETCH_USED_ITEM, TOGGLE_USED_ITEM_PICK } from "./Detail.queries";

export default function ProductDetail() {
  const { push, query } = useMoveToPage();

  const { data: useditem } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: query.useditemId as string },
  });

  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK, {
    variables: { useditemId: query.useditemId as string },
  });

  const onClickPick = async () => {
    try {
      await toggleUseditemPick({
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: query.useditemId as string },
          },
        ],
      });
    } catch (error) {
      Modal.error({ content: (error as Error).message });
    }
  };

  return <ProductDetailUI useditem={useditem} onClickPick={onClickPick} />;
}
