'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { formatPrice } from '@/data/products';

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const total = getTotal();
  const count = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* ── Overlay ────────────────────────────────────────── */}
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />

          {/* ── Drawer ─────────────────────────────────────────── */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#12141C] text-white border-l border-white/10 shadow-2xl"
          >
            {/* ── Header ──────────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-2xl tracking-wide text-white">
                  Your Bag
                </h2>
                <span className="text-xs font-mono text-[#ff4d17]">
                  [{count} {count === 1 ? 'ITEM' : 'ITEMS'}]
                </span>
              </div>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="text-white/60 transition-colors hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Body ────────────────────────────────────────── */}
            {items.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <ShoppingBag
                    className="h-8 w-8 text-[#ff4d17]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-center">
                  <p className="font-serif text-xl text-white">
                    Your bag is empty
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    Discover our collection of raga-inspired fragrances.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full border border-white/20 hover:border-[#ff4d17] px-8 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-white transition-all hover:text-[#ff4d17] cursor-pointer"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              <>
                {/* Items list */}
                <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
                  {items.map((item) => (
                    <motion.li
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.25 }}
                      className="py-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-lg text-white leading-snug">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs font-mono text-[#ff4d17]">
                            {item.size}
                          </p>
                          <p className="mt-1.5 text-base font-semibold text-white">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.productId)}
                          className="mt-0.5 text-white/30 transition-colors hover:text-[#ff4d17] cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-1 font-mono">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-colors hover:border-[#ff4d17] hover:text-[#ff4d17] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-colors hover:border-[#ff4d17] hover:text-[#ff4d17] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>

                        {/* Line total */}
                        <span className="ml-auto text-sm font-semibold text-white/90">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* ── Footer ──────────────────────────────────── */}
                <div className="border-t border-white/10 px-6 pb-6 pt-4 bg-[#0E1017]">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                      Subtotal
                    </span>
                    <span className="font-serif text-2xl font-bold text-white">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-white/40 font-mono">
                    Free shipping in India • Includes exclusive raga audio
                  </p>

                  {/* Checkout button */}
                  <button
                    onClick={() =>
                      alert(
                        'Demo checkout: Order received! Payment integration connected.'
                      )
                    }
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#ff4d17] hover:bg-[#e03d07] py-3.5 font-mono text-xs uppercase tracking-[0.2em] font-bold text-white transition-all shadow-[0_0_25px_rgba(255,77,23,0.4)] cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue shopping */}
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs font-mono uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-[#ff4d17] cursor-pointer"
                  >
                    [ Continue Exploring ]
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
