'use server';

import { nextGetServerSession } from '@/lib/next-auth';
import { findUser } from '@/utils/database/user.query';
import React from 'react';
import Form from './components/Form';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

export default async function page() {
  const session = await nextGetServerSession();

  const user = await findUser({ id: session?.user?.id });

  if (!user) return notFound();

  return (
    <main className="flex h-screen w-screen flex-col gap-y-4 bg-primary px-20 pt-24">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Profile
        </h2>
        <p className="text-center font-bold text-[#475443]">
          {user.role === 'GUEST'
            ? 'Complete your profile before using our service!'
            : `Your profile is complete, all feature for ${session?.user?.role.toLowerCase()} unlocked!`}
        </p>
      </div>
      <Form user={user} />
    </main>
  );
}
