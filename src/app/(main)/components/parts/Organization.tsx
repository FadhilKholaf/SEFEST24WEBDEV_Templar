import { cn } from '@/utils/cn';
import Image from 'next/image';

const data: string[] = [
  'this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb',
  'this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb',
  'this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb',
  'this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb this is organization adjbabd aoidbuadw bbaodwudwoba odwabudwb'
];

export default function Organization() {
  const organizations = data.slice(0, 4);

  return (
    <section id="organization" className="min-h-screen w-screen px-20">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-center text-5xl font-bold text-[#475443]">
          Organization
        </h2>
        <p className="text-center text-lg text-[#475443]">
          Join with organization and community around the world
        </p>
      </div>
      <div className="relative h-screen w-full">
        <div className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
          <Image
            src="/assets/globe.png"
            alt="Globe"
            width={5000}
            height={5000}
            quality={100}
            className="w-full object-cover opacity-50"
          />
        </div>
        {organizations.map((organization, index) => (
          <div
            key={index}
            className={cn(
              'absolute z-10 flex w-[500px] flex-col gap-y-2 rounded-lg bg-secondary p-2 text-primary',
              {
                'left-[5%] top-[35%]': index === 0,
                'left-[35%] top-[10%]': index === 1,
                'bottom-[10%] right-[35%]': index === 2,
                'bottom-[35%] right-[5%]': index === 3
              }
            )}
          >
            <h2 className="text-lg font-medium">ORGGGGG</h2>
            <p className="text-justify">{organization}</p>
            <div className="flex justify-between text-sm">
              <p>48 Members {index}</p>
              <p className="font-medium text-accent">Contribute {'>'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
