import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { IChangeButtonProps, IModifyPWFormInput, modifyPWSchema } from './ModifyPW.types'

interface IProps {
  onClickSubmit: (data: IModifyPWFormInput) => void
}

export default function ModifyPWUI(props: IProps) {
  const { handleSubmit, control, formState } = useForm<IModifyPWFormInput>({
    resolver: yupResolver(modifyPWSchema),
    mode: 'onSubmit',
  })

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>비밀번호 변경</Title>
      </TitleWrapper>
      <FormWrapper onSubmit={handleSubmit(props.onClickSubmit)}>
        <InputWrapper>
          <Label>현재 비밀번호</Label>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="현재 비밀번호를 입력해 주세요."
                value={value}
                security=""
                onChange={onChange}
              />
            )}
          />
          <ErrorMessage>{formState.errors.currentPassword?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Label>새 비밀번호</Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="새 비밀번호를 입력해 주세요."
                value={value}
                onChange={onChange}
              />
            )}
          />
          <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Label>새 비밀번호 확인</Label>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="새 비밀번호를 확인해 주세요."
                value={value}
                onChange={onChange}
              />
            )}
          />
          <ErrorMessage>{formState.errors.passwordConfirm?.message}</ErrorMessage>
        </InputWrapper>
        <SubmitButtonWrapper>
          <SubmitButton htmlType="submit" isValid={formState.isValid}>
            변경
          </SubmitButton>
        </SubmitButtonWrapper>
      </FormWrapper>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 54px;
`

export const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin-top: 10px;
`

export const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text.secondary};
  padding: 10px 2px;
`

export const InputField = styled(Input.Password)`
  height: 46px;
  margin-top: 6px;
`

export const ErrorMessage = styled.p`
  color: ${props => props.theme.color.error};
  font-size: 12px;
  padding: 4px;
`

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const SubmitButton = styled(Button)<IChangeButtonProps>`
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${props =>
    props.isValid ? props.theme.color.primary : props.theme.color.divider};
  margin-top: 30px;
`
