import InfiniteScroll from 'react-infinite-scroller'
import ItemList from 'src/commons/ui/item-list'
import { IHomeItemListProps } from './Home.types'

export function HomeItemList(props: IHomeItemListProps) {
  return (
    <InfiniteScroll
      pageStart={props.pageStart}
      loadMore={props.onLoadMore}
      hasMore={props.hasMore}
      useWindow={props.useWindow}>
      {props.usedItemsData ? (
        props.usedItemsData?.fetchUseditems.map((el, index) => (
          <ItemList
            id={el._id}
            key={`${el._id}` + `${index}`}
            data={el}
            onClickItem={props.onClickItem}
          />
        ))
      ) : (
        <></>
      )}
    </InfiniteScroll>
  )
}
