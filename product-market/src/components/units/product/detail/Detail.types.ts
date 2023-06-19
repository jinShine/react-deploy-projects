import { IQuery } from '@/src/commons/types/graphql/types'

export interface IProductDetailUIProps {
  useditem: Pick<IQuery, 'fetchUseditem'> | undefined
  onClickPick: () => void
  onClickProductEdit: () => void
}
