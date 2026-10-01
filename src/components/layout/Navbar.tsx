'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X, Diamond } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useSearchStore } from '@/store/searchStore';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { toggleCart, items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch } = useSearchStore();

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize html theme attribute from store
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const navLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Rings', href: '/shop?category=Rings' },
    { label: 'Necklaces', href: '/shop?category=Necklaces' },
    { label: 'Earrings', href: '/shop?category=Earrings' },
    { label: 'Bracelets', href: '/shop?category=Bracelets' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div
        className="text-center py-2 text-[10px] md:text-xs tracking-ultra uppercase font-medium border-b"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--accent-gold)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        ✦ Complimentary Insured Delivery on All High Jewelry Orders ✦
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-md' : 'py-5'
        }`}
        style={{
          backgroundColor: isScrolled
            ? 'var(--bg-primary)'
            : 'var(--bg-primary)',
          borderBottom: isScrolled
            ? '1px solid var(--border-light)'
            : '1px solid var(--border-subtle)',
        }}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 cursor-pointer hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={openSearch}
              className="p-1 cursor-pointer hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Open search"
            >
              <Search size={19} />
            </button>
          </div>

          {/* Desktop Nav Links (Left) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase transition-colors hover:text-gold"
                style={{
                  color:
                    pathname === link.href
                      ? 'var(--accent-gold)'
                      : 'var(--text-secondary)',
                  fontWeight: pathname === link.href ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Brand Logo (Center) */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center group"
          >
            <span
              className="font-serif text-2xl md:text-3xl font-light tracking-widest uppercase flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Diamond
                size={18}
                className="transition-transform group-hover:rotate-45 duration-500"
                style={{ color: 'var(--accent-gold)' }}
              />
              LUMIÈRE
            </span>
            <span
              className="text-[9px] tracking-ultra uppercase -mt-1 hidden sm:block"
              style={{ color: 'var(--accent-gold)' }}
            >
              HAUTE JOAILLERIE
            </span>
          </Link>

          {/* Desktop Nav Links (Right Part 1) + Icons */}
          <div className="flex items-center gap-5 md:gap-7">
            <div className="hidden lg:flex items-center gap-8 mr-2">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase transition-colors hover:text-gold"
                  style={{
                    color:
                      pathname === link.href
                        ? 'var(--accent-gold)'
                        : 'var(--text-secondary)',
                    fontWeight: pathname === link.href ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Search Icon */}
            <button
              onClick={openSearch}
              className="hidden lg:block cursor-pointer hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-1 cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{ color: 'var(--accent-gold)' }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {mounted && theme === 'dark' ? (
                <Sun size={19} className="hover:rotate-45 transition-transform" />
              ) : (
                <Moon size={19} className="hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-1 cursor-pointer hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {mounted && wishlistCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0A0A0A',
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={toggleCart}
              className="relative p-1 cursor-pointer hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Open Cart"
            >
              <ShoppingBag size={19} />
              {mounted && cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0A0A0A',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t px-6 py-6 animate-fade-in-up mt-3"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase hover:text-gold transition-colors py-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className="pt-4 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Theme Appearance
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
