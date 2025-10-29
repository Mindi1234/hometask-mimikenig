import { create } from 'zustand';
import { Product } from '@/app/types/product';

interface WishlistState {
    products: Product[];
    wishCount: number;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    toggleWishlist: (product: Product) => void;
  }

const saveToLocalStorage = (products: Product[], wishCount: number) => {
    localStorage.setItem("wishList", JSON.stringify({ products, wishCount }));
  };
  const loadFromLocalStorage = (): { products: Product[]; wishCount: number } => {
    if (typeof window === "undefined") return { products: [], wishCount: 0 };
    const data = localStorage.getItem("wishList");
    if (data) return JSON.parse(data);
    return { products: [], wishCount: 0 };
};

export const useWishlistStore  = create<WishlistState>((set, get) => ({
    ...loadFromLocalStorage(),

    addToWishlist: (product) => {
        const exists = get().products.find(p => p.id === product.id);
        if (!exists) {
          const newProducts = [...get().products, product];
          set({ products: newProducts, wishCount: newProducts.length });
          saveToLocalStorage(newProducts, newProducts.length);
        }
      },

      removeFromWishlist: (id) => {
        const newProducts = get().products.filter(p => p.id !== id);
        set({ products: newProducts, wishCount: newProducts.length });
        saveToLocalStorage(newProducts, newProducts.length);
      },

      
  toggleWishlist: (product) => {
    const exists = get().products.find(p => p.id === product.id);
    if (exists) {
      get().removeFromWishlist(product.id);
    } else {
      get().addToWishlist(product);
    }
  },
}));