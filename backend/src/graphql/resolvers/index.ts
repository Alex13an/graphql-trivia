import auth from "./auth";
import signUp from "./signUp";

const resolvers = {
  Mutation: {
    ...auth.Mutation,
    ...signUp.Mutation,
  },
}

export default resolvers;
