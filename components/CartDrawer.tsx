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
            className="absolute inset-0 bg-black/50"
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
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F5EBDD] shadow-2xl"
          >
            {/* ── Header ──────────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-[#24160F]/10 px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-2xl tracking-wide text-[#24160F]">
                  Your Bag
                </h2>
                <span className="text-sm text-[#24160F]/50">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="text-[#24160F]/60 transition-colors hover:text-[#24160F]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Body ────────────────────────────────────────── */}
            {items.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EADBC5]">
                  <ShoppingBag
                    className="h-8 w-8 text-[#B38A45]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-center">
                  <p className="font-serif text-lg text-[#24160F]">
                    Your bag is empty
                  </p>
                  <p className="mt-1 text-sm text-[#24160F]/50">
                    Discover our collection of raga-inspired fragrances.
                  </p>
                </div>
                <Link
                  href="/fragrances"
                  onClick={closeCart}
                  className="mt-2 inline-block border border-[#B38A45] px-8 py-3 text-center font-sans text-xs uppercase tracking-[0.2em] text-[#B38A45] transition-all duration-300 hover:bg-[#B38A45] hover:text-white"
                >
                  Explore Fragrances
                </Link>
              </div>
            ) : (
              <>
                {/* Items list */}
                <ul className="flex-1 divide-y divide-[#24160F]/5 overflow-y-auto px-6">
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
                          <p className="font-serif text-base text-[#24160F] leading-snug">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-[#24160F]/50">
                            {item.size}
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-[#24160F]">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.productId)}
                          className="mt-0.5 text-[#24160F]/30 transition-colors hover:text-[#B96A2D]"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center border border-[#24160F]/15 text-[#24160F]/60 transition-colors hover:border-[#B38A45] hover:text-[#B38A45]"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm text-[#24160F]">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center border border-[#24160F]/15 text-[#24160F]/60 transition-colors hover:border-[#B38A45] hover:text-[#B38A45]"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>

                        {/* Line total */}
                        <span className="ml-auto text-sm font-medium text-[#24160F]/70">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* ── Footer ──────────────────────────────────── */}
                <div className="border-t border-[#24160F]/10 px-6 pb-6 pt-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm uppercase tracking-widest text-[#24160F]/60">
                      Subtotal
                    </span>
                    <span className="font-serif text-lg text-[#24160F]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#24160F]/40">
                    Shipping &amp; taxes calculated at checkout
                  </p>

                  {/* Checkout button */}
                  <button
                    onClick={() =>
                      alert(
                        'Demo checkout — payment integration coming soon.'
                      )
                    }
                    className="mt-5 flex w-full items-center justify-center bg-[#24160F] py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-[#F5EBDD] transition-all duration-300 hover:bg-[#B38A45]"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue shopping */}
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs uppercase tracking-[0.15em] text-[#B38A45] transition-colors hover:text-[#24160F]"
                  >
                    Continue Shopping
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
