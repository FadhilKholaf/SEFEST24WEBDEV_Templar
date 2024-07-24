import { Link } from '@/app/components/global/button';
import { H2, H3, P } from '@/app/components/global/text';
import { findAllEvent } from '@/utils/database/event.query';
import { FaArrowRight } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';

export default async function Events() {
  const events = (await findAllEvent()).slice(0, 3);

  return (
    <section
      id="events"
      className="flex w-screen flex-col justify-center gap-y-8 p-4 sm:p-20"
    >
      <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <H2 className="mb-4 w-full sm:mb-0 sm:w-1/3">Event untuk Relawan</H2>
        <div className="flex w-full flex-col items-start gap-2 sm:w-1/2 sm:items-end">
          <P className="mb-2 text-left sm:text-right">
            Event-event yang sedang berlangsung pada FeedForward, anda dapat
            berkontribusi dengan menjadi relawan
          </P>
          <Link href={'/events'} variant={'default'}>
            Lihat semua{' '}
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {events ? (
          events.map((event) => (
            <div
              key={event.id}
              className="flex h-[320px] w-full flex-col justify-between rounded-lg border border-gray-400 bg-primary p-5 md:w-[32%]"
            >
              <div>
                <FaNoteSticky className="mb-4 text-3xl text-white" />
                <H3 className="mb-4 truncate">{event.name}</H3>
                <P className="line-clamp-4">{event.description}</P>
              </div>
              <Link href={`/events/${event.slug}`} variant={'default'}>
                Lebih detail
              </Link>
            </div>
          ))
        ) : (
          <P>Belum ada event apa-apa nih...</P>
        )}
      </div>
    </section>
  );
}
