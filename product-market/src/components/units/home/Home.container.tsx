import { useQuery } from '@apollo/client'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { IQuery, IQueryFetchUseditemsArgs } from 'src/commons/types/graphql/types'
import { useAuth } from 'src/components/hooks/useAuth'
import { useMoveToPage } from 'src/components/hooks/useMoveToPage'
import HomeUI from './Home.presenter'
import { FETCH_USED_ITEMS, FETCH_USED_ITEMS_OF_BEST } from './Home.queries'

export default function Home() {
  const { push } = useMoveToPage()
  const { isLoggedIn, fetchUserInfo } = useAuth()
  const [isSoldout, setIsSoldout] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const { data: itemsOfBestData } = useQuery<Pick<IQuery, 'fetchUseditemsOfTheBest'>>(
    FETCH_USED_ITEMS_OF_BEST,
  )

  const {
    data: usedItemsData,
    fetchMore,
    refetch,
  } = useQuery<Pick<IQuery, 'fetchUseditems'>, IQueryFetchUseditemsArgs>(FETCH_USED_ITEMS)

  const onLoadMore = async (page: number) => {
    if (!usedItemsData) return

    const nextPage = Math.ceil((usedItemsData.fetchUseditems.length ?? 10) / 10) + 1

    await fetchMore({
      variables: { isSoldout, search: keyword, page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          return { fetchUseditems: [...prev.fetchUseditems] }
        }

        return {
          fetchUseditems: [...prev.fetchUseditems, ...fetchMoreResult.fetchUseditems],
        }
      },
    })
  }

  const onChangeTab = (key: string) => {
    setIsSoldout(key !== '1')
    refetch({ isSoldout: key !== '1', search: keyword, page: 0 })
  }

  const onClickProductRegister = useCallback(() => {
    if (isLoggedIn) {
      push('/product/register')
    } else {
      push('/login/email')
    }
  }, [])

  const onClickItem = (event: MouseEvent<HTMLDivElement>) => {
    push(`/product/${event.currentTarget.id}`)
  }

  const onChangeSearchbar = useCallback(
    (value: string) => {
      setKeyword(value)
      refetch({ isSoldout: isSoldout, search: value, page: 0 })
    },
    [isSoldout],
  )

  return (
    <HomeUI
      itemsOfBestDatas={itemsOfBestData}
      pageStart={0}
      onLoadMore={onLoadMore}
      hasMore={true}
      usedItemsData={usedItemsData}
      onChangeTab={onChangeTab}
      onClickProductRegister={onClickProductRegister}
      onClickItem={onClickItem}
      onChangeSearchbar={onChangeSearchbar}
    />
  )
}
