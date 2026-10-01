'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'] as const;
const MATERIALS = [
  'All',
  '18K Yellow Gold',
  '18K Rose Gold',
  '18K White Gold',
  'Platinum',
  '22K Gold',
] as const;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Curations' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(250000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category if URL parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat as any)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (initialSearch.trim()) {
      const q = initialSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          (p.gemstone && p.gemstone.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedMaterial !== 'All') {
      list = list.filter((p) => p.material === selectedMaterial);
    }

    list = list.filter((p) => p.price <= priceRange);

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedMaterial, priceRange, sortBy, initialSearch]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (priceRange < 250000 ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setPriceRange(250000);
  };

  return (
    <div className="py-10 md:py-16 container-luxury">
      {/* Page Title & Count */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <p
          className="text-[11px] uppercase tracking-ultra mb-2 font-medium"
          style={{ color: 'var(--accent-gold)' }}
        >
          High Jewelry Repertoire
        </p>
        <h1
          className="font-serif text-3xl md:text-5xl font-light mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
        </h1>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Showing {filteredProducts.length} certified bespoke masterworks
        </p>
      </div>

      {/* Top Mobile Filter & Sort Bar */}
      <div
        className="flex items-center justify-between pb-6 mb-8 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold py-2 px-3 border cursor-pointer"
          style={{
            borderColor: 'var(--border-light)',
            color: 'var(--text-primary)',
          }}
        >
          <SlidersHorizontal size={14} style={{ color: 'var(--accent-gold)' }} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#0A0A0A',
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Clear Filters (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-muted hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs uppercase tracking-wider text-muted hidden sm:inline">
            Sort by:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent border text-xs py-2 pl-3 pr-8 uppercase tracking-wider cursor-pointer outline-none transition-colors focus:border-gold"
              style={{
                borderColor: 'var(--border-light)',
                color: 'var(--text-primary)',
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white dark:bg-stone-900 text-black dark:text-white"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--accent-gold)' }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* ═══ DESKTOP LEFT SIDEBAR FILTERS ═══ */}
        <aside
          className="hidden lg:block space-y-8 sticky top-28 p-6 border transition-colors"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {/* Category Filter */}
          <div>
            <h3
              className="font-serif text-sm uppercase tracking-widest mb-4 font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              Category
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full flex items-center justify-between text-xs py-1.5 transition-colors cursor-pointer text-left"
                  style={{
                    color:
                      selectedCategory === cat
                        ? 'var(--accent-gold)'
                        : 'var(--text-secondary)',
                    fontWeight: selectedCategory === cat ? 600 : 400,
                  }}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check size={13} />}
                </button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div
            className="pt-6 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <h3
              className="font-serif text-sm uppercase tracking-widest mb-4 font-semibold"
              style={{ color: 'var(--accent-gold)' }}
            >
              Precious Material
            </h3>
            <div className="space-y-2">
              {MATERIALS.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className="w-full flex items-center justify-between text-xs py-1.5 transition-colors cursor-pointer text-left"
                  style={{
                    color:
                      selectedMaterial === mat
                        ? 'var(--accent-gold)'
                        : 'var(--text-secondary)',
                    fontWeight: selectedMaterial === mat ? 600 : 400,
                  }}
                >
                  <span>{mat}</span>
                  {selectedMaterial === mat && <Check size={13} />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div
            className="pt-6 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="font-serif text-sm uppercase tracking-widest font-semibold"
                style={{ color: 'var(--accent-gold)' }}
              >
                Max Price
              </h3>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                ₹{(priceRange / 1000).toFixed(0)}k
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="250000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C9A646] cursor-pointer"
            />
            <div
              className="flex justify-between text-[10px] mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>₹30,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>
        </aside>

        {/* ═══ RIGHT PRODUCT GRID ═══ */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border p-10" style={{ borderColor: 'var(--border-subtle)' }}>
              <p className="font-serif text-2xl font-light mb-3" style={{ color: 'var(--text-primary)' }}>
                No creations match your selection
              </p>
              <p className="text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
                Please try expanding your price range or clearing active filters.
              </p>
              <button onClick={resetFilters} className="btn-gold text-xs">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══ MOBILE FILTER MODAL DRAWER ═══ */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm lg:hidden">
          <div
            className="w-full max-w-md p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in-up"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b mb-6">
              <h3 className="font-serif text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                Filter Creations
              </h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gold mb-3 font-semibold">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="text-xs px-3.5 py-1.5 border transition-all"
                    style={{
                      borderColor:
                        selectedCategory === cat ? 'var(--accent-gold)' : 'var(--border-light)',
                      backgroundColor:
                        selectedCategory === cat ? 'var(--accent-gold)' : 'transparent',
                      color: selectedCategory === cat ? '#0A0A0A' : 'var(--text-primary)',
                      fontWeight: selectedCategory === cat ? 600 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Material */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gold mb-3 font-semibold">Material</p>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className="text-xs px-3 py-1.5 border transition-all"
                    style={{
                      borderColor:
                        selectedMaterial === mat ? 'var(--accent-gold)' : 'var(--border-light)',
                      backgroundColor:
                        selectedMaterial === mat ? 'var(--accent-gold)' : 'transparent',
                      color: selectedMaterial === mat ? '#0A0A0A' : 'var(--text-primary)',
                      fontWeight: selectedMaterial === mat ? 600 : 400,
                    }}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="mb-8">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gold font-semibold uppercase tracking-wider">Max Price</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  ₹{(priceRange / 1000).toFixed(0)}k
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="250000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C9A646]"
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="btn-gold w-full text-xs py-3.5"
            >
              Apply Filters ({filteredProducts.length} Pieces)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
