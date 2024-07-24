import { Link } from '@/app/components/global/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import { findAllEvent } from '@/utils/database/event.query';
import { useEffect } from 'react';

export default async function Page() {
  const events = await findAllEvent(
    {
      organizer_id: 'f7d5073d-bcec-4ec4-9d01-f4428fd3aaf3'
    },
    { organizer: true, volunteers: true }
  );

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">Event</h2>
        <Link href="/organization/event/new" variant={'default'}>
          Event Baru
        </Link>
      </div>
      <div className="flex flex-col gap-y-4">
        {events &&
          events.map((event: any, index: number) => (
            <div
              className="flex w-full gap-x-2 rounded-lg border-2 border-white p-2"
              key={index}
            >
              <div className="grid w-full grid-cols-1 content-between gap-y-4 text-white">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-semibold">{event.name}</h2>
                  <p className="text-lg">{event.description}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-medium">
                      By {event.organizer.name}
                    </p>
                    <p className="text-sm">{event.organizer.description}</p>
                    <p className="text-sm">{event.volunteers.length} relawan</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
