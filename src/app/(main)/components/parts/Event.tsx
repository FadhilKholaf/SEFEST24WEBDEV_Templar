import Image from 'next/image';

const events: string[] = [
  'Connect food donors (restaurants, grocery stores, etc) with foodbanks and shelters.Connect food donors (restaurants, grocery stores,etc) with food banks and shelters.',
  'Connect food donors (restaurants, grocery stores, etc) with foodbanks and shelters.',
  'Connect food donors (restaurants, grocery stores, etc) with foodbanks and shelters.'
];

export default function Event() {
  return (
    <section id='event' className="flex h-screen w-screen flex-col justify-center gap-y-8 px-20">
      <div className="flex justify-between">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Events
        </h2>
        <p className="w-fit rounded-lg bg-secondary px-8 py-4 text-[#FFFBF2]">
          See all events
        </p>
      </div>
      <div className="flex justify-between gap-x-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative flex h-[60vh] w-2/6 flex-col gap-y-4"
          >
            <Image
              src="/dummy.jpeg"
              alt="Events"
              width={500}
              height={500}
              className="h-[200px] w-full rounded-lg object-cover"
            />
            <p className="text-secondary">12 january 2024</p>
            <h2 className="text-2xl font-medium text-dark">
              Indonesia Zero Hunger
            </h2>
            <p className="text-justify text-lg text-secondary">
              {event.length >= 125 ? event.slice(0, 125) + '...' : event}
            </p>
            <div className="absolute bottom-0 right-0 flex justify-end">
              <p className="w-fit rounded-lg bg-accent px-8 py-4 text-[#FFFBF2]">
                Contribute
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
