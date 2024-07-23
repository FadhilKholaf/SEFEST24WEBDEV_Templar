'use server';

import { nextGetServerSession } from '@/lib/next-auth';
import { sendMessage } from '@/utils/actions/message';
import { cn } from '@/utils/cn';
import { findAllMessage } from '@/utils/database/message.query';
import Form from './components/Form';

export default async function page({ params }: { params: { id: string } }) {
  const session = await nextGetServerSession();
  const messages = await findAllMessage({ room_id: params.id });
  return (
    <main className="flex min-h-screen w-screen flex-col p-4 px-[316px]">
      <div className="flex h-full flex-col gap-y-4 pb-14 pr-3">
        {messages.map((message, index) => (
          <div
            className={cn('flex w-full', {
              'justify-end': message.sender_id === session?.user?.id
            })}
            key={index}
          >
            <div className="w-fit rounded-lg bg-secondary p-2 text-primary">
              <p className="text-lg">{message.content}</p>
              <div className="flex justify-between gap-4 text-xs">
                <p className="">{message.createdAt.toLocaleTimeString()}</p>
                <p>{message.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Form room_id={params.id} sender_id={session?.user?.id!} />
    </main>
  );
}
