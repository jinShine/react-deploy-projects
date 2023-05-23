import { globalTheme } from '@/styles/theme/globalTheme'
import { EditOutlined } from '@ant-design/icons'
import { ConfigProvider, FloatButton, TabsProps } from 'antd'
import { Tabs } from 'antd'
import Head from 'next/head'
import { ItemCard } from 'src/commons/ui/item-card'
import { HomeItemList } from './Home.infiniteUI'
import * as S from './Home.styles'
import { IHomeUIProps } from './Home.types'
import SearchBar from 'src/commons/ui/searchBar'

export default function HomeUI(props: IHomeUIProps) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '판매중인상품',
      children: (
        <HomeItemList
          usedItemsData={props.usedItemsData}
          pageStart={props.pageStart}
          onLoadMore={props.onLoadMore}
          hasMore={props.hasMore}
          useWindow={true}
          onClickItem={props.onClickItem}
        />
      ),
    },
    {
      key: '2',
      label: '판매된상품',
      children: (
        <HomeItemList
          usedItemsData={props.usedItemsData}
          pageStart={props.pageStart}
          onLoadMore={props.onLoadMore}
          hasMore={props.hasMore}
          useWindow={true}
          onClickItem={props.onClickItem}
        />
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>상품 마켓</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Wrapper>
        <ConfigProvider
          theme={{ token: { colorPrimary: `${globalTheme.color.primary}` } }}>
          <FloatButton
            type="primary"
            icon={<EditOutlined />}
            tooltip={<div>상품등록하기</div>}
            style={{ right: 35, width: 50, height: 50 }}
            onClick={props.onClickProductRegister}
          />
        </ConfigProvider>
        <S.CarouselWrapper autoplay>
          <div>
            <S.CarouselContent src="/images/banner-1.jpg" />
          </div>
          <div>
            <S.CarouselContent src="/images/banner-2.jpg" />
          </div>
          <div>
            <S.CarouselContent src="/images/banner-3.jpg" />
          </div>
        </S.CarouselWrapper>
        <S.BestItemsWrapper>
          <S.BestItemTitle>베스트 상품</S.BestItemTitle>
          <S.ItemsWrapper>
            {props.itemsOfBestDatas?.fetchUseditemsOfTheBest &&
              props.itemsOfBestDatas?.fetchUseditemsOfTheBest.map(el => (
                <ItemCard
                  id={el._id}
                  key={el._id}
                  title={el.name}
                  remarks={el.remarks}
                  price={el.price ?? 0}
                  pickCount={el.pickedCount ?? 0}
                  onClickItem={props.onClickItem}
                />
              ))}
          </S.ItemsWrapper>
        </S.BestItemsWrapper>
        <S.ProductWrapper>
          <S.SearchBarWrapper>
            <SearchBar onChangeSearchbar={props.onChangeSearchbar} />
          </S.SearchBarWrapper>
          <Tabs
            defaultActiveKey="1"
            items={items}
            type={'card'}
            tabBarStyle={{ color: globalTheme.text.tertiary }}
            onChange={props.onChangeTab}
          />
        </S.ProductWrapper>
      </S.Wrapper>
    </>
  )
}
