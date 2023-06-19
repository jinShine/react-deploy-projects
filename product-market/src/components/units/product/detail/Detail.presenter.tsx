import { globalTheme } from '@/styles/theme/globalTheme'
import { EditOutlined } from '@ant-design/icons'
import { ConfigProvider, Divider, FloatButton, Tag, Tooltip } from 'antd'
import DOMPurify from 'dompurify'
import { EmptyImage } from 'src/commons/ui/empty-image'
import { KakaoMap } from 'src/commons/ui/kakao-map'
import { Tags } from 'src/commons/ui/tag-list'
import { getDate } from 'src/commons/utils/date'
import { useAuth } from 'src/components/hooks/useAuth'
import * as S from './Detail.styles'
import { IProductDetailUIProps } from './Detail.types'

export default function ProductDetailUI(props: IProductDetailUIProps) {
  const { userInfo } = useAuth()
  const useditem = props.useditem?.fetchUseditem

  return (
    <S.Wrapper>
      {userInfo?.email === useditem?.seller?.email && (
        <ConfigProvider
          theme={{ token: { colorPrimary: `${globalTheme.text.primary}` } }}>
          <FloatButton
            type="primary"
            icon={<EditOutlined />}
            tooltip={<div>수정하기</div>}
            style={{ right: 35, width: 50, height: 50 }}
            onClick={props.onClickProductEdit}
          />
        </ConfigProvider>
      )}
      <S.CarouselWrapper autoplay>
        {useditem?.images && useditem?.images?.every(img => img !== '') ? (
          useditem.images?.map((url, index) => (
            <div key={index}>
              {url ? (
                <S.CarouselContent
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/${url}`}
                />
              ) : (
                <EmptyImage height={500} width={700} />
              )}
            </div>
          ))
        ) : (
          <EmptyImage height={500} width={700} />
        )}
      </S.CarouselWrapper>
      <S.ProfileWrapper>
        <S.SellerWrapper>
          <S.SellerImage
            src={
              useditem?.seller?.picture
                ? `${process.env.NEXT_PUBLIC_STORAGE_URI}/${useditem?.seller?.picture}`
                : '/images/ic-profile.svg'
            }
          />
          <S.SellerName>{useditem?.seller?.name ?? '판매자'}</S.SellerName>
        </S.SellerWrapper>
        {useditem?.useditemAddress?.address && (
          <Tooltip
            placement="leftTop"
            title={`${useditem.useditemAddress.address}\n${useditem.useditemAddress.addressDetail}`}
            overlayStyle={{
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
            }}>
            <Tag color="default">위치</Tag>
          </Tooltip>
        )}
      </S.ProfileWrapper>
      <S.ProductInfoWrapper>
        <S.Remarks>{useditem?.remarks}</S.Remarks>
        <S.TitleWrapper>
          <S.Title>{useditem?.name}</S.Title>
          <S.PickWrapper>
            <S.PickImage src="/images/ic-heart.svg" onClick={props.onClickPick} />
            <S.PickCount>{useditem?.pickedCount ?? 0}</S.PickCount>
          </S.PickWrapper>
        </S.TitleWrapper>
        <S.CreatedAt>{getDate(useditem?.createdAt)}</S.CreatedAt>
        <S.TagWrapper>
          <Tags data={useditem?.tags} />
        </S.TagWrapper>
        <S.Price>{`${useditem?.price?.toLocaleString()}원`}</S.Price>
        {typeof window !== 'undefined' && (
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(useditem?.contents ?? ''),
            }}
          />
        )}
        <Divider />
      </S.ProductInfoWrapper>
      <S.LocationTitle>여기서 거래 원해요 👋🏻</S.LocationTitle>
      <KakaoMap
        address={useditem?.useditemAddress?.address}
        style={{
          width: '700px',
          height: '400px',
          borderRadius: 10,
        }}
      />
      <S.LocationAddress>{`${useditem?.useditemAddress?.address ?? ''} ${
        useditem?.useditemAddress?.addressDetail ?? ''
      }`}</S.LocationAddress>
      <Divider />
    </S.Wrapper>
  )
}
