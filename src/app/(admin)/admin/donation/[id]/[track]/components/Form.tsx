'use client';

import { Tracking } from '@prisma/client';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';
import {
  handleCreateTracking,
  handleUpdateTracking
} from '@/utils/actions/tracking';

export default function Form({
  tracking,
  donation_id
}: {
  donation_id: string;
  tracking?: Tracking;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const toastId = toast.loading('Loading');
        formData.append('donation_id', donation_id);
        if (tracking) {
          try {
            await handleUpdateTracking(tracking.id, formData);
            toast.success('Success updating tracking', {
              id: toastId,
              duration: 1500
            });
            router.push('/admin/donation/' + donation_id);
          } catch (error) {
            toast.error('Error updating tracking', { id: toastId });
          }
        } else {
          try {
            await handleCreateTracking(formData);
            toast.success('Success creating tracking', {
              id: toastId,
              duration: 1500
            });
            router.push('/admin/donation/' + donation_id);
          } catch (error) {
            toast.error('Error creating tracking', { id: toastId });
          }
        }
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className="rounded-lg border-2 border-secondary p-2 focus:border-dark focus:outline-none"
          defaultValue={tracking && tracking.description}
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-fit rounded-lg bg-secondary px-8 py-4 text-[#FFFBF2]"
      >
        {tracking ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
