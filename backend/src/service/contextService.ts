import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkUserAccess = async (req): Promise<JwtPayload> => {
  try {
    const token = req.headers.authorization || '';
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return user as JwtPayload;
  } catch (err) {
    throw new GraphQLError('User is not authenticated: ' + err.message, {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      }
    })
  }
}
