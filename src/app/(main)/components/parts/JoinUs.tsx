import { Link } from '@/app/components/global/button';
import { H2, H3, P } from '@/app/components/global/text';
import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
  href: string;
  description: string;
}

const cardProps: CardProps[] = [
  {
    image:
      'https://plus.unsplash.com/premium_photo-1661775322183-bf9d38cff431?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Menjadi Donatur',
    description:
      'Sebagai donatur, Anda memiliki kesempatan untuk membuat perubahan nyata dalam kehidupan banyak orang. Donasi Anda, akan membantu kami untuk memberikan dukungan yang dibutuhkan oleh mereka yang kurang beruntung.',
    href: ''
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1683134059041-3604e05950e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Menjadi Penerima',
    description:
      'Kami memahami bahwa setiap orang memiliki kebutuhan yang berbeda dan kami hadir untuk membantu memenuhi kebutuhan tersebut. Sebagai penerima sumbangan, Anda akan mendapatkan bantuan yang sesuai dengan kebutuhan Anda.',
    href: ''
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1683121334505-907a00cf904c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Menjadi Relawan',
    description:
      'Bergabunglah dengan kami sebagai relawan dan jadilah bagian dari tim yang berdedikasi untuk membuat perbedaan. Sebagai relawan, Anda akan terlibat langsung dalam berbagai kegiatan dan program kami.',
    href: ''
  }
];

export default function JoinUs() {
  return (
    <section
      id="join-us"
      className="flex w-screen flex-col items-center justify-center gap-y-8 p-20"
    >
      <H2>
        Mari <span className="text-highlight">Atasi Kelaparan</span> Bersama
        Kami!
      </H2>
      <P>
        Bergabung bersama kami untuk mewujudkan Indonesia yang bebas kelaparan
      </P>
      <div className="flex justify-between gap-x-4">
        {cardProps.map((props, index) => (
          <div key={index} className="relative flex w-2/6 flex-col gap-y-4">
            <div className="group h-[250px] w-full overflow-hidden rounded-lg">
              <Image
                src={props.image}
                alt="Events"
                width={500}
                height={500}
                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
              />
            </div>
            <H3>{props.title}</H3>
            <P className="mb-3">{props.description}</P>
            <Link href={props.href} variant={'default'}>
              Gabung
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
