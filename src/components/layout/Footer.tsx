'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Diamond, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { getWhatsAppGeneralInquiryUrl } from '@/lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast.success('Welcome to the Lumière Private Salon. ✉️');
    setEmail('');
  };

  return (
    <footer
      className="border-t transition-colors duration-400"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Newsletter / Salon Access */}
      <div
        className="py-16 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="container-luxury text-center max-w-xl">
          <p
            className="text-[11px] uppercase tracking-ultra mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            ✦ The Lumière Salon ✦
          </p>
          <h3
            className="font-serif text-2xl md:text-3xl font-light mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Privileged Invitations &amp; New Creations
          </h3>
          <p
            className="text-xs mb-7 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Receive private viewings of limited high jewelry acquisitions and stories from our master atelier.
          </p>

          {subscribed ? (
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 border text-xs tracking-wider uppercase font-medium"
              style={{
                borderColor: 'var(--accent-gold)',
                color: 'var(--accent-gold)',
              }}
            >
              <Check size={14} /> You have been added to our private roster
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 text-xs bg-transparent border outline-none tracking-wide transition-colors focus:border-gold"
                style={{
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-primary)',
                }}
              />
              <button type="submit" className="btn-gold whitespace-nowrap py-3">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Diamond size={18} style={{ color: 'var(--accent-gold)' }} />
              <span
                className="font-serif text-xl tracking-widest uppercase font-light"
                style={{ color: 'var(--text-primary)' }}
              >
                LUMIÈRE
              </span>
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Exemplifying the pinnacle of high jewelry craftsmanship since 1987. Each stone is individually scrutinized for supreme brilliance, ethical origin, and timeless perfection.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
                style={{ color: 'var(--accent-gold)' }}
              >
                <span>Concierge Chat on WhatsApp</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-5 font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Solitaire Rings', href: '/shop?category=Rings' },
                { label: 'High Necklaces', href: '/shop?category=Necklaces' },
                { label: 'Statement Earrings', href: '/shop?category=Earrings' },
                { label: 'Tennis Bracelets', href: '/shop?category=Bracelets' },
                { label: 'Curated Bestsellers', href: '/shop' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors hover:text-gold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison Standards */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-5 font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              The Maison
            </h4>
            <ul className="space-y-3">
              {[
                'GIA Certified Diamonds',
                'BIS 916 Hallmarked Gold',
                'Kimberley Process Compliant',
                'Complimentary Ring Sizing',
                'Lifetime Polish & Inspection',
              ].map((text) => (
                <li
                  key={text}
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Flagship Salon */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-5 font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              Flagship Atelier
            </h4>
            <div className="space-y-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p>14, Jewelers Row, Zaveri Bazaar</p>
              <p>Mumbai, Maharashtra 400002</p>
              <p className="pt-2">Hours: Mon – Sat, 10:30 AM – 8:00 PM</p>
              <p>Direct: +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div
        className="py-6 border-t text-[11px]"
        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
      >
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LUMIÈRE HAUTE JOAILLERIE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/shop" className="hover:text-gold transition-colors">
              Collection Catalog
            </Link>
            <Link href="/cart" className="hover:text-gold transition-colors">
              Bag
            </Link>
            <Link href="/wishlist" className="hover:text-gold transition-colors">
              Vault
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
