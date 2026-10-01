'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { Product } from '@/types';
import { formatINR, generateWhatsAppUrl } from '@/lib/utils';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items: wishlistIds, removeItem, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToBag = (product: Product) => {
    addItem(product, 1, product.sizes ? product.sizes[0] : undefined, product.material);
    removeItem(product.id);
    toast.success(`Moved ${product.name} to shopping bag`);
    openCart();
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-theme pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-brand-gold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">Your Wishlist Vault</h1>
          </div>
          <p className="text-sm text-theme-muted tracking-wide">
            {wishlistProducts.length === 0 ? 'No creations saved' : `${wishlistProducts.length} ${wishlistProducts.length === 1 ? 'Creation' : 'Creations'} Saved`}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-theme flex items-center justify-center text-theme-muted bg-theme-secondary/30">
              <Heart className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Your Vault is Empty</h2>
            <p className="text-theme-muted text-sm leading-relaxed mb-8">
              Explore our master jewelers&apos; latest creations and save your favored diamond solitaires, necklaces, and bespoke pieces for future acquisition.
            </p>
            <Link href="/shop" className="btn-gold px-8 py-3.5 text-xs tracking-[0.2em] uppercase inline-block">
              Discover High Jewelry
            </Link>
          </div>
        ) : (
          /* Grid of Saved Pieces */
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-theme-muted tracking-wider uppercase">Saved Items</span>
              <button
                onClick={() => {
                  clearWishlist();
                  toast('Wishlist cleared');
                }}
                className="text-xs text-theme-muted hover:text-red-500 tracking-wider transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-theme border border-theme hover:border-brand-gold/40 transition-colors duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-theme-secondary/20">
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => {
                        removeItem(product.id);
                        toast.success('Removed from wishlist');
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-theme/80 backdrop-blur-sm text-theme-muted hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] text-brand-gold uppercase block mb-1">
                        {product.category}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="font-serif text-base hover:text-brand-gold transition-colors block mb-2"
                      >
                        {product.name}
                      </Link>
                      <p className="font-serif text-lg font-medium text-theme">
                        {formatINR(product.price)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 space-y-2 pt-4 border-t border-theme">
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="w-full btn-gold py-2.5 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                      </button>

                      <a
                        href={generateWhatsAppUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-whatsapp py-2 text-xs tracking-[0.1em] uppercase flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-theme flex justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-brand-gold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Continue Exploring Creations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
