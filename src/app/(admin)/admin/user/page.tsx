'use server';

import { findAllUser } from '@/utils/database/user.query';
import Table from './components/Table';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/app/components/global/button';

export default async function Page() {
  const users = await findAllUser();
  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">User</h2>
        <Link href="/admin/user/new" variant={'default'}>
          New User
        </Link>
      </div>
      <Table users={users} />
    </main>
  );
}
