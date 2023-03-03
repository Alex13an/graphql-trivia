import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})

export default apolloClient;
