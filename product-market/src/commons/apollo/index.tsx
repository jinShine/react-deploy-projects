import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useAuth } from 'src/components/hooks/useAuth'
import { accessTokenState } from '../store'
import { updateAccessToken } from '../utils/updateAccessToken'

interface IApolloSettingProps {
  children: JSX.Element | JSX.Element[]
}

const cache = new InMemoryCache()

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  useEffect(() => {
    void updateAccessToken().then(newAccessToken => {
      setAccessToken(newAccessToken)
    })
  }, [])

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            updateAccessToken()
              .then(newAccessToken => {
                setAccessToken(newAccessToken)

                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                })
              })
              .catch(() => setAccessToken('')),
          ).flatMap(() => forward(operation))
        }
      }
    }
  })

  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URI,
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache,
    connectToDevTools: true,
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
