import Sidebar from '@/app/components/global/Sidebar';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus: {
    href: string;
    title: string;
  }[] = [
    { href: '/', title: 'Home' },
    { href: '/organization', title: 'Dashboard' },
    { href: '/organization/event', title: 'Event' },
    { href: '/organization/volunteer', title: 'Volunteer' }
  ];

  return (
    <>
      <Sidebar menus={menus} />
      {children}
    </>
  );
}
