import styled from '@emotion/styled'
import { Image } from 'antd'
import { MouseEvent } from 'react'
import { EmptyImage } from '../empty-image'

interface IProps {
  id: string
  imgURL?: string | null
  title: string
  remarks: string
  price: number
  pickCount: number
  onClickItem: (event: MouseEvent<HTMLDivElement>) => void
}

export const ItemCard = (props: IProps) => {
  return (
    <Wrapper id={props.id} onClick={props.onClickItem}>
      {props.imgURL ? (
        <Thumbnail src={props.imgURL} alt="상품 이미지" width={'100%'} />
      ) : (
        <EmptyImage />
      )}
      <Name>{props.title ? props.title : '제목없음'}</Name>
      <Remark>{props.remarks}</Remark>
      <PriceWrapper>
        <PickWrapper>
          <PickImage src="/images/ic-heart.svg" />
          <PickCount>{props.pickCount ?? 0}</PickCount>
        </PickWrapper>
        <Price>{`${props.price?.toLocaleString()}원`}</Price>
      </PriceWrapper>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 10px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 2px 10px rgba(76, 78, 100, 0.22);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`

export const Thumbnail = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: ${props => props.theme.color.divider};
`

export const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
  margin-top: 4px;
  padding: 6px 0;
  width: 96%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Remark = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.text.secondary};
`

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  /* padding-top: 16px; */
`

export const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.text.primary};
  padding-top: 8px;
`

export const PickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

export const PickImage = styled.img`
  height: 16px;
  aspect-ratio: 1;
`

export const PickCount = styled.span`
  font-size: 12px;
  color: ${props => props.theme.text.tertiary};
  padding-bottom: 2px;
  padding-left: 2px;
`
