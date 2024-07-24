'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { Button } from '@/app/components/global/button';

export default function Sidebar({
  menus
}: {
  menus: { href: string; title: string }[];
}) {
  return (
    <aside className="fixed grid h-screen w-[300px] grid-cols-1 content-between rounded-r-3xl border-r border-white p-4">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2">
          <Image
            src="/assets/icon.svg"
            alt="Logo"
            width={500}
            height={500}
            className="h-12 w-12 rounded-full"
          />
          <p className="text-2xl font-semibold text-white">Recipient Panel</p>
        </div>
        {menus.map((menu, index) => (
          <Link
            key={index}
            className="relative h-8 text-xl text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-tertiary after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            href={menu.href}
          >
            {menu.title}
          </Link>
        ))}
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex w-full justify-center xl:mt-[20px] xl:inline-flex"
        variant={'inverse'}
      >
        Logout
      </Button>
    </aside>
  );
}
