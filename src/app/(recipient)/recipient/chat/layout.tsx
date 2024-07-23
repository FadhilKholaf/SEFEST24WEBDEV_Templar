import { findAllRoom } from '@/utils/database/room.query';
import RoomList from './components/RoomList';
import { nextGetServerSession } from '@/lib/next-auth';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await nextGetServerSession();

  const rooms = await findAllRoom({
    user: { some: { id: session?.user?.id } }
  });

  return (
    <>
      <RoomList rooms={rooms} session={session} />
      {children}
    </>
  );
}
