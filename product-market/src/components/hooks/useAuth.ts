import { gql, useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { accessTokenState, isLoggedInState } from "src/commons/store";
import {
  IMutation,
  IMutationLoginUserArgs,
  IMutationLoginUserExampleArgs,
} from "src/commons/types/graphql/types";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">,
    IMutationLoginUserExampleArgs
  >(LOGIN_USER_EXAMPLE);

  // const [loginUser] = useMutation(LOGIN_USER);

  const emailLogin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string } | undefined> => {
    try {
      const result = await loginUserExample({
        variables: {
          // email,
          // password,
          email: "buzz1@gmail.com",
          password: "123",
        },
      });

      const accessTokenData = result.data?.loginUserExample.accessToken;
      if (!accessTokenData) {
        return {
          success: false,
          message: "로그인에 실패했습니다. 다시 시도해 주세요.",
        };
      }

      setAccessToken(accessTokenData);
      setIsLoggedIn(true);

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

  const clear = () => {
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    emailLogin,
  };
};
