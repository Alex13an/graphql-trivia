import auth from "./auth";
import userData from "./userData";

const resolvers = {
  Mutation: {
    ...auth.Mutation,
    ...userData.Mutation,
  },
  Query: {
    ...auth.Query,
    ...userData.Query,
  },
};

export default resolvers;
