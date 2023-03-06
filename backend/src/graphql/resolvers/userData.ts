import { checkUserAccess } from "../../service/contextService";
import { getUserProfile } from "../../service/userService";
import { GetUserDataResponse } from "../generated/graphqlTypes";

const userData = {
  Query: {
    getUserData: async (_: never, __: never, { req }): Promise<GetUserDataResponse> => {
      const user = await checkUserAccess(req);
      const data = await getUserProfile(user.id);

      return data;
    },
  },
  Mutation: {
    test: () => null,
  },
};

export default userData;
