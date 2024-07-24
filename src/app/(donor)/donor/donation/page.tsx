import Breadcrumbs from '@/components/Breadcrumbs';
import { nextGetServerSession } from '@/lib/next-auth';
import { findFilterDonation } from '@/utils/database/donation.query';
import React from 'react';
import Table from './components/Table';
import { Link } from '@/app/components/global/button';

export default async function Page() {
  const session = await nextGetServerSession();

  const donations = await findFilterDonation({ donor_id: session?.user?.id });

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">Donasi</h2>
        <Link variant={'success'} href="/donor/donation/new">
          Donasi Baru
        </Link>
      </div>
      <Table donations={donations} />
    </main>
  );
}
