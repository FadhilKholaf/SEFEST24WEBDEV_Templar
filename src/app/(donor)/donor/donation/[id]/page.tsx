'use server';

import React from 'react';
import Form from './components/Form';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { findDonation } from '@/utils/database/donation.query';
import TrackingData from './components/parts/Tracking';

export default async function Page({ params }: { params: { id: string } }) {
  if (params.id === 'new') {
    return (
      <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
        <Breadcrumbs />
        <Form />
      </main>
    );
  }

  const donation = await findDonation({ id: params.id });

  if (!donation) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <Form donation={donation} />
      <TrackingData donation_id={params.id} />
    </main>
  );
}
