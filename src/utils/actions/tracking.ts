'use server';

import { revalidatePath } from 'next/cache';
import { createTracking, updateTracking } from '../database/tracking.query';

export const handleCreateTracking = async (formData: FormData) => {
  const description = formData.get('description') as string;
  const donation_id = formData.get('donation_id') as string;

  await createTracking({
    description,
    donation: { connect: { id: donation_id } }
  });
  revalidatePath('/', 'layout');
};

export const handleUpdateTracking = async (id: string, formData: FormData) => {
  const description = formData.get('description') as string;
  const donation_id = formData.get('donation_id') as string;

  await updateTracking(
    { id },
    {
      description,
      donation: { connect: { id: donation_id } }
    }
  );
  revalidatePath('/', 'layout');
};
