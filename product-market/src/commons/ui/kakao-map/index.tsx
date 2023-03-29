import Script from "next/script";
import { CSSProperties } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface IProps {
  lat: number;
  lng: number;
  style: CSSProperties;
}

export const KakaoMap = (props: IProps) => {
  return (
    <>
      <Map
        center={{ lat: Number(`${props.lat}`), lng: Number(`${props.lng}`) }}
        style={props.style}
      >
        <MapMarker
          position={{
            lat: Number(`${props.lat}`),
            lng: Number(`${props.lng}`),
          }}
        ></MapMarker>
      </Map>
      <Script
        src={`${process.env.NEXT_PUBLIC_KAKAO_MAP_URI}`}
        strategy="beforeInteractive"
      />
    </>
  );
};
