'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface Menu {
  title: string;
  href: string;
  auth?: boolean;
}

const menus: Menu[] = [
  { title: 'Home', href: 'home' },
  { title: 'Our Service', href: 'service' },
  { title: 'Organization', href: 'organization' },
  { title: 'Event', href: 'event' }
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed z-50 flex h-20 w-screen items-center justify-between bg-[#EA9715] px-20 text-[#FFFBF2]">
      <div className="flex items-center gap-x-2">
        <Image
          src="/dummy.jpeg"
          alt="Logo"
          width={500}
          height={500}
          className="h-10 w-10 rounded-full"
        />
        <p className="text-2xl font-semibold">FeedForward</p>
      </div>
      <div className="flex justify-between gap-x-10">
        {menus.map((menu, index) => (
          <Link
            href={`/#${menu.href}`}
            key={index}
            className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
          >
            {menu.title}
          </Link>
        ))}
      </div>
      <div className="flex justify-between gap-x-8">
        {!!session ? (
          <>
            {session.user?.role !== 'GUEST' && (
              <Link
                href={`/${session.user?.role.toLowerCase()}`}
                className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/user"
              className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn(undefined, { callbackUrl: '/' })}
              className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            >
              Login
            </button>
            <button
              onClick={() => signIn(undefined, { callbackUrl: '/' })}
              className="relative h-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 after:ease-in-out hover:after:origin-left hover:after:scale-x-100"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
