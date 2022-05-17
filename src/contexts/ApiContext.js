import {
  useQuery as apolloQuery,
  useMutation as apolloMutation,
  useLazyQuery as apolloLazyQuery,
  useLazyMutation as apolloLazyMutation,
} from "@apollo/client";

import { useApp } from "./AppContext";

export { gql } from "@apollo/client";

function applyApiClientIn(func, query, options) {
  const { apiClient } = useApp();

  return func(query, {
    client: apiClient,
    ...options,
  });
}

export function useQuery(query, options) {
  return applyApiClientIn(apolloQuery, query, {
    ...options,
    fetchPolicy: "cache-and-network",
  });
}

export function useMutation(mutation, options) {
  return applyApiClientIn(apolloMutation, mutation, options);
}

export function useLazyQuery(query, options) {
  return applyApiClientIn(apolloLazyQuery, query, {
    ...options,
    fetchPolicy: "cache-and-network",
  });
}

export function useLazyMutation(mutation, options) {
  return applyApiClientIn(apolloLazyMutation, mutation, options);
}
