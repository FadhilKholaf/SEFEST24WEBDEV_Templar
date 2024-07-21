'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { Prisma, User } from '@prisma/client';
import { toast } from 'sonner';

import {
  findAllDonor,
  findAllRecipient,
  findDonor,
  findRecipient
} from '@/utils/database/user.query';
import {
  handleCreateDonation,
  handleUpdateDonation
} from '@/utils/actions/donation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AsyncSelect = dynamic(() => import('react-select/async'), { ssr: false });

export default function Form({
  donation
}: {
  donation?: Prisma.DonationGetPayload<{
    include: { donor: true; recipient: true };
  }>;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const donorPromiseOptions = (inputValue: string) =>
    new Promise<Array<{ label: string; value: string }>>(async (resolve) => {
      if (!inputValue) {
        await findAllDonor().then((response) => {
          let data = response.map((item: User) => {
            return {
              label: item.email,
              value: item.id
            };
          });
          resolve(data);
        });
      } else {
        await findDonor(inputValue).then((response) => {
          let data = response.map((item: User) => {
            return {
              label: item.email,
              value: item.id
            };
          });
          resolve(data);
        });
      }
    });

  const recipientPromiseOptions = (inputValue: string) =>
    new Promise<Array<{ label: string; value: string }>>(async (resolve) => {
      if (!inputValue) {
        await findAllRecipient().then((response) => {
          let data = response.map((item: User) => {
            return {
              label: item.email,
              value: item.id
            };
          });
          resolve(data);
        });
      } else {
        await findRecipient(inputValue).then((response) => {
          let data = response.map((item: User) => {
            return {
              label: item.email,
              value: item.id
            };
          });
          resolve(data);
        });
      }
    });

  function debounce(fn: any, delay = 250) {
    let timeout: any;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const donorLoadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      donorPromiseOptions(inputValue).then((options: any) => callback(options));
    }, 500),
    []
  );

  const recipientLoadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      recipientPromiseOptions(inputValue).then((options: any) =>
        callback(options)
      );
    }, 500),
    []
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Donation Form
        </h2>
      </div>
      <form
        action={async (formData) => {
          const toastId = toast.loading('Loading');
          formData.append('donor_id', session?.user?.id!);
          if (donation) {
            try {
              await handleUpdateDonation(donation.id, formData);
              toast.success('Success updating donation', {
                id: toastId,
                duration: 1500
              });
              router.push('/donor/donation');
            } catch (error) {
              toast.error('Error updating donation', { id: toastId });
            }
          } else {
            try {
              await handleCreateDonation(formData);
              toast.success('Success creating donation', {
                id: toastId,
                duration: 1500
              });
              router.push('/donor/donation');
            } catch (error) {
              toast.error('Error creating donation', { id: toastId });
            }
          }
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="rounded-lg border-2 border-secondary p-2 focus:border-dark focus:outline-none"
            defaultValue={donation && donation.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="recipient_id">Recipient Id</label>
          <AsyncSelect
            defaultValue={
              donation && {
                label: donation?.recipient?.email,
                value: donation?.recipient_id
              }
            }
            cacheOptions
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: 8,
                border: '2px solid #475443',
                padding: 4,
                borderColor: state.isFocused ? '#001E16' : '#475443'
              })
            }}
            placeholder="Select donator"
            id="recipient_id"
            name="recipient_id"
            defaultOptions
            loadOptions={recipientLoadOptionsDebounced}
            noOptionsMessage={() => 'Donators not found'}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pickup_coordinate">Pickup Coordinate Id</label>
          <input
            type="text"
            name="pickup_coordinate"
            id="pickup_coordinate"
            className="rounded-lg border-2 border-secondary p-2 focus:border-dark focus:outline-none"
            defaultValue={donation && donation.pickup_coordinate!}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pickup_status">Pickup Status</label>
          <select
            name="pickup_status"
            id="pickup_status"
            className="rounded-lg border-2 border-secondary p-3 focus:border-dark focus:outline-none"
            aria-placeholder="Select status"
            defaultValue={donation && donation.pickup_status!}
          >
            <option value="REJECTED">Rejected</option>
            <option value="CONFIRMED">Confirmed</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-fit rounded-lg bg-secondary px-8 py-4 text-[#FFFBF2]"
        >
          {donation ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
