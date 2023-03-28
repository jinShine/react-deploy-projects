import InfiniteScroll from "react-infinite-scroller";
import ItemList from "src/commons/ui/item-list";
import { IHomeUIProps } from "./Home.types";

export function HomeItemList(props: IHomeUIProps) {
  return (
    <InfiniteScroll
      pageStart={props.pageStart}
      loadMore={props.onLoadMore}
      hasMore={props.hasMore}
      useWindow={true}
    >
      {props.usedItemsData ? (
        props.usedItemsData?.fetchUseditems.map((el, index) => (
          <ItemList id={el._id} key={`${el._id}` + `${index}`} data={el} />
        ))
      ) : (
        <></>
      )}
    </InfiniteScroll>
  );
}
