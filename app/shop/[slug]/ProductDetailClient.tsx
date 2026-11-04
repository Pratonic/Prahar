'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Check,
  ArrowLeft,
  Volume2,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
} from 'lucide-react';
import { type Product, formatPrice, products } from '@/data/products';
import { getRagaById } from '@/data/ragas';
import { useCartStore } from '@/lib/cart';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const raga = getRagaById(product.ragaId);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: product.size,
        ragaId: product.ragaId,
        category: product.category,
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  // Other related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.ragaId === product.ragaId || p.category === product.category))
    .slice(0, 3);

  const cardGradient = raga
    ? raga.colors.gradient
    : 'from-amber-950/80 via-stone-900/60 to-yellow-900/40';

  return (
    <div className="pt-28 pb-32 bg-[#F5EBDD] min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#24160F]/60 hover:text-[#B96A2D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Collection</span>
          </Link>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Atmospheric Vessel Display */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] rounded-3xl overflow-hidden bg-[#17131D] p-8 border border-[#B38A45]/30 shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-b ${cardGradient} opacity-90`} />

            {/* Glowing background circles */}
            <div className="absolute w-80 h-80 rounded-full border border-white/10 animate-pulse-slow" />
            <div className="absolute w-96 h-96 rounded-full border border-white/5" />

            {/* Vessel Artwork */}
            <div className="relative z-10 flex flex-col items-center">
              {product.category === 'candle' || product.category === 'gift-box' ? (
                // Candle vessel
                <div className="flex flex-col items-center">
                  <div className="w-2 h-4 bg-amber-200 rounded-full blur-[1px] animate-pulse mb-1 shadow-[0_0_12px_#F5DEB3]" />
                  <div className="w-40 sm:w-48 h-48 sm:h-56 rounded-xl bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 shadow-2xl border border-white/50 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B96A2D]">
                      PRAHAR
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#24160F] mt-2">
                      {raga ? raga.name : 'Raga Candle'}
                    </h3>
                    <span className="text-xs text-[#24160F]/60 mt-1">Soy Wax • 200g</span>
                    <span className="text-[10px] font-mono text-[#B38A45] mt-4">
                      Burn Time ~40 Hours
                    </span>
                  </div>
                  <div className="w-48 h-3 rounded-full bg-black/60 blur-md mt-4" />
                </div>
              ) : (
                // Perfume / Attar Bottle
                <div className="flex flex-col items-center">
                  <div className="w-16 h-10 rounded-t-md bg-gradient-to-r from-[#8B6914] via-[#D6B77C] to-[#8B6914] shadow-md border border-white/20" />
                  <div className="w-8 h-3 bg-[#B38A45]" />
                  <div className="relative w-44 sm:w-52 h-64 sm:h-72 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/25 via-white/10 to-black/40 backdrop-blur-md border border-white/30 shadow-2xl flex flex-col justify-between p-6 items-center">
                    <div
                      className="absolute inset-x-2 bottom-2 top-8 rounded-b-2xl opacity-40 blur-xs"
                      style={{ backgroundColor: raga?.colors.primary || '#D6B77C' }}
                    />
                    <div className="relative z-10 w-full py-4 px-3 bg-[#F5EBDD]/90 rounded border border-[#B38A45]/40 text-center shadow">
                      <span className="block text-[10px] tracking-[0.3em] uppercase text-[#B96A2D] font-mono">
                        PRAHAR {raga ? `• ${raga.number}` : ''}
                      </span>
                      <h3 className="font-serif text-2xl text-[#24160F] tracking-wide mt-1">
                        {raga ? raga.name : 'Five Ragās'}
                      </h3>
                      <span className="block text-xs text-[#24160F]/60">
                        {raga ? raga.nameDevanagari : 'Discovery Set'}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 bg-black/50 rounded-full border border-white/20 text-[10px] text-white/90">
                      <Volume2 className="w-3 h-3 text-[#D6B77C]" />
                      <span>Scan for Soundtrack</span>
                    </div>
                  </div>
                  <div className="w-48 h-3 rounded-full bg-black/60 blur-md mt-4" />
                </div>
              )}
            </div>

            {/* Time badge if applicable */}
            {raga && (
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs text-white/90">
                <Clock className="w-3.5 h-3.5 text-[#D6B77C]" />
                <span>{raga.time}</span>
              </div>
            )}
          </div>

          {/* Right Column: Purchasing & Sensory Information */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Category & Stock */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B96A2D] bg-[#EADBC5] px-3 py-1 rounded-full border border-[#B38A45]/20">
                {product.category.toUpperCase()} • {product.size}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                In Stock & Hand-Poured
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl text-[#24160F] tracking-tight mt-1">
              {product.name}
            </h1>

            {raga && (
              <p className="font-serif italic text-2xl text-[#B96A2D] mt-2">
                "{raga.character}"
              </p>
            )}

            {/* Price */}
            <div className="mt-4 pt-4 border-t border-[#24160F]/10 flex items-baseline gap-4">
              <span className="font-serif text-4xl font-semibold text-[#B38A45]">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[#24160F]/60 font-sans">
                Inclusive of all taxes & Pan-India air shipping
              </span>
            </div>

            <p className="mt-6 text-base text-[#24160F]/80 font-sans leading-relaxed">
              {product.longDescription}
            </p>

            {/* Key Features Bullet points */}
            <div className="mt-6 space-y-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-[#24160F]/75 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B38A45] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Fragrance Notes Breakdown if raga is present */}
            {raga && (
              <div className="mt-8 pt-6 border-t border-[#24160F]/15">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#B38A45] mb-3">
                  Olfactory Notes
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-sans">
                  <div className="bg-[#EADBC5]/40 p-2.5 rounded-lg border border-[#B38A45]/20">
                    <span className="font-semibold text-[#B96A2D] block mb-0.5">Top</span>
                    <span className="text-[#24160F]/80">{raga.fragranceNotes.top.join(', ')}</span>
                  </div>
                  <div className="bg-[#EADBC5]/40 p-2.5 rounded-lg border border-[#B38A45]/20">
                    <span className="font-semibold text-[#B96A2D] block mb-0.5">Heart</span>
                    <span className="text-[#24160F]/80">{raga.fragranceNotes.heart.join(', ')}</span>
                  </div>
                  <div className="bg-[#EADBC5]/40 p-2.5 rounded-lg border border-[#B38A45]/20">
                    <span className="font-semibold text-[#B96A2D] block mb-0.5">Base</span>
                    <span className="text-[#24160F]/80">{raga.fragranceNotes.base.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag Controls */}
            <div className="mt-8 pt-6 border-t border-[#24160F]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-[#24160F]/20 rounded-full px-4 py-3 bg-[#EADBC5]/30 sm:w-36">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-[#24160F]/60 hover:text-[#24160F]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-[#24160F]/60 hover:text-[#24160F]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-8 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added {quantity} to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-full border border-[#24160F]/30 hover:border-[#B38A45] hover:text-[#B96A2D] text-xs uppercase tracking-[0.2em] font-semibold text-[#24160F] transition-colors"
              >
                Checkout Now
              </button>
            </div>

            {/* Raga Link if applicable */}
            {raga && (
              <div className="mt-6">
                <Link
                  href={`/experience/${raga.id}`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline"
                >
                  <Volume2 className="w-4 h-4 text-[#B38A45]" />
                  <span>Preview Raga {raga.name} Musical Experience →</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#24160F]/15">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl text-[#24160F]">
                Complete Your Sensory Wardrobe
              </h2>
              <Link
                href="/shop"
                className="text-xs font-mono uppercase tracking-wider text-[#B96A2D] hover:underline"
              >
                View All Creations →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
