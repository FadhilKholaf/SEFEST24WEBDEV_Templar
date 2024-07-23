'use client';

import { useRef } from 'react';
import { sendMessage } from '@/utils/actions/message';

export default function Form({
  room_id,
  sender_id
}: {
  room_id: string;
  sender_id: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (FormData) => {
        await sendMessage(FormData, room_id, sender_id);
        formRef.current?.reset();
      }}
      className="fixed bottom-0 left-0 mb-4 flex w-full gap-2 px-[316px]"
    >
      <input
        type="text"
        name="content"
        id="content"
        className="w-full rounded-lg border-2 border-secondary p-2 focus:border-dark focus:outline-none"
      />
      <button
        type="submit"
        className="w-fit rounded-full border-2 border-secondary bg-primary p-2 text-secondary focus:border-dark focus:outline-none"
      >
        Send
      </button>
    </form>
  );
}
