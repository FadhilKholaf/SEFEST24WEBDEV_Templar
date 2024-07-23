import Breadcrumbs from '@/components/Breadcrumbs';
import { nextGetServerSession } from '@/lib/next-auth';
import { findFilterDonation } from '@/utils/database/donation.query';
import Link from 'next/link';
import React from 'react';
import Table from './components/Table';

export default async function page() {
  const session = await nextGetServerSession();

  const donations = await findFilterDonation({ donor_id: session?.user?.id });

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Donation
        </h2>
        <Link
          href="/donor/donation/new"
          className="w-fit rounded-lg bg-secondary px-8 py-4 text-[#FFFBF2]"
        >
          New Donation
        </Link>
      </div>
      <Table donations={donations} />
    </main>
  );
}
