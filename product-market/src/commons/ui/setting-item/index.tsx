import { RightOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { SyntheticEvent } from 'react'
import { SettingData } from 'src/components/units/mypage/setting/Setting.types'

interface IProps {
  settingData?: SettingData
  title: string
  showIndicator?: boolean
  showDivider?: boolean
  onClick: (event: SyntheticEvent) => void
}

export default function SettingItem(props: IProps) {
  return (
    <>
      <Wrapper id={String(props.settingData)} onClick={props.onClick}>
        <Label>{props.title}</Label>
        {props.showIndicator && <IndicatorImage />}
      </Wrapper>
      {props.showDivider && <Divider />}
    </>
  )
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

export const Label = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: ${props => props.theme.text.primary};
`

export const IndicatorImage = styled(RightOutlined)`
  color: ${props => props.theme.text.tertiary};
`

const Divider = styled.div`
  background-color: ${props => props.theme.color.divider};
  height: 1px;
  width: 100%;
`
