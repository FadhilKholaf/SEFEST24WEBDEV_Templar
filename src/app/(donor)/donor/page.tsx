import Breadcrumbs from '@/components/Breadcrumbs';
import { nextGetServerSession } from '@/lib/next-auth';
import { findFilterDonation } from '@/utils/database/donation.query';
import React from 'react';

export default async function page() {
  const session = await nextGetServerSession();

  const donations = await findFilterDonation({ donor_id: session?.user?.id });

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Donator Dashboard
        </h2>
      </div>
      <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-2 text-primary">
        <h2 className="text-4xl font-semibold">{donations.length}</h2>
        <p className="text-sm">Total Donation</p>
      </div>
    </main>
  );
}
