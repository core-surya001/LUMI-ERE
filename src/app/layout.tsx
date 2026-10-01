import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/search/SearchModal';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'LUMIÈRE | Haute Joaillerie & Fine Diamonds',
  description:
    'Experience the timeless elegance of Lumière Haute Joaillerie. Handcrafted solitaire diamond rings, cultured pearl necklaces, and fine 18K gold masterworks.',
  keywords: [
    'luxury jewelry',
    'diamond rings',
    'high jewelry',
    'gold necklaces',
    'tiffany style',
    'cartier inspired',
    'fine jewelry',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <Navbar />
        <CartDrawer />
        <SearchModal />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              padding: '12px 18px',
            },
          }}
        />
      </body>
    </html>
  );
}
