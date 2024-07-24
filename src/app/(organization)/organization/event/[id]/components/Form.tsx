'use client';

import { Event } from '@prisma/client';
import { toast } from 'sonner';

import { handleCreateUser, handleUpdateUser } from '@/utils/actions/user';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/global/button';
import { handleCreateEvent, handleUpdateEvent } from '@/utils/actions/event';
import { useSession } from 'next-auth/react';

export default function Form({ event }: { event?: Event }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const toastId = toast.loading('Loading');
        if (event) {
          try {
            await handleUpdateUser(event.id, formData);
            toast.success('Success updating event', {
              id: toastId,
              duration: 1500
            });
            router.push('/organization/event');
          } catch (error) {
            toast.error('Error updating event', { id: toastId });
          }
        } else {
          try {
            await handleCreateEvent(session?.user?.id!, formData);
            toast.success('Success creating event', {
              id: toastId,
              duration: 1500
            });
            router.push('/organization/event');
          } catch (error) {
            toast.error('Error creating event', { id: toastId });
          }
        }
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white">
          Nama
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="focus:border-dark rounded-lg border-2 border-white bg-primary p-2 text-white focus:outline-none"
          defaultValue={event && event.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-white">
          Deskripsi
        </label>
        <textarea
          name="description"
          id="description"
          required
          className="focus:border-dark rounded-lg border-2 border-white bg-primary p-2 text-white focus:outline-none"
          defaultValue={event && event.description!}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          className="focus:border-dark rounded-lg border-2 border-white bg-primary p-2 text-white focus:outline-none"
          placeholder={event && 'Masukkan Slug'}
        />
      </div>
      <Button type="submit" variant={'default'}>
        {event ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}
