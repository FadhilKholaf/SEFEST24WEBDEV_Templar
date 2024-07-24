'use server';

import Breadcrumbs from '@/components/Breadcrumbs';
import Table from './components/Table';
import { findAllDonation } from '@/utils/database/donation.query';
import { Link } from '@/app/components/global/button';

export default async function Page() {
  const donations = await findAllDonation();
  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">Donation</h2>
        <Link href="/admin/donation/new" variant={'default'}>
          New Donation
        </Link>
      </div>
      <Table donations={donations} />
    </main>
  );
}
