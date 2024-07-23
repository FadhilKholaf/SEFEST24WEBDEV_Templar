'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const findAllMessage = async (where: Prisma.MessageWhereInput) => {
  return await prisma.message.findMany({
    where,
    include: { sender: { select: { name: true, role: true } } }
  });
};

export const createMessage = async (data: Prisma.MessageCreateInput) => {
  return await prisma.message.create({ data });
};
