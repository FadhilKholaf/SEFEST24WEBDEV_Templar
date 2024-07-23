'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const menus: { href: string; title: string }[] = [
  { href: '/', title: 'Home' },
  { href: '/recipient', title: 'Dashboard' },
  { href: '/recipient/donation', title: 'Donation List' },
  { href: '/recipient/mydonation', title: 'Donation Manager' },
  { href: '/recipient/chat', title: 'Chat' }
];

export default function Sidebar() {
  return (
    <aside className="fixed grid h-screen w-[300px] grid-cols-1 content-between rounded-r-3xl bg-accent p-4 text-primary">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <Image
            src="/dummy.jpeg"
            alt="Logo"
            width={500}
            height={500}
            className="h-10 w-10 rounded-full"
          />
          <p className="text-2xl font-semibold">Recipient Panel</p>
        </div>
        <div className="h-0.5 w-full bg-primary"></div>
        {menus.map((menu, index) => (
          <Link
            key={index}
            className="relative h-7 text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            href={menu.href}
          >
            {menu.title}
          </Link>
        ))}
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="relative h-7 text-start text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
      >
        Logout
      </button>
    </aside>
  );
}
