import { gql, GraphQLClient } from 'graphql-request'

/** Update AccessToken */
const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`

export const updateAccessToken = async () => {
  try {
    const endPoint = process.env.NEXT_PUBLIC_SERVER_URI as string
    const client = new GraphQLClient(endPoint, { credentials: 'include' })
    const result = (await client.request(RESTORE_ACCESS_TOKEN)) as any
    const newAccessToken = result.restoreAccessToken.accessToken

    return newAccessToken
  } catch (error) {
    console.log('# Update AccessToken :', (error as Error).message)
  }
}
