import { AuthUserResponse, MutationAuthUserArgs } from "../generated/graphqlTypes";
import { generateAuthTokens, refreshAuthToken } from "../../service/tokenService";
import { validateUser } from "../../service/authUserService";
import { GraphQLError } from "graphql";

const auth = {
  Query: {
    test: () => "123",
  },
  Mutation: {
    authUser: async (_: never, { login, password }: MutationAuthUserArgs): Promise<AuthUserResponse> => {
      const validUser = await validateUser(login, password);

      if (!validUser.id) {
        throw new GraphQLError("No such user", {
          extensions: {
            code: "NO_SUCH_USER",
          },
        });
      }

      if (!validUser.valid) {
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: "INVALID_PASSWORD",
          },
        });
      }

      const tokens = await generateAuthTokens({ login, id: validUser.id });
      await refreshAuthToken(validUser.id, tokens.refreshToken);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    },
  },
};

export default auth;
