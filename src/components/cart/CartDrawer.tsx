'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, DUMMY_WHATSAPP_NUMBER } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalSum = items.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
  const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    let text = `Hi, I would like to place an order for the following pieces:\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name} (Qty: ${item.quantity}`;
      if (item.selectedSize) text += `, Size: ${item.selectedSize}`;
      if (item.selectedColor) text += `, Metal: ${item.selectedColor}`;
      text += `) - ${formatPrice(item.product.price * item.quantity)}\n`;
    });
    text += `\n*Total Estimated Order Value:* ${formatPrice(totalSum)}\n`;
    text += `Please assist me with secure dispatch and authentication details.`;

    const url = `https://wa.me/${DUMMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] z-50 flex flex-col shadow-2xl transition-transform duration-400 ease-out border-l ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-light)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} style={{ color: 'var(--accent-gold)' }} />
            <h3
              className="font-serif text-lg font-light tracking-wider uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              Shopping Bag
            </h3>
            {count > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0A0A0A',
                }}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1 cursor-pointer hover:opacity-75 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag
                size={48}
                className="mb-4 stroke-1 opacity-25"
                style={{ color: 'var(--accent-gold)' }}
              />
              <p
                className="font-serif text-xl font-light mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Your bag is currently empty
              </p>
              <p
                className="text-xs mb-8 max-w-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                Explore our fine jewelry curations to begin your bespoke selection.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-gold text-xs"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {/* Thumbnail */}
                <div
                  className="relative w-20 h-20 flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      href={`/product/${item.productId}`}
                      onClick={closeCart}
                      className="font-serif text-sm font-medium hover:text-gold transition-colors truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer hover:text-red-500 transition-colors p-0.5"
                      style={{ color: 'var(--text-muted)' }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p
                    className="text-[11px] mt-0.5 uppercase tracking-wider"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    {item.selectedColor || item.product.material}
                    {item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div
                      className="flex items-center border"
                      style={{ borderColor: 'var(--border-light)' }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:opacity-75 cursor-pointer"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="w-8 text-center text-xs font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:opacity-75 cursor-pointer"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals & WhatsApp order */}
        {items.length > 0 && (
          <div
            className="p-6 border-t space-y-4"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Subtotal</span>
              <span
                className="font-serif text-lg font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {formatPrice(totalSum)}
              </span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Complimentary insured courier delivery &amp; GIA certificates included.
            </p>

            <div className="space-y-2.5 pt-1">
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp w-full flex items-center justify-center py-3.5 text-xs"
              >
                Order via WhatsApp Direct
              </button>

              {/* View Full Cart Page Button */}
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-outline w-full flex items-center justify-center gap-2 py-3 text-xs"
              >
                <span>View Full Bag &amp; Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
