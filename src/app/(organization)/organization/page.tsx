import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';

export default function Page() {
  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">
          Dashboard Organisasi
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-4 text-white">
          <h2 className="text-4xl font-semibold">{10}</h2>
          <p className="text-sm">Total Event</p>
        </div>
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-4 text-white">
          <h2 className="text-4xl font-semibold">{10}</h2>
          <p className="text-sm">Total Volunteer</p>
        </div>
      </div>
    </main>
  );
}
