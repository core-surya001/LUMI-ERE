'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatINR, DUMMY_WHATSAPP_NUMBER } from '@/lib/utils';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShieldCheck, 
  Gift, 
  Truck, 
  MessageCircle, 
  CheckCircle2, 
  Lock,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

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

  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
  const shipping = 0; // Complimentary luxury shipping
  const total = subtotal;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      toast.success('Your bespoke reservation has been created!');
    }, 1500);
  };

  const generateWhatsAppCartMessage = () => {
    const itemList = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.selectedColor || item.product.material}${item.selectedSize ? `, Size ${item.selectedSize}` : ''}) x${item.quantity} - ${formatINR(item.product.price * item.quantity)}`
      )
      .join('\n');
    const message = `Hello Lumière Concierge,\n\nI would like to order the following pieces from my bag:\n\n${itemList}\n\nEstimated Total: ${formatINR(total)}\n\nPlease assist with order confirmation and bespoke delivery options.`;
    return `https://wa.me/${DUMMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-theme pb-8 mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs tracking-[0.25em] text-brand-gold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Vault</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">Shopping Bag</h1>
          </div>
          <p className="text-sm text-theme-muted tracking-wide">
            {items.length === 0 ? 'Your bag is empty' : `${items.reduce((acc, item) => acc + item.quantity, 0)} ${items.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'Creation' : 'Creations'} Selected`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-theme flex items-center justify-center text-theme-muted bg-theme-secondary/30">
              <Gift className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Your Shopping Bag is Empty</h2>
            <p className="text-theme-muted text-sm leading-relaxed mb-8">
              Explore our master jewelers&apos; latest creations, diamond solitaires, and signature collections to discover your next heirloom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="btn-gold px-8 py-3.5 text-xs tracking-[0.2em] uppercase">
                Explore The Collection
              </Link>
              <Link href="/wishlist" className="btn-outline px-6 py-3.5 text-xs tracking-[0.2em] uppercase">
                View Saved Vault
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Products List (Left 7-8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="divide-y divide-theme">
                {items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* Image */}
                    <Link 
                      href={`/product/${item.product.id}`}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 bg-theme-secondary/40 flex-shrink-0 overflow-hidden group border border-theme"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="128px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] tracking-[0.2em] text-brand-gold uppercase block mb-1">
                            {item.product.category}
                          </span>
                          <Link 
                            href={`/product/${item.product.id}`}
                            className="font-serif text-base sm:text-lg hover:text-brand-gold transition-colors block"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.id);
                            toast.success('Removed from bag');
                          }}
                          className="text-theme-muted hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Tags */}
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-theme-muted">
                        <span className="px-2 py-0.5 bg-theme-secondary text-[11px]">
                          Metal: {item.selectedColor || item.product.material}
                        </span>
                        {item.selectedSize && (
                          <span className="px-2 py-0.5 bg-theme-secondary text-[11px]">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-theme-secondary text-[11px]">
                          Ref: #{item.product.id}
                        </span>
                      </div>

                      {/* Controls and Price */}
                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-theme">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-theme-secondary text-theme-muted hover:text-theme transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-theme-secondary text-theme-muted hover:text-theme transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-serif text-base font-medium">
                            {formatINR(item.product.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-theme-muted">
                              {formatINR(item.product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons below list */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-theme">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase hover:text-brand-gold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Continue Shopping
                </Link>
                <button
                  onClick={() => {
                    clearCart();
                    toast('Shopping bag emptied');
                  }}
                  className="text-xs text-theme-muted hover:text-red-500 tracking-wider transition-colors"
                >
                  Clear Bag
                </button>
              </div>

              {/* Luxury Guarantee Box */}
              <div className="mt-8 p-6 bg-theme-secondary/40 border border-theme space-y-4">
                <h4 className="font-serif text-sm tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  The Lumière Atelier Standard
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-theme-muted">
                  <div className="flex items-start gap-2">
                    <Gift className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>Signature velvet gift casket & certificate</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>Armored courier complimentary insured transit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>Lifetime inspection & cleaning warranty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary (Right 4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-6 sm:p-8 bg-theme-secondary/30 border border-theme space-y-6">
                <h3 className="font-serif text-lg tracking-wide border-b border-theme pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Estimated Subtotal</span>
                    <span className="font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Insured Express Shipping</span>
                    <span className="text-brand-gold text-xs tracking-wider uppercase font-semibold">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Signature Presentation Box</span>
                    <span className="text-brand-gold text-xs tracking-wider uppercase font-semibold">
                      Included
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Taxes & Duties</span>
                    <span className="text-xs text-theme-muted">Calculated at checkout</span>
                  </div>

                  <div className="border-t border-theme pt-4 flex justify-between items-baseline">
                    <span className="font-serif text-base">Estimated Total</span>
                    <span className="font-serif text-2xl font-semibold text-brand-gold">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Primary Checkout Button (UI only demo) */}
                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full btn-gold py-4 text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Proceed to Checkout
                  </button>

                  {/* Instant WhatsApp Concierge Order Button */}
                  <a
                    href={generateWhatsAppCartMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-whatsapp py-3.5 text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 border border-[#25D366]/40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order All via WhatsApp
                  </a>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-theme-muted">
                    Payments securely processed in frontend demo mode. All fine jewelry is handcrafted to order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UI Checkout Modal (Frontend-Only Demonstration) */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-theme border border-theme max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
              {!orderComplete ? (
                <>
                  <div className="text-center space-y-2">
                    <div className="inline-flex p-3 rounded-full bg-brand-gold/10 text-brand-gold mb-2">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl">Bespoke Concierge Checkout</h3>
                    <p className="text-xs text-theme-muted">
                      Complete your reservation details. Since this is a frontend-only showcase, no payment card is charged.
                    </p>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block uppercase tracking-wider text-theme-muted mb-1 text-[10px]">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="Alexander"
                          className="w-full px-3 py-2.5 bg-theme-secondary/40 border border-theme focus:border-brand-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-theme-muted mb-1 text-[10px]">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="Vanderbilt"
                          className="w-full px-3 py-2.5 bg-theme-secondary/40 border border-theme focus:border-brand-gold outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-theme-muted mb-1 text-[10px]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        defaultValue="client@lumiere-paris.com"
                        className="w-full px-3 py-2.5 bg-theme-secondary/40 border border-theme focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-theme-muted mb-1 text-[10px]">
                        Insured Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="740 Park Avenue, Penthouse B"
                        className="w-full px-3 py-2.5 bg-theme-secondary/40 border border-theme focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div className="p-3 bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-between">
                      <span className="font-medium text-brand-gold">Total Demonstration Value:</span>
                      <span className="font-serif text-sm font-semibold">{formatINR(total)}</span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCheckoutModalOpen(false)}
                        className="flex-1 py-3 border border-theme text-xs tracking-wider uppercase hover:bg-theme-secondary transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 btn-gold py-3 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Securing...</span>
                          </>
                        ) : (
                          'Confirm Reservation'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/15 text-brand-gold mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl">Bespoke Reservation Confirmed</h3>
                  <p className="text-sm text-theme-muted leading-relaxed">
                    Thank you for choosing Maison Lumière. Your order reference <strong className="text-brand-gold">#LUM-{Math.floor(100000 + Math.random() * 900000)}</strong> has been simulated.
                  </p>
                  <p className="text-xs text-theme-muted">
                    Our atelier concierge is preparing your master inspection. You may also connect directly via WhatsApp anytime.
                  </p>
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setIsCheckoutModalOpen(false);
                        setOrderComplete(false);
                      }}
                      className="btn-gold py-3 text-xs tracking-[0.2em] uppercase"
                    >
                      Return to Gallery
                    </button>
                    <a
                      href={generateWhatsAppCartMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp py-3 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with Concierge Now
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
