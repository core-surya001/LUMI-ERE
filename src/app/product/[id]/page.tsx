'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Shield,
  Truck,
  RotateCcw,
  Award,
  Minus,
  Plus,
  ArrowRight,
  ZoomIn,
  X,
} from 'lucide-react';
import { getProductById, getRelatedProducts, REVIEWS_DATA, PRODUCTS } from '@/data/products';
import { formatPrice, getWhatsAppOrderUrl } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import ProductCard from '@/components/products/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = getProductById(id) || PRODUCTS[0];
  const related = getRelatedProducts(product.category, product.id);
  const reviews = REVIEWS_DATA[product.id] || [
    {
      id: 'rev-sample',
      author: 'Ananya Deshmukh',
      rating: 5,
      date: 'Recent Purchase',
      title: 'Magnificent Piece of Art',
      comment:
        'The finish and weight of this piece is exceptional. It arrived securely packaged with hallmark authentication and full appraisal certificate.',
      verified: true,
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : product.material
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(product.id);

  // Monitor scroll for the sticky Add to Cart + WhatsApp bar
  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky bar when user scrolls down past 450px
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined);
    toast.success(`${product.name} added to your bag`);
    openCart();
  };

  const handleWishlistToggle = () => {
    const added = toggle(product.id);
    if (added) {
      toast.success(`${product.name} saved to private vault`);
    } else {
      toast('Removed from saved items', { icon: '🤍' });
    }
  };

  const whatsappUrl = getWhatsAppOrderUrl(product.name, product.price, {
    size: selectedSize || undefined,
    metal: selectedColor || undefined,
  });

  return (
    <div className="py-10 md:py-16">
      {/* Breadcrumb Navigation */}
      <div className="container-luxury pb-8">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">
            Collections
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-gold transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase: Left Gallery, Right Details */}
      <div className="container-luxury pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ═══ LEFT: LARGE IMAGE GALLERY ═══ */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden cursor-zoom-in group shadow-sm"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              onClick={() => setZoomOpen(true)}
            >
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomOpen(true);
                }}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Enlarge image"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="relative w-20 h-24 flex-shrink-0 overflow-hidden border transition-all cursor-pointer"
                    style={{
                      borderColor:
                        activeImageIndex === idx ? 'var(--accent-gold)' : 'var(--border-subtle)',
                      opacity: activeImageIndex === idx ? 1 : 0.65,
                    }}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ═══ RIGHT: PRODUCT DETAILS ═══ */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-7">
            {/* Category & Material Tag */}
            <div>
              <p
                className="text-[11px] uppercase tracking-ultra font-semibold mb-2"
                style={{ color: 'var(--accent-gold)' }}
              >
                {product.category} · {product.material}
              </p>
              {/* Product Name (Large) */}
              <h1
                className="font-serif text-3xl sm:text-4xl font-light leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {product.name}
              </h1>
              <p className="text-xs text-muted mt-1.5 font-light">{product.tagline}</p>
            </div>

            {/* Price & Rating */}
            <div
              className="flex items-baseline justify-between pb-6 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-serif text-2xl md:text-3xl font-normal"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-sm line-through"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-gold">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={
                        s <= Math.round(product.rating)
                          ? 'fill-current text-gold'
                          : 'stroke-stone-400'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {product.rating}
                </span>
                <span className="text-xs text-muted">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Variant Selection: Color / Metal */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="uppercase tracking-wider font-medium text-muted">
                    Precious Metal:
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {selectedColor}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className="group flex items-center gap-2 p-2 border transition-all cursor-pointer"
                      style={{
                        borderColor:
                          selectedColor === c.name ? 'var(--accent-gold)' : 'var(--border-subtle)',
                        backgroundColor:
                          selectedColor === c.name ? 'rgba(201, 166, 70, 0.05)' : 'transparent',
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs" style={{ color: 'var(--text-primary)' }}>
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selection: Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="uppercase tracking-wider font-medium text-muted">
                    Select Size:
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className="min-w-10 h-10 px-3 text-xs font-medium border transition-all cursor-pointer flex items-center justify-center"
                      style={{
                        borderColor:
                          selectedSize === sz ? 'var(--accent-gold)' : 'var(--border-light)',
                        backgroundColor:
                          selectedSize === sz ? 'var(--accent-gold)' : 'transparent',
                        color: selectedSize === sz ? '#0A0A0A' : 'var(--text-primary)',
                        fontWeight: selectedSize === sz ? 700 : 400,
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                Quantity:
              </span>
              <div
                className="flex items-center border"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:opacity-75 cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Minus size={13} />
                </button>
                <span
                  className="w-10 text-center text-xs font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="w-9 h-9 flex items-center justify-center hover:opacity-75 cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Plus size={13} />
                </button>
              </div>
              <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>
                ● {product.stockCount} in Vault
              </span>
            </div>

            {/* Primary Action Buttons (Add to Cart + Order on WhatsApp + Wishlist) */}
            <div className="space-y-3 pt-3">
              <div className="flex gap-3">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn-gold flex-1 flex items-center justify-center gap-2 py-3.5"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist Icon Button */}
                <button
                  onClick={handleWishlistToggle}
                  className="w-13 h-13 border flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  style={{
                    borderColor: isWishlisted ? 'var(--accent-gold)' : 'var(--border-light)',
                    color: isWishlisted ? 'var(--accent-gold)' : 'var(--text-primary)',
                  }}
                  aria-label="Save to Vault"
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Order on WhatsApp Button (IMPORTANT) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full flex items-center justify-center gap-2 py-3.5"
              >
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-2 gap-3 pt-6 border-t text-xs"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <div className="flex items-center gap-2">
                <Shield size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>GIA / BIS Hallmarked</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Insured Doorstep Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>30-Day Royal Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Lifetime Ultrasonic Polish</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BELOW: DESCRIPTION, SPECS, REVIEWS TABS ═══ */}
        <div
          className="mt-20 border-t pt-12"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {/* Tab Navigation */}
          <div className="flex border-b mb-8" style={{ borderColor: 'var(--border-subtle)' }}>
            {[
              { id: 'desc', label: 'Description & Philosophy' },
              { id: 'specs', label: 'Atelier Specifications' },
              { id: 'reviews', label: `Patron Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="pb-4 mr-8 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer relative"
                style={{
                  color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-0.5"
                    style={{ backgroundColor: 'var(--accent-gold)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-sm leading-relaxed text-secondary">
                <p>{product.description}</p>
                <div className="pt-4 space-y-2">
                  <h4 className="font-serif text-base text-primary mb-2">Key Attributes</h4>
                  {product.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-secondary">
                      <Check size={14} className="text-gold flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 border"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-muted mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs font-medium text-primary">{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 border"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex text-gold gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={11} className="fill-current text-gold" />
                          ))}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-primary">
                          {rev.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-muted">{rev.date}</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed mb-3">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-muted font-medium">
                      {rev.author} · {rev.verified ? 'Verified Patron' : 'Client'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ═══ RELATED CREATIONS ═══ */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="text-center max-w-xl mx-auto mb-14">
              <p
                className="text-[11px] uppercase tracking-ultra mb-2 font-medium"
                style={{ color: 'var(--accent-gold)' }}
              >
                Harmonious Pairings
              </p>
              <h2 className="font-serif text-3xl font-light" style={{ color: 'var(--text-primary)' }}>
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ STICKY ADD TO CART + WHATSAPP BUTTON ON SCROLL ═══ */}
      {showStickyBar && (
        <div
          className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 border-t shadow-2xl transition-all duration-300 animate-fade-in-up"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-light)',
          }}
        >
          <div className="container-luxury flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 flex-shrink-0 overflow-hidden hidden sm:block"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-serif text-sm font-medium truncate text-primary">
                  {product.name}
                </p>
                <p className="text-xs font-semibold text-gold">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleAddToCart}
                className="btn-gold py-2.5 px-5 text-[11px]"
              >
                <ShoppingBag size={13} className="mr-1.5 inline" />
                <span>Add to Bag</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp py-2.5 px-5 text-[11px]"
              >
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══ IMAGE ENLARGEMENT LIGHTBOX MODAL ═══ */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gold cursor-pointer"
              aria-label="Close image"
            >
              <X size={26} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={product.images[activeImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
