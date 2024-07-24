'use client';

import { Link } from '@/app/components/global/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import { findEventVolunteer } from '@/utils/database/event.query';
import { useEffect, useState } from 'react';

export default function page() {
  const [volunteers, setVolunteers] = useState<any>([]);

  const handleFindAllEvents = async () => {
    setVolunteers(
      await findEventVolunteer('f7d5073d-bcec-4ec4-9d01-f4428fd3aaf3')
    );
  };

  useEffect(() => {
    handleFindAllEvents();
  }, []);

  useEffect(() => {
    console.log(volunteers);
  }, [volunteers]);

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-white">Event</h2>
      </div>
      <div className="flex flex-col gap-y-4">
        {volunteers.events &&
          volunteers.events.map(
            (volunteer: any, index: number) => {
              volunteer.volunteers.map((item: any, index: number) => {
                console.log(item.name);
              });
            }
            //   (
            //   <div
            //     className="flex w-full gap-x-2 rounded-lg border-2 border-white p-2"
            //     key={index}
            //   >
            //     <div className="grid w-full grid-cols-1 content-between gap-y-4 text-white">
            //       <div className="flex flex-col">
            //         <h2 className="text-3xl font-semibold">{volunteer.name}</h2>
            //         <p className="text-lg">{volunteer.description}</p>
            //       </div>
            //     </div>
            //   </div>
            // )
          )}
      </div>
    </main>
  );
}
