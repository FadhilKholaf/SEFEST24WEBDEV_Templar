'use client';

import { Prisma } from '@prisma/client';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteDonation } from '@/utils/database/donation.query';

export default function Table({
  donations
}: {
  donations: Prisma.DonationGetPayload<{
    include: {
      donor: { select: { email: true } };
      recipient: { select: { email: true } };
    };
  }>[];
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columns: TableColumn<
    Prisma.DonationGetPayload<{
      include: {
        donor: { select: { email: true } };
        recipient: { select: { email: true } };
      };
    }>
  >[] = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'Donator',
      selector: (row) => row.donor.email,
      sortable: true
    },
    {
      name: 'Recipient',
      selector: (row) => row.recipient?.email!,
      sortable: true
    },
    {
      name: 'Pickup Coordinate',
      selector: (row) => row.pickup_coordinate!,
      sortable: true
    },
    {
      name: 'Pickup Status',
      selector: (row) => row.pickup_status!,
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center justify-between gap-2 text-nowrap">
          <Link
            href={'/donor/donation/' + row.id}
            className="h-fit w-fit rounded-lg bg-blue-500 px-4 py-2 text-[#FFFBF2]"
          >
            Details
          </Link>
          <button
            onClick={() => {
              handleDeleteDonation(row.id);
            }}
            className="h-fit w-fit rounded-lg bg-red-500 px-4 py-2 text-[#FFFBF2]"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

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
    <div>
      <DataTable
        columns={columns}
        data={donations}
        pagination
        highlightOnHover
      />
    </div>
  );
}
