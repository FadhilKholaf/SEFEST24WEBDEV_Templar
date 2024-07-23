'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const findAllUser = async () => {
  return await prisma.user.findMany();
};

export const findAllDonor = async () => {
  return await prisma.user.findMany({
    where: { OR: [{ role: 'DONOR' }, { role: 'VOLUNTEER' }] }
  });
};

export const findAllRecipient = async () => {
  return await prisma.user.findMany({ where: { role: 'RECIPIENT' } });
};

export const findDonor = async (filter: string) => {
  return await prisma.user.findMany({
    where: {
      AND: [
        { email: { contains: filter } },
        { OR: [{ role: 'DONOR' }, { role: 'VOLUNTEER' }] }
      ]
    }
  });
};

export const findRecipient = async (filter: string) => {
  return await prisma.user.findMany({
    where: { AND: [{ email: { contains: filter } }, { role: 'RECIPIENT' }] }
  });
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({ where });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      ...data,
      password: data.password ? hashSync(data.password, 12) : undefined
    }
  });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({
    where,
    data: {
      ...data,
      password: data.password
        ? hashSync(data.password as string, 12)
        : undefined
    }
  });
};

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.delete({ where });
};
