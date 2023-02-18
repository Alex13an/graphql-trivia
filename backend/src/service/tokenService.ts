import prisma from "../prisma/prismaClient";
import jwt from "jsonwebtoken";

export const generateAuthTokens = async (payload: {
  id: number;
  login: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshAuthToken = async (userId: number, refreshToken: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refresh_token: refreshToken,
    }
  })
  return refreshToken;
}
