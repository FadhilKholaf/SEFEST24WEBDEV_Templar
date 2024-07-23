'use server';

import { createMessage } from '../database/message.query';
import { revalidatePath } from 'next/cache';

export const sendMessage = async (
  formData: FormData,
  room_id: string,
  sender_id: string
) => {
  const content = formData.get('content') as string;

  await createMessage({
    content,
    Room: { connect: { id: room_id } },
    sender: { connect: { id: sender_id } }
  });
  revalidatePath('/', 'layout');
};
