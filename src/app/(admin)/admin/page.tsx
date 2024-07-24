import Breadcrumbs from '@/components/Breadcrumbs';
import { findAllDonation } from '@/utils/database/donation.query';
import { findAllUser } from '@/utils/database/user.query';

export default async function Page() {
  const donations = await findAllDonation();
  const users = await findAllUser();

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-2 text-white">
          <h2 className="text-4xl font-semibold">{users.length}</h2>
          <p className="text-sm">Total Users</p>
        </div>
        <div className="flex w-fit flex-col gap-y-2 rounded-lg bg-secondary p-2 text-white">
          <h2 className="text-4xl font-semibold">{donations.length}</h2>
          <p className="text-sm">Total Donations</p>
        </div>
      </div>
    </main>
  );
}
