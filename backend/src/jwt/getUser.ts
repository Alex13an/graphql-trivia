import jwt from 'jsonwebtoken';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
}
