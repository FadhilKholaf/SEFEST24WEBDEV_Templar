'use server';

import React from 'react';
import Form from './components/Form';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { findEvent } from '@/utils/database/event.query';

export default async function page({ params }: { params: { id: string } }) {
  if (params.id === 'new') {
    return (
      <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
        <Breadcrumbs />
        <Form />
      </main>
    );
  }

  const event = await findEvent({ id: params.id });

  if (!event) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <h2 className="text-5xl font-bold text-white">User Form</h2>
      <Form event={event} />
    </main>
  );
}
