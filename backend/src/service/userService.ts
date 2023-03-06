import prisma from "../prisma/prismaClient";

interface UserData {
  name: string;
  ava: string;
  gender: number;
}

export const getUserProfile = async (id: number): Promise<UserData> => {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return data
    ? {
        name: data.name,
        ava: "",
        gender: data.gender,
      }
    : null;
};
