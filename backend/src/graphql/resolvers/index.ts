import auth from "./auth";

const resolvers = {
  Mutation: {
    ...auth.Mutation,
  },
}

export default resolvers;
