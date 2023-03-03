import { AuthUserResponse, MutationAuthUserArgs } from "../generated/graphqlTypes";
import { generateAuthTokens, refreshAuthToken, validateRefreshToken } from "../../service/tokenService";
import { validateUser, getUser, createUser } from "../../service/authUserService";
import { GraphQLError } from "graphql";

const auth = {
  Query: {
    refreshUser: async (_: never, __: never, { req, res }): Promise<AuthUserResponse> => {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new GraphQLError('No refresh token', {
          extensions: {
            code: "NO_REFRESH_TOKEN",
          },
        });
      }

      const userData = await validateRefreshToken(refreshToken);
      if (!userData) {
        throw new GraphQLError('Invalid refresh token', {
          extensions: {
            code: "INVALID_REFRESH_TOKEN",
          },
        });
      }

      const tokens = await generateAuthTokens({ login: userData.login, id: userData.userId });
      await refreshAuthToken(userData.userId, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/refresh',
      })

      return {
        accessToken: tokens.accessToken,
      }
    },
  },
  Mutation: {
    authUser: async (_: never, { login, password, isSigned }: MutationAuthUserArgs, { res }): Promise<AuthUserResponse> => {
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

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/refresh',
      })

      return {
        accessToken: tokens.accessToken,
      }
    },
  },
};

export default auth;
