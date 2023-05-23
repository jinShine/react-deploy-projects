import { MouseEvent } from 'react'
import { IQuery } from 'src/commons/types/graphql/types'

export interface IHomeUIProps {
  itemsOfBestDatas?: Pick<IQuery, 'fetchUseditemsOfTheBest'>
  pageStart: number
  // onLoadMore?: (page: number) => void;
  onLoadMore: (page: number) => void
  hasMore?: boolean
  usedItemsData?: Pick<IQuery, 'fetchUseditems'>
  onChangeTab: (key: string) => void
  onClickProductRegister?: () => void
  onClickItem: (event: MouseEvent<HTMLDivElement>) => void
  onChangeSearchbar: (value: string) => void
}

export interface IHomeItemListProps {
  pageStart: number
  onLoadMore: (page: number) => void
  useWindow: boolean
  hasMore?: boolean
  usedItemsData?: Pick<IQuery, 'fetchUseditems'>
  onClickItem: (event: MouseEvent<HTMLDivElement>) => void
}
