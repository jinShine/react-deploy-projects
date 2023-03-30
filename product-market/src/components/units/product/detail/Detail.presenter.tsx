import { globalTheme } from "@/styles/theme/globalTheme";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Divider, Space, Tooltip } from "antd";
import { IQuery } from "src/commons/types/graphql/types";
import { EmptyImage } from "src/commons/ui/empty-image";
import { KakaoMap } from "src/commons/ui/kakao-map";
import { Tags } from "src/commons/ui/tag-list";
import * as S from "./Detail.styles";

interface IProps {
  useditem: Pick<IQuery, "fetchUseditem"> | undefined;
}

export default function ProductDetailUI(props: IProps) {
  const useditem = props.useditem?.fetchUseditem;

  return (
    <S.Wrapper>
      <S.CarouselWrapper autoplay>
        {useditem?.images && useditem.images.length > 0 ? (
          useditem.images?.map((url, index) => (
            <div>
              <S.CarouselContent
                key={index}
                src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/${url}`}
              />
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
                : "/images/ic-profile.svg"
            }
          />
          <S.SellerName>{useditem?.seller?.name ?? "판매자"}</S.SellerName>
        </S.SellerWrapper>
        {useditem?.useditemAddress && (
          <Tooltip
            placement="leftTop"
            title={`${useditem.useditemAddress.address}\n${useditem.useditemAddress.addressDetail}`}
            overlayStyle={{
              fontSize: "13px",
              whiteSpace: "pre-wrap",
            }}
          >
            <EnvironmentOutlined style={{ color: globalTheme.color.primary }} />
          </Tooltip>
        )}
      </S.ProfileWrapper>
      <S.Divider />
      <S.ProductInfoWrapper>
        <S.Remarks>{useditem?.remarks}</S.Remarks>
        <S.TitleWrapper>
          <S.Title>{useditem?.name}</S.Title>
          <S.PickWrapper>
            <S.PickImage src="/images/ic-heart.svg" />
            <S.PickCount>{useditem?.pickedCount ?? 0}</S.PickCount>
          </S.PickWrapper>
        </S.TitleWrapper>
        <S.CreatedAt>{useditem?.createdAt}</S.CreatedAt>
        <S.TagWrapper>
          <Tags data={useditem?.tags} />
        </S.TagWrapper>
        <S.Price>{`${useditem?.price?.toLocaleString()}원`}</S.Price>
        <S.Contents>{useditem?.contents}</S.Contents>
        <Divider />
      </S.ProductInfoWrapper>
      <S.LocationTitle>여기서 거래 원해요 👋🏻</S.LocationTitle>
      <KakaoMap
        lat={useditem?.useditemAddress?.lat ?? 33.55635}
        lng={useditem?.useditemAddress?.lng ?? 126.795841}
        style={{
          width: "700px",
          height: "400px",
          borderRadius: 10,
        }}
      />
    </S.Wrapper>
  );
}
