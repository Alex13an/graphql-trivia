import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient';

interface AuthUserData {
  id: number,
  login: string,
}

interface ValidUser {
  id: number,
  valid: boolean,
}

export const getUser = async (login: string): Promise<AuthUserData>  => {
  const candidate = await prisma.user.findUnique({
    where: {
      login,
    },
  });

  return candidate ? {
    id: candidate.id,
    login: candidate.login,
  } : null
}

export const createUser = async (login: string, password: string): Promise<AuthUserData> => {
  const hashPassword = await bcrypt.hash(password, 7);
  const newUser = await prisma.user.create({
    data: {
      login,
      password: hashPassword,
      name: login,
      gender: 0,
      refresh_token: '',
    },
  })

  return {
    id: newUser.id,
    login,
  }
}

export const validateUser = async (login: string, password: string): Promise<ValidUser> => {
  const user = await prisma.user.findUnique({
    where: {
      login,
    },
  });
  if (!user) {
    return {
      id: 0,
      valid: false,
    }
  }
  const valid = await bcrypt.compare(password, user.password);

  return {
    id: user.id,
    valid,
  };
}
