'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const findAllRoom = async (where?: Prisma.RoomWhereInput) => {
  return await prisma.room.findMany({
    where,
    include: {
      user: true,
      message: { include: { sender: true }, orderBy: { createdAt: 'desc' } }
    }
  });
};
