import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';

export default function page() {
  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 px-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Messager
        </h2>
      </div>
    </main>
  );
}
