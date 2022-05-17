import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import Server from "./Server";

export const NewAPIClient = (token, path) => {
  return new ApolloClient({
    link: createUploadLink({
      uri: `${Server.url}${path}/graphql.json`,
      headers: { Authorization: `Bearer ${token}` },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
};

export const buildApiClient = (token) => {
  const path = token.user ? "/user" : "";
  return NewAPIClient(token.access_token, path);
};
