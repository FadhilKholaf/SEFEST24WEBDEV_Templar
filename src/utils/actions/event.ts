'use server';

import { revalidatePath } from 'next/cache';
import { createEvent, updateEvent } from '../database/event.query';

export const handleCreateEvent = async (
  organizer_id: string,
  formData: FormData
) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const slug = formData.get('slug') as string;

  await createEvent({
    name,
    description,
    slug,
    organizer: { connect: { id: 'f7d5073d-bcec-4ec4-9d01-f4428fd3aaf3' } }
  });
  revalidatePath('/', 'layout');
};

export const handleUpdateEvent = async (
  id: string,
  organizer_id: string,
  formData: FormData
) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const slug = formData.get('slug') as string;

  await updateEvent(
    { id },
    {
      name,
      description,
      slug,
      organizer: { connect: { id: organizer_id } }
    }
  );
  revalidatePath('/', 'layout');
};
