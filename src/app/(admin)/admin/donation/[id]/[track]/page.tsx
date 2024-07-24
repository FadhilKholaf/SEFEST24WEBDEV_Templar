'use server';

import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { findTracking } from '@/utils/database/tracking.query';
import Form from './components/Form';

export default async function Page({
  params
}: {
  params: { id: string; track: string };
}) {
  if (params.track === 'new') {
    return (
      <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
        <Breadcrumbs />
        <Form donation_id={params.id} />
      </main>
    );
  }

  const tracking = await findTracking({ id: params.track });

  if (!tracking) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-12 p-4 pl-[316px]">
      <Breadcrumbs />
      <Form donation_id={params.id} tracking={tracking} />
    </main>
  );
}
