'use server';

import prisma from '@/lib/prisma';
import { encrypt } from '@/utils/encryption';
import { Prisma } from '@prisma/client';

export const findAllOrganizations = async () => {
  return await prisma.organization.findMany();
};

export const findOrganization = async (
  where: Prisma.OrganizationWhereUniqueInput
) => {
  return await prisma.organization.findUnique({
    where
  });
};

export const createOrganization = async (
  data: Prisma.OrganizationCreateInput
) => {
  return await prisma.organization.create({
    data: {
      ...data,
      password: await encrypt(data.password)
    }
  });
};
