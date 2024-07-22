'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { findFilterDonation } from '@/utils/database/donation.query';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

function debounce(fn: any, delay: number) {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function Page() {
  const [donationsData, setDonationsData] = useState<
    Prisma.DonationGetPayload<{
      include: {
        donor: true;
        recipient: true;
      };
    }>[]
  >([]);
  const [filter, setFilter] = useState<string>('');

  const handleFindAllDonations = async (where: string) => {
    const donations = await findFilterDonation({
      //   recipient_id: { equals: null },
      OR: [{ name: { contains: where } }]
    });
    setDonationsData(donations);
  };

  const debouncedHandleFindAllDonations = useCallback(
    debounce(handleFindAllDonations, 500),
    []
  );

  useEffect(() => {
    debouncedHandleFindAllDonations(filter);
  }, [filter, debouncedHandleFindAllDonations]);

  return (
    <main className="flex min-h-screen w-screen flex-col gap-y-8 p-4 pl-[316px]">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Available Donations
        </h2>
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className="rounded-lg border-2 border-secondary p-2 text-secondary focus:border-dark focus:outline-none"
          placeholder="Search Donation"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        {donationsData &&
          donationsData.map((donation, index) => (
            <div
              className="text-secondar flex w-full gap-x-2 rounded-lg border-2 border-secondary p-2"
              key={index}
            >
              <Image
                src="/dummy.jpeg"
                alt="donation"
                width={500}
                height={500}
                className="w-1/4 rounded-lg object-cover"
              />
              <div className="grid w-full grid-cols-1 content-between gap-y-4 text-secondary">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-semibold">{donation.name}</h2>
                  <p className="text-lg">{donation.description}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-medium">
                      By {donation.donor.name}
                    </p>
                    <p className="text-sm">{donation.donor.description}</p>
                  </div>
                  <div>
                    <p className="h-fit w-fit rounded-lg bg-blue-500 px-4 py-2 text-[#FFFBF2]">
                      Request Donation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
