import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FeedForward',
  description:
    'Memanfaatkan Teknologi Digital untuk Menjembatani Kesenjangan Antara Surplus Pangan dan Kerawanan Pangan'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body className={montserrat.className}>
        <NextAuthProvider>
          <Toaster />
          <NextTopLoader
            color="#475443"
            shadow="0 0 10px #FFFBF2,0 0 5px #FFFBF2"
          />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
