'use client';

import { Prisma } from '@prisma/client';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDonation } from '@/utils/database/donation.query';
import { customStyles } from '@/utils/reactDataTable';
import { Button, Link } from '@/app/components/global/button';

export default function Table({
  donations
}: {
  donations: Prisma.DonationGetPayload<{
    include: { donor: true; recipient: true };
  }>[];
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columns: TableColumn<
    Prisma.DonationGetPayload<{
      include: { donor: true; recipient: true };
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
            variant={'info'}
            href={'/admin/donation/' + row.id}
            className="h-fit w-fit rounded-lg px-4 py-2"
          >
            Details
          </Link>
          <Button
            onClick={() => {
              handleDeleteDonation(row.id);
            }}
            className="h-fit w-fit rounded-lg px-4 py-2"
            variant={'danger'}
          >
            Delete
          </Button>
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
        customStyles={customStyles}
      />
    </div>
  );
}
