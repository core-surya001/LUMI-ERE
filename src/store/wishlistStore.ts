'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // product IDs
  toggle: (productId: string) => boolean;
  has: (productId: string) => boolean;
  remove: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  clearWishlist: () => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const current = get().items;
        const exists = current.includes(productId);
        if (exists) {
          set({ items: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ items: [...current, productId] });
          return true;
        }
      },
      has: (productId) => get().items.includes(productId),
      remove: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      clear: () => set({ items: [] }),
      clearWishlist: () => set({ items: [] }),
      count: () => get().items.length,
    }),
    {
      name: 'lumiere_wishlist',
    }
  )
);
