import prisma from "../prisma/prismaClient";
import jwt, { JwtPayload } from "jsonwebtoken";

interface GenerateAuthTokens {
  (payload: { id: number; login: string }): Promise<{ accessToken: string; refreshToken: string }>;
}

interface ValidateRefreshToken {
  (token: string): Promise<{ userId: number; login: string }>;
}

export const generateAuthTokens: GenerateAuthTokens = async (payload) => {
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
    },
  });
  return refreshToken;
};

export const validateAccessToken = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (err) {
    return null;
  }
};

export const validateRefreshToken: ValidateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });
    if (!userData || !user) {
      throw new Error("Invalid user data");
    }
    if (user.refresh_token !== token || userData.id !== user.id) {
      throw new Error("Refresh tokens aren't equal");
    }

    return {
      login: user.login,
      userId: user.id,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
