'use client';

import { User } from '@prisma/client';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';
import { deleteUser } from '@/utils/database/user.query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Table({ users }: { users: User[] }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columns: TableColumn<User>[] = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Name',
      selector: (row) => row.name!,
      sortable: true
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center justify-between gap-2 text-nowrap">
          <Link
            href={'/admin/user/' + row.id}
            className="h-fit w-fit rounded-lg bg-blue-500 px-4 py-2 text-[#FFFBF2]"
          >
            Details
          </Link>
          <button
            onClick={() => {
              handleDeleteUser(row.id);
            }}
            className="h-fit w-fit rounded-lg bg-red-500 px-4 py-2 text-[#FFFBF2]"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleDeleteUser = async (id: string) => {
    const toastId = toast.loading('Loading');
    try {
      await deleteUser({ id });
      toast.success('Success deleting user', { id: toastId, duration: 1500 });
      router.refresh();
    } catch (error) {
      toast.error('Error deleting user', { id: toastId });
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading</p>;

  return (
    <div>
      <DataTable columns={columns} data={users} pagination highlightOnHover />
    </div>
  );
}
