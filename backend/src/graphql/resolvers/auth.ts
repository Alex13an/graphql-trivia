import { AuthUserResponse, MutationAuthUserArgs } from "../generated/graphqlTypes";
import { generateAuthTokens, refreshAuthToken } from "../../service/tokenService";
import { validateUser, getUser, createUser } from "../../service/authUserService";
import { GraphQLError } from "graphql";

const auth = {
  Query: {
    test: () => "123",
  },
  Mutation: {
    authUser: async (_: never, { login, password, isSigned }: MutationAuthUserArgs): Promise<AuthUserResponse> => {
      let userId: number;

      if (isSigned) {
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
        
        userId = validUser.id;
      } else {
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
        userId = user.id;
      }

      const tokens = await generateAuthTokens({ login, id: userId });
      await refreshAuthToken(userId, tokens.refreshToken);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    },
  },
};

export default auth;
