'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const findAllEvent = async (
  where?: Prisma.EventWhereInput,
  include?: Prisma.EventInclude
) => {
  return await prisma.event.findMany({ where, include });
};

export const findEventVolunteer = async (id: string) => {
  return await prisma.organization.findUnique({
    where: { id },
    include: { events: { include: { volunteers: true } } }
  });
};

export const findEvent = async (where: Prisma.EventWhereUniqueInput) => {
  return await prisma.event.findUnique({ where });
};

export const createEvent = async (data: Prisma.EventCreateInput) => {
  return await prisma.event.create({ data });
};

export const updateEvent = async (
  where: Prisma.EventWhereUniqueInput,
  data: Prisma.EventCreateInput
) => {
  return await prisma.event.update({ where, data });
};
