'use server';

import { PickupStatus } from '@prisma/client';
import { createDonation, updateDonation } from '../database/donation.query';
import { revalidatePath } from 'next/cache';

export const handleCreateDonation = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const donor_id = formData.get('donor_id') as string;
  const recipient_id = formData.get('recipient_id') as string;
  const pickup_coordinate = formData.get('pickup_coordinate') as string;
  const pickup_status = formData.get('pickup_status') as PickupStatus;

  await createDonation({
    name,
    description,
    donor: { connect: { id: donor_id } },
    recipient: recipient_id ? { connect: { id: recipient_id } } : undefined,
    pickup_coordinate,
    pickup_status
  });
  revalidatePath('/', 'layout');
};

export const handleUpdateDonation = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const donor_id = formData.get('donor_id') as string;
  const recipient_id = formData.get('recipient_id') as string;
  const pickup_coordinate = formData.get('pickup_coordinate') as string;
  const pickup_status = formData.get('pickup_status') as PickupStatus;

  await updateDonation(
    { id },
    {
      name,
      description,
      donor: { connect: { id: donor_id } },
      recipient: recipient_id
        ? { connect: { id: recipient_id } }
        : { disconnect: { id: recipient_id } },
      pickup_coordinate,
      pickup_status
    }
  );
  revalidatePath('/', 'layout');
};
