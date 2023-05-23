import Script from 'next/script'
import { CSSProperties, useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface IProps {
  address?: string | undefined | null
  style: CSSProperties
}

export const KakaoMap = (props: IProps) => {
  const [coords, setCoords] = useState<kakao.maps.LatLng>()
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    if (!map) return

    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(props.address ?? '', (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const latlng = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x))
        setCoords(latlng)
      }
    })
  }, [map, props.address])

  return (
    <>
      <Map
        center={{
          lat: coords?.getLat() ?? 37.553836,
          lng: coords?.getLng() ?? 126.969652,
        }}
        style={props.style}
        onCreate={setMap}>
        <MapMarker
          position={{
            lat: coords?.getLat() ?? 37.553836,
            lng: coords?.getLng() ?? 126.969652,
          }}></MapMarker>
      </Map>
      <Script
        src={`${process.env.NEXT_PUBLIC_KAKAO_MAP_URI}`}
        strategy="beforeInteractive"
      />
    </>
  )
}
