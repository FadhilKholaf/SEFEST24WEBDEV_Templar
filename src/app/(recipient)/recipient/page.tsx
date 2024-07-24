import Breadcrumbs from '@/components/Breadcrumbs';
import { nextGetServerSession } from '@/lib/next-auth';
import { findFilterDonation } from '@/utils/database/donation.query';
import React from 'react';

export default async function Page() {
  const session = await nextGetServerSession();

  const availableDonation = await findFilterDonation({
    recipient_id: { equals: null }
  });
  const myDonation = await findFilterDonation({
    recipient_id: session?.user?.id!
  });

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">
          Recipient Dashboard
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-2 text-white">
          <h2 className="text-4xl font-semibold">{availableDonation.length}</h2>
          <p className="text-sm">Available Donations</p>
        </div>
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-2 text-white">
          <h2 className="text-4xl font-semibold">{myDonation.length}</h2>
          <p className="text-sm">My Donations</p>
        </div>
      </div>
    </main>
  );
}
