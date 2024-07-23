'use server';

import { Role } from '@prisma/client';
import { createUser, updateUser } from '../database/user.query';
import { revalidatePath } from 'next/cache';

export const handleCreateUser = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as Role;

  await createUser({ email, role, password, description, name });
  revalidatePath('/', 'layout');
};

export const handleUpdateUser = async (id: string, formData: FormData) => {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as Role;
  const request_donation = formData.get('request_donation') as string;

  await updateUser(
    { id },
    {
      email,
      role,
      password,
      description,
      name,
      request_donation: request_donation === 'true'
    }
  );
  revalidatePath('/', 'layout');
};
