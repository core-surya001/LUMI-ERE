'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Award, Sparkles, Diamond } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const categories = [
    {
      name: 'Rings',
      tagline: 'Solitaires & Pavé Bands',
      image: '/images/solitaire_diamond_ring.jpg',
      href: '/shop?category=Rings',
    },
    {
      name: 'Necklaces',
      tagline: 'Pearls & Emerald Pendants',
      image: '/images/emerald_halo_necklace.jpg',
      href: '/shop?category=Necklaces',
    },
    {
      name: 'Earrings',
      tagline: 'Chandeliers & Diamond Studs',
      image: '/images/golden_filigree_earrings.jpg',
      href: '/shop?category=Earrings',
    },
    {
      name: 'Bracelets',
      tagline: 'Tennis Lines & Gold Bangles',
      image: '/images/diamond_tennis_bracelet.jpg',
      href: '/shop?category=Bracelets',
    },
  ];

  const testimonials = [
    {
      quote:
        'The fire and clarity of the diamond in my engagement ring is extraordinary. It exudes timeless poise and subtle grandeur.',
      author: 'Aadya Kulkarni',
      city: 'South Mumbai',
      piece: 'Solitaire Diamond Engagement Ring',
    },
    {
      quote:
        'In an age of mass manufacturing, Lumière retains the genuine hand-hewn soul of Parisian and Indian high jewelry salons.',
      author: 'Ranveer Singhania',
      city: 'New Delhi',
      piece: 'Classic Diamond Tennis Bracelet',
    },
    {
      quote:
        'The South Sea pearl necklace arrived encased in polished mahogany with pristine GIA certification. Absolutely breathtaking.',
      author: 'Meera Chidambaram',
      city: 'Bangalore',
      piece: 'Celestial Pearl & Diamond Pendant',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="relative h-[85vh] min-h-[580px] w-full flex items-center justify-center overflow-hidden">
        {/* Full-width luxury jewelry hero image */}
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2000&auto=format&fit=crop&q=90"
          alt="Luxury diamond jewelry"
          fill
          priority
          className="object-cover object-center filter brightness-[0.78] dark:brightness-[0.62]"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 container-luxury text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <p className="text-[10px] sm:text-xs tracking-ultra uppercase text-gold mb-4 font-semibold">
            ✦ Haute Joaillerie Atelier ✦
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-[1.1] mb-6">
            Crafted for <span className="italic font-normal">Timeless Elegance</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-200/90 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Discover rare diamonds, lustrous pearls, and solid 18-karat golds sculptured by generational artisans.
          </p>

          {/* One Clean Primary CTA */}
          <Link href="/shop" className="btn-gold shadow-2xl">
            Shop Collection
          </Link>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section
        className="py-6 border-b transition-colors"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="container-luxury grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Sparkles, label: 'GIA & BIS Hallmarked', desc: 'Conflict-Free Diamonds' },
            { icon: Shield, label: 'Insured Royal Delivery', desc: 'Complimentary on All Orders' },
            { icon: Award, label: 'Master Hand-Crafted', desc: 'Generational Goldsmiths' },
            { icon: Diamond, label: 'Lifetime Care Policy', desc: 'Complimentary Cleaning' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 p-2">
              <Icon size={18} style={{ color: 'var(--accent-gold)' }} />
              <p
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {label}
              </p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 2. CATEGORIES ═══ */}
      <section className="py-24 container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-[11px] uppercase tracking-ultra mb-2 font-medium"
            style={{ color: 'var(--accent-gold)' }}
          >
            The Collections
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-light"
            style={{ color: 'var(--text-primary)' }}
          >
            Curated by Discipline
          </h2>
        </div>

        {/* Large Image Cards with Hover Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden block"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

              <div className="absolute bottom-8 inset-x-8 text-center text-white">
                <p className="text-[10px] uppercase tracking-ultra text-gold-light mb-1">
                  {cat.tagline}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold border-b border-gold pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ 3. BESTSELLERS (Clean 4-column Grid, No Borders) ═══ */}
      <section
        className="py-24 transition-colors"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p
                className="text-[11px] uppercase tracking-ultra mb-2 font-medium"
                style={{ color: 'var(--accent-gold)' }}
              >
                Signature Repertoire
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-light"
                style={{ color: 'var(--text-primary)' }}
              >
                Maison Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 hover:text-gold transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>View All Creations</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Clean 4-column Grid (No borders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. BRAND STORY (Image + Text Split) ═══ */}
      <section className="py-24 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Split Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl">
            <Image
              src="/images/atelier_craftsmanship.jpg"
              alt="Master goldsmith and diamond setter in high jewelry atelier"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Split Story Text */}
          <div className="space-y-6 lg:pl-6">
            <p
              className="text-[11px] uppercase tracking-ultra font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              The Maison Heritage · Since 1987
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Where Ancient Soul Meets Modern Refinement
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Lumière was founded on a singular premise: fine jewelry must transcend mere adornment to become an intimate heirloom. We reject seasonal trends in favor of enduring sculptural balance, precision-cut gemstones, and pure solid precious metals.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every diamond is ethically sourced and audited under the Kimberley Process. Hand-set in our Mumbai atelier by generational masters, our creations celebrate love, triumph, and personal sovereignty.
            </p>

            <div className="pt-4 flex items-center gap-8">
              <div>
                <p className="font-serif text-2xl text-gold">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted">Conflict-Free</p>
              </div>
              <div className="w-px h-10 bg-border-light" />
              <div>
                <p className="font-serif text-2xl text-gold">18K / 22K</p>
                <p className="text-[10px] uppercase tracking-wider text-muted">Hallmarked Purity</p>
              </div>
              <div className="w-px h-10 bg-border-light" />
              <div>
                <p className="font-serif text-2xl text-gold">GIA</p>
                <p className="text-[10px] uppercase tracking-wider text-muted">Certified Origin</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/shop" className="btn-outline">
                Explore The Archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS (Minimal and Elegant) ═══ */}
      <section
        className="py-24 border-t transition-colors"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="container-luxury max-w-5xl text-center">
          <p
            className="text-[11px] uppercase tracking-ultra mb-2 font-medium"
            style={{ color: 'var(--accent-gold)' }}
          >
            Patron Appraisals
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-light mb-16"
            style={{ color: 'var(--text-primary)' }}
          >
            Words of Reverence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between text-left p-8 border transition-all hover:border-gold"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className="fill-current text-gold"
                      />
                    ))}
                  </div>
                  <p
                    className="font-serif text-base italic leading-relaxed mb-6"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <p
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t.author}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {t.city} · {t.piece}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
