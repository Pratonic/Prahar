import ProductGrid from '@/components/ProductGrid';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Shop The Collection — PRAHAR Luxury Parfums',
  description:
    'Explore the complete PRAHAR collection: 50ml Eau de Parfums, pure Attar roll-ons, Five Ragās Discovery Sets, and artisanal Soy Wax Candles.',
};

export default function ShopPage() {
  return (
    <div className="pt-28 pb-32 bg-[#F5EBDD] min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/30 bg-[#EADBC5]/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B38A45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96A2D] font-mono font-medium">
              Direct-to-Consumer Storefront
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#24160F] tracking-tight leading-[1.1]">
            The Complete{' '}
            <span className="italic font-normal text-[#B96A2D]">Collection.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#24160F]/70 font-sans leading-relaxed">
            Every bottle is hand-poured in small batches, infused with pure natural extracts, 
            and accompanied by a lifetime digital music gateway.
          </p>
        </div>

        {/* Brand Promises Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 p-4 sm:p-6 rounded-2xl bg-[#EADBC5]/50 border border-[#B38A45]/20 text-xs text-[#24160F]/80 font-sans">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#B38A45] shrink-0" />
            <div>
              <span className="font-semibold block text-[#24160F]">Complimentary Express Delivery</span>
              <span className="text-[11px] text-[#24160F]/60">Pan-India air shipping on all orders</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B38A45] shrink-0" />
            <div>
              <span className="font-semibold block text-[#24160F]">Authenticated NFC / QR Emblem</span>
              <span className="text-[11px] text-[#24160F]/60">Unlocks raga soundtrack on every bottle</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#B38A45] shrink-0" />
            <div>
              <span className="font-semibold block text-[#24160F]">Discovery Sample Guarantee</span>
              <span className="text-[11px] text-[#24160F]/60">2ml tester included with full bottles</span>
            </div>
          </div>
        </div>

        {/* Product Grid Showcase */}
        <ProductGrid showTitle={false} />
      </div>
    </div>
  );
}
