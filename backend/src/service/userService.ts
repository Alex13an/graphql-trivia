import prisma from "../prisma/prismaClient";

interface UserData {
  name: string;
  ava: string;
  gender_id: number;
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
        gender_id: data.gender_id,
      }
    : null;
};
