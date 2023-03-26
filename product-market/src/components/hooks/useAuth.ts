import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, isLoggedInState } from "src/commons/store";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMutationLoginUserArgs,
  IMutationLoginUserExampleArgs,
} from "src/commons/types/graphql/types";

export interface AuthCompletion {
  success: boolean;
  message?: string;
}

/** 로그인 */
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

/** 로그인(테스트) */
const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

/** 회원가입 */
export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

/** 로그인 정보 */
const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      createdAt
    }
  }
`;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    setIsLoggedIn(accessToken !== undefined);
  }, [accessToken]);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">,
    IMutationLoginUserExampleArgs
  >(LOGIN_USER_EXAMPLE);

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const [fetchUserInfo, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  const join = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthCompletion> => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            name,
            email,
            password,
          },
        },
      });

      return { success: true, message: "회원가입 성공!" };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  };

  const emailLogin = async (
    email: string,
    password: string
  ): Promise<AuthCompletion> => {
    try {
      const result = await loginUser({
        variables: {
          // email,
          // password,
          email: "buzz1@gmail.com",
          password: "123",
        },
      });

      const accessTokenData = result.data?.loginUser.accessToken;
      if (!accessTokenData) {
        return {
          success: false,
          message: "로그인에 실패했습니다. 다시 시도해 주세요.",
        };
      }

      setAccessToken(accessTokenData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  };

  const logout = () => {
    clear();
  };

  const clear = () => {};

  return {
    isLoggedIn,
    join,
    emailLogin,
  };
};
