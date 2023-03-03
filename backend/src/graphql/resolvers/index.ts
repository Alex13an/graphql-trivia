import auth from "./auth";

const resolvers = {
  Mutation: {
    ...auth.Mutation,
  },
  Query: {
    ...auth.Query,
  }
}

export default resolvers;
