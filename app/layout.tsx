import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import GlobalAudioBar from '@/components/GlobalAudioBar';
import SmoothScroll from '@/components/SmoothScroll';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

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
    'A.R. Rahman',
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
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[#0B0C10] text-white antialiased selection:bg-[#ff4d17]/40 selection:text-white flex flex-col min-h-screen font-sans pb-16">
        <SmoothScroll>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow">{children}</main>
          <Footer />
          <GlobalAudioBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
