'use client';

import { Button, Link } from '@/app/components/global/button';
import {
  deleteTracking,
  findDonationTracking
} from '@/utils/database/tracking.query';
import { Tracking } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TrackingData({ donation_id }: { donation_id: string }) {
  const [tracking, setTracking] = useState<Tracking[]>();

  const findTracking = async () => {
    setTracking(await findDonationTracking({ donation_id }));
  };

  useEffect(() => {
    findTracking();
  }, []);

  const dateFormat = (createdAt: Date) => {
    const date = new Date(createdAt);

    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'shortGeneric'
    });

    return formatter.format(date);
  };

  const handleDeleteTracking = async (id: string) => {
    const toastId = toast.loading('Loading');
    try {
      await deleteTracking({ id });
      toast.success('Success deleting tracking', {
        id: toastId,
        duration: 1500
      });
      window.location.reload();
    } catch (error) {
      toast.error('Error deleting tracking', { id: toastId });
    }
  };

  return (
    <main className="flex h-screen w-full flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">
          Donation Tracking
        </h2>
        <Link variant={'success'} href={`/donor/donation/${donation_id}/new`}>
          New Tracking
        </Link>
      </div>
      <div className="flex flex-col gap-y-4">
        {tracking &&
          tracking.map((track, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-y-2 rounded-lg border-2 border-white p-2 text-white"
            >
              <p>{track.description}</p>
              <p>{dateFormat(track.createdAt)}</p>
              <div className="flex items-center justify-end gap-2 text-nowrap">
                <Link
                  href={`/donor/donation/${track.donation_id}/${track.id}`}
                  variant={'warning'}
                >
                  Update
                </Link>
                <Button
                  variant={'danger'}
                  onClick={() => {
                    handleDeleteTracking(track.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
