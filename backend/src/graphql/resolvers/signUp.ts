import {
  SignUpResponse,
  MutationSignUpArgs,
} from "../generated/graphqlTypes";
import { generateAuthTokens, refreshAuthToken } from "../../service/tokenService";
import { createUser, getUser } from "../../service/authUserService";
import { GraphQLError } from "graphql";

const signUp = {
  Query: {
    test: () => "123",
  },
  Mutation: {
    signUp: async (_: never, { login, password }: MutationSignUpArgs): Promise<SignUpResponse> => {
      if (login.length < 2 || password.length < 2) {
        throw new GraphQLError("Incorrect login or password", {
          extensions: {
            code: "INCORRECT_CREDENTIALS",
          }
        })
      }
      const candidate = await getUser(login);

      if (candidate) {
        throw new GraphQLError("User already exists", {
          extensions: {
            code: "USER_ALREADY_EXISTS",
          }
        })
      }

      const user = await createUser(login, password);
      const tokens = await generateAuthTokens({ login, id: user.id });
      await refreshAuthToken(user.id, tokens.refreshToken);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    },
  },
};

export default signUp;
