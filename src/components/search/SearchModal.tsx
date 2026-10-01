'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSearchStore } from '@/store/searchStore';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function SearchModal() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          (p.gemstone && p.gemstone.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md transition-all">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-none border shadow-2xl animate-fade-in-up"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-light)',
        }}
      >
        {/* Header & Input */}
        <div
          className="flex items-center gap-3 p-5 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <Search size={20} style={{ color: 'var(--accent-gold)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diamonds, rings, necklaces, pearls..."
            className="flex-1 bg-transparent text-base outline-none tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={closeSearch}
            className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === '' ? (
            <div className="py-8 text-center">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Popular Curations
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Solitaire Rings', 'South Sea Pearls', 'Tennis Bracelets', 'Diamond Studs'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3.5 py-1.5 border transition-all cursor-pointer"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                No creations found
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Try searching for &quot;Diamond&quot;, &quot;Gold&quot;, or &quot;Pearl&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                {results.length} Pieces Found
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 p-3 group transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div
                    className="relative w-16 h-16 flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent-gold)' }}>
                      {product.category} · {product.material}
                    </p>
                    <h4
                      className="font-serif text-sm truncate group-hover:text-gold transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: 'var(--accent-gold)' }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
