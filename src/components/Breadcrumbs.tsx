'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const dashboard: string[] = ['donor', 'recipient', 'volunteer'];

export default function Breadcrumbs() {
  const pathname = usePathname();

  const path = pathname.split('/').slice(1);

  return (
    <div className="flex gap-2 text-lg text-secondary">
      <Link href="/" className="font-medium">
        Home
      </Link>
      {path &&
        path.map((item, index) => (
          <Fragment key={index}>
            <p>/</p>
            <Link
              href={'/' + path.slice(0, index + 1).join('/')}
              className="font-medium"
            >
              {dashboard.includes(item)
                ? 'Dashboard'
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </Fragment>
        ))}
    </div>
  );
}
