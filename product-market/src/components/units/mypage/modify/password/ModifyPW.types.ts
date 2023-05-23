import * as yup from 'yup'

export interface IModifyPWFormInput {
  currentPassword: string
  password: string
  passwordConfirm: string
}

export interface IChangeButtonProps {
  isValid: boolean
}

export const modifyPWSchema = yup.object({
  currentPassword: yup.string().required('현재 이메일을 입력해주세요.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\w\W]{8,16}$/,
      '문자+숫자 조합 8~16자리의 비밀번호를 입력해주세요.',
    )
    .max(16, '비밀번호는 최대 16자리까지 입력 가능합니다.')
    .required('비밀번호를 입력해주세요.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined, '비밀번호가 다릅니다.'])
    .required('비밀번호를 확인해주세요.'),
})
