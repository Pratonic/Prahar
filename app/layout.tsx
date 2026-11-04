import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PRAHAR (प्रहर) — The Fragrance You Can Hear',
  description:
    'Indian luxury fragrance brand inspired by Indian classical ragas, time of day, culture and music. Five ragas. Five hours. Five scents you can hear.',
  keywords: [
    'PRAHAR',
    'luxury perfume India',
    'classical raga fragrance',
    'attar',
    'Bhairav',
    'Sarang',
    'Yaman',
    'Darbari',
    'Malhar',
    'niche perfume',
    'Kannauj',
  ],
  authors: [{ name: 'PRAHAR Luxury Parfums' }],
  openGraph: {
    title: 'PRAHAR (प्रहर) — The Fragrance You Can Hear',
    description:
      'Where ancient Indian classical music meets haute perfumery. Five ragas. Five hours. Five scents you can hear.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5EBDD] text-[#24160F] antialiased selection:bg-[#B38A45]/30 selection:text-[#24160F] flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
