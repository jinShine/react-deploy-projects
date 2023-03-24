import React from "react";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

interface IApolloSettingProps {
  children: JSX.Element;
}

const cache = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URI,
    headers: {},
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache,
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
