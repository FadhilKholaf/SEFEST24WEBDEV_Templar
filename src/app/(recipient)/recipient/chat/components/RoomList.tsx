import { Prisma, Room } from '@prisma/client';
import { Session } from 'next-auth';
import Link from 'next/link';

export default async function RoomList({
  rooms,
  session
}: {
  rooms: Prisma.RoomGetPayload<{
    include: { user: true; message: { include: { sender: true } } };
  }>[];
  session: Session | null;
}) {
  return (
    <aside className="fixed right-0 flex h-screen w-[300px] flex-col gap-y-4 rounded-l-3xl bg-accent p-4 text-primary">
      <p className="text-2xl font-semibold">Chat List</p>
      {rooms.map((room, index) => (
        <Link
          key={index}
          href={`/recipient/chat/${room.id}`}
          className="flex flex-col gap-y-2 rounded-2xl border-2 border-primary p-2"
        >
          <h2>
            {
              room.user.find((user) => {
                return user.id !== session?.user?.id;
              })?.name
            }
          </h2>
          <p>{room.message[0].content}</p>
        </Link>
      ))}
    </aside>
  );
}
