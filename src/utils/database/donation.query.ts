'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const findAllDonation = async () => {
  return await prisma.donation.findMany({
    include: { donor: true, recipient: true }
  });
};

export const findFilterDonation = async (where: Prisma.DonationWhereInput) => {
  return await prisma.donation.findMany({
    where,
    include: {
      donor: true,
      recipient: true
    }
  });
};

export const findDonation = async (where: Prisma.DonationWhereUniqueInput) => {
  return await prisma.donation.findUnique({
    where,
    include: { donor: true, recipient: true }
  });
};

export const createDonation = async (data: Prisma.DonationCreateInput) => {
  return await prisma.donation.create({ data });
};

export const updateDonation = async (
  where: Prisma.DonationWhereUniqueInput,
  data: Prisma.DonationUpdateInput
) => {
  return await prisma.donation.update({ where, data });
};

export const deleteDonation = async (
  where: Prisma.DonationWhereUniqueInput
) => {
  return await prisma.donation.delete({ where });
};
