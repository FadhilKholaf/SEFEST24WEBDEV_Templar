import Image from 'next/image';

export default function Home() {
  return (
    <section
      id="home"
      className="flex h-screen w-screen items-center justify-between px-20 pt-20"
    >
      <div className="flex w-1/2 flex-col gap-y-8">
        <h1 className="text-justify text-6xl font-bold text-[#475443]">
          Donate Your Food To Save The World! Please!
        </h1>
        <p className="text-justify text-lg text-[#475443]">
          Memanfaatkan Teknologi Digital untuk Menjembatani Kesenjangan Antara
          Surplus Pangan dan Kerawanan Pangan Memanfaatkan Teknologi Digital
          untuk Menjembatani Kesenjangan Antara Surplus Pangan dan Kerawanan
          Pangan
        </p>
        <p className="w-fit rounded-lg bg-[#475443] px-8 py-4 text-[#FFFBF2]">
          Donate Now
        </p>
      </div>
      <div className="flex h-full w-1/2 items-center justify-end">
        <Image
          src="/assets/charity.svg"
          alt="Charity"
          width={500}
          height={500}
          className="h-auto w-3/4 object-cover"
        />
      </div>
    </section>
  );
}
