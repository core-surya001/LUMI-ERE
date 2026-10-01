'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggle, has } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const [hovered, setHovered] = useState(false);

  const isWishlisted = has(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(product.id);
    if (added) {
      toast.success(`${product.name} saved to vault`);
    } else {
      toast('Removed from saved pieces', { icon: '🤍' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      product,
      1,
      product.sizes ? product.sizes[0] : undefined,
      product.colors ? product.colors[0].name : undefined
    );
    toast.success(`${product.name} added to bag`);
    openCart();
  };

  // If product has a second image, use it on hover for luxury peek effect
  const displayImage =
    hovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      className="group flex flex-col transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container with No Borders */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden mb-4"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestseller && (
            <span
              className="text-[9px] uppercase tracking-ultra font-semibold px-2 py-1 shadow-sm"
              style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#0A0A0A',
              }}
            >
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span
              className="text-[9px] uppercase tracking-ultra font-medium px-2 py-1 bg-black/80 text-white dark:bg-white/90 dark:text-black"
            >
              New Maison
            </span>
          )}
        </div>

        {/* Wishlist Icon Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'opacity-100 bg-white/90 text-gold dark:bg-black/90'
              : 'opacity-80 sm:opacity-0 sm:group-hover:opacity-100 bg-white/80 dark:bg-black/80 hover:scale-110'
          }`}
          style={{ color: isWishlisted ? 'var(--accent-gold)' : 'var(--text-primary)' }}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div
          className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block"
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
            }}
          >
            <ShoppingBag size={13} style={{ color: 'var(--accent-gold)' }} />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Info Section (Minimal, No borders) */}
      <div className="flex flex-col flex-1 space-y-1">
        <p
          className="text-[10px] uppercase tracking-ultra font-medium"
          style={{ color: 'var(--accent-gold)' }}
        >
          {product.category} · {product.material}
        </p>

        <Link
          href={`/product/${product.id}`}
          className="font-serif text-sm md:text-base font-light hover:text-gold transition-colors line-clamp-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 pt-0.5">
          <span
            className="text-xs md:text-sm font-medium tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              className="text-xs line-through"
              style={{ color: 'var(--text-muted)' }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
