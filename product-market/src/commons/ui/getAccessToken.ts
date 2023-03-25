import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    const endPoint = process.env.NEXT_PUBLIC_SERVER_URI as string;

    const client = new GraphQLClient(endPoint, {
      headers: {},
      credentials: "include",
    });

    const result = await client.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken?.accessToken;
    console.log("# New AccessToken :", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log((error as Error).message);
  }
};
