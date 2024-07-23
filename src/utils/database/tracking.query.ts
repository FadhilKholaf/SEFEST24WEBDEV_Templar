'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const findDonationTracking = async (
  where: Prisma.TrackingWhereInput
) => {
  return await prisma.tracking.findMany({ where });
};

export const findTracking = async (where: Prisma.TrackingWhereUniqueInput) => {
  return await prisma.tracking.findUnique({ where });
};

export const createTracking = async (data: Prisma.TrackingCreateInput) => {
  return await prisma.tracking.create({ data });
};
export const updateTracking = async (
  where: Prisma.TrackingWhereUniqueInput,
  data: Prisma.TrackingCreateInput
) => {
  return await prisma.tracking.update({ where, data });
};

export const deleteTracking = async (
  where: Prisma.TrackingWhereUniqueInput
) => {
  return await prisma.tracking.delete({ where });
};
