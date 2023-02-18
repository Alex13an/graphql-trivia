import jwt from 'jsonwebtoken';

export const getUser = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch(err) {
    console.log(err);
    return null;
  }
}
