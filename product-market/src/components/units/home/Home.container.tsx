import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "src/commons/types/graphql/types";
import { useAuth } from "src/components/hooks/useAuth";
import HomeUI from "./Home.presenter";
import { FETCH_USED_ITEMS, FETCH_USED_ITEMS_OF_BEST } from "./Home.types";

export default function Home() {
  const { isLoggedIn, fetchUserInfo } = useAuth();

  const { data: itemsOfBestData } = useQuery<
    Pick<IQuery, "fetchUseditemsOfTheBest">
  >(FETCH_USED_ITEMS_OF_BEST);

  const { data: usedItemsData, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const onLoadMore = (page: number) => {
    if (!usedItemsData) return;

    const nextPage =
      Math.ceil((usedItemsData.fetchUseditems.length ?? 10) / 10) + 1;

    fetchMore({
      variables: { isSoldout: false, search: "", page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          return { fetchUseditems: [...prev.fetchUseditems] };
        }

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  return (
    <HomeUI
      itemsOfBestDatas={itemsOfBestData}
      pageStart={0}
      onLoadMore={onLoadMore}
      hasMore={true}
      usedItemsData={usedItemsData}
    />
  );
}
