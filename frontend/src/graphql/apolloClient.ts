import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from "@apollo/client";

const httpLink = new HttpLink({ 
  uri: 'http://localhost:4000',
  credentials: 'include',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('access_token') || null,
    }
  }));

  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    httpLink,
  ]),
  cache: new InMemoryCache(),
  credentials: 'include',
})

export default apolloClient;
