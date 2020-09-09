import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'node-fetch';
import { onError } from '@apollo/client/link/error';

// Exported for testing.
export const createErrorHandler = (log) => ({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    log(`[Network error]: ${networkError}`);
  }
};

const onErrorLink = onError(createErrorHandler(console.error));

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql', // mocked
  credentials: 'omit',
  fetch,
});

const initialState =
  (typeof window !== 'undefined' && window.__NEXT_DATA__?.apolloState) || {};

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache().restore(initialState),
  link: ApolloLink.from([onErrorLink, httpLink]),
});

export default client;
