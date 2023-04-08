import { useApolloClient, useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  isLoggedInState,
  useInfoState,
} from "src/commons/store";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMutationLoginUserArgs,
  IMutationLoginUserExampleArgs,
} from "src/commons/types/graphql/types";
import {
  CREATE_USER,
  FETCH_USER_LOGGED_IN,
  LOGIN_USER,
  LOGIN_USER_EXAMPLE,
} from "./queries";

export interface AuthCompletion {
  success: boolean;
  message?: string;
}

export const useAuth = () => {
  const client = useApolloClient();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(useInfoState);

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
          email,
          password,
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
      setIsLoggedIn(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  };

  const fetchUserInfo = async () => {
    if (isLoggedIn) {
      const result = await client.query({
        query: FETCH_USER_LOGGED_IN,
      });
      const { name, email, picture } = result.data.fetchUserLoggedIn;

      setUserInfo({ name, email, picture });
    }
  };

  const logout = () => {
    clear();
  };

  const clear = () => {
    setAccessToken(null);
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return {
    isLoggedIn,
    userInfo,
    join,
    emailLogin,
    logout,
    fetchUserInfo,
  };
};
