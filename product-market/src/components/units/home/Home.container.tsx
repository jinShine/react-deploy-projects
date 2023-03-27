import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { IQuery } from "src/commons/types/graphql/types";
import { useAuth } from "src/components/hooks/useAuth";
import HomeUI from "./Home.presenter";
import { FETCH_USED_ITEMS_OF_BEST } from "./Home.types";

export default function Home() {
  const { data: itemsOfBestData } = useQuery<
    Pick<IQuery, "fetchUseditemsOfTheBest">
  >(FETCH_USED_ITEMS_OF_BEST);

  const { isLoggedIn, fetchUserInfo } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <HomeUI itemsOfBestDatas={itemsOfBestData?.fetchUseditemsOfTheBest} />;
}
