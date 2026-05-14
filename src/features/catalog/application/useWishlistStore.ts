import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      toggleWishlist: (productId: string) => {
        const currentIds = get().wishlistIds;
        if (currentIds.includes(productId)) {
          set({ wishlistIds: currentIds.filter((id) => id !== productId) });
        } else {
          set({ wishlistIds: [...currentIds, productId] });
        }
      },
      hasItem: (productId: string) => get().wishlistIds.includes(productId),
      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'luxewear-wishlist-store',
    }
  )
);
