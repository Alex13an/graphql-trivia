import auth from "./auth";
import userData from "./userData";
import gender from "./gender";

const resolvers = {
  Mutation: {
    ...auth.Mutation,
    ...userData.Mutation,
    ...gender.Mutation,
  },
  Query: {
    ...auth.Query,
    ...userData.Query,
    ...gender.Query,
  },
};

export default resolvers;
