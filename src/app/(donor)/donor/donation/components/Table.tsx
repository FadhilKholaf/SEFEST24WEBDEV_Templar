'use client';

import { Prisma } from '@prisma/client';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDonation } from '@/utils/database/donation.query';
import { Button, Link } from '@/app/components/global/button';
import { H4, P } from '@/app/components/global/text';

export default function Table({
  donations
}: {
  donations: Prisma.DonationGetPayload<{
    include: {
      donor: true;
      recipient: true;
    };
  }>[];
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleDeleteDonation = async (id: string) => {
    const toastId = toast.loading('Loading');
    try {
      await deleteDonation({ id });
      toast.success('Success deleting donation', {
        id: toastId,
        duration: 1500
      });
      router.refresh();
    } catch (error) {
      toast.error('Error deleting donation', { id: toastId });
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading</p>;

  return (
    <div className="flex flex-col gap-y-4">
      {donations &&
        donations.map((donation, index) => (
          <div
            key={index}
            className="flex w-full justify-between gap-4 rounded-lg border border-white p-2 text-white"
          >
            <div className="flex flex-col gap-y-6">
              <div>
                <P>Nama</P>
                <H4>{donation.name}</H4>
              </div>
              <div>
                <P>Deskripsi</P>
                <H4>{donation.description}</H4>
              </div>
              <div>
                <P>Lokasi Penerimaan</P>
                <H4>{donation.pickup_coordinate}</H4>
              </div>
              <div>
                <P>Penerima</P>
                <H4>
                  {donation.recipient?.name
                    ? donation.recipient?.name
                    : 'Belum ada penerima'}
                </H4>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 text-nowrap">
              <Link variant={'info'} href={'/donor/donation/' + donation.id}>
                Detail
              </Link>
              <Button
                variant={'danger'}
                onClick={() => {
                  handleDeleteDonation(donation.id);
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
