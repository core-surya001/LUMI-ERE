'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  subtotal: () => number;
  getSubtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedSize, selectedColor) => {
        const id = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
        const currentItems = get().items;
        const existing = currentItems.find((i) => i.id === id);

        if (existing) {
          set({
            items: currentItems.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id,
                productId: product.id,
                product,
                quantity,
                selectedSize,
                selectedColor,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({
            items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
          });
        }
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      subtotal: () => {
        const currentItems = get().items || [];
        return currentItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
      },

      getSubtotal: () => {
        const currentItems = get().items || [];
        return currentItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
      },

      itemCount: () => {
        const currentItems = get().items || [];
        return currentItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
      },
    }),
    {
      name: 'lumiere_cart_v2',
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState: unknown, currentState: CartState) => {
        const persisted = persistedState as { items?: CartItem[] } | undefined;
        return {
          ...currentState,
          items: Array.isArray(persisted?.items) ? persisted.items : [],
        };
      },
    }
  )
);
