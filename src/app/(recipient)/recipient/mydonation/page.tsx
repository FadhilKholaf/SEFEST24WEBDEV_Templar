'use server';

import Breadcrumbs from '@/components/Breadcrumbs';
import { nextGetServerSession } from '@/lib/next-auth';
import Donation from './components/Donation';

export default async function page() {
  const session = await nextGetServerSession();

  if (!session) {
    return (
      <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
        <Breadcrumbs />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <Donation recipient_id={session?.user?.id!} />
    </main>
  );
}
