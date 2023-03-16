import { Gender } from "@prisma/client";
import prisma from "../prisma/prismaClient";

export const createGender = async (title: string, description: string): Promise<Gender> => {
  const newGender = await prisma.gender.create({
    data: {
      title,
      description,
    },
  });

  return {
    id: newGender.id,
    title,
    description,
  };
};
