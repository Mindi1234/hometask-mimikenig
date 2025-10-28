import { create } from 'zustand';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

interface CartState {
    products: Product[];
    cartCount: number;
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    resetCart: () => void;
    setProducts: (products: Product[]) => void;
  }

  const saveToLocalStorage = (products: Product[], cartCount: number) => {
    localStorage.setItem("cart", JSON.stringify({ products, cartCount }));
  };
  const loadFromLocalStorage = (): { products: Product[]; cartCount: number } => {
    if (typeof window === "undefined") return { products: [], cartCount: 0 }; // ל־SSR
    const data = localStorage.getItem("cart");
    if (data) return JSON.parse(data);
    return { products: [], cartCount: 0 };
};


export const useCartStore = create<CartState>((set, get) => {
    const { products, cartCount } = loadFromLocalStorage();

    return {
        products,
        cartCount,

        setProducts: (products) => {
            const newCartCount = products.reduce((sum, p) => sum + p.quantity, 0);
            saveToLocalStorage(products, newCartCount);
            set({ products, cartCount: newCartCount });
        },

        addItem: (product) => 
            set((state) => {
                const existProduct = state.products.find((p) => p.id === product.id);
                let newProducts: Product[];

                if (existProduct) {
                    newProducts = state.products.map((p) =>
                        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                } else {
                    newProducts = [...state.products, { ...product, quantity: 1 }];
                }

                const newCartCount = newProducts.reduce((sum, p) => sum + p.quantity, 0);
                saveToLocalStorage(newProducts, newCartCount);

                return {
                    products: newProducts,
                    cartCount: newCartCount,
                };
            }),

        removeItem: (idToRemove) =>
            set((state) => {
                const productToRemove = state.products.find((p) => p.id === idToRemove);
                if (!productToRemove) return state;

                let newProducts: Product[];

                if (productToRemove.quantity > 1) {
                    newProducts = state.products.map((p) =>
                        p.id === idToRemove ? { ...p, quantity: p.quantity - 1 } : p
                    );
                } else {
                    newProducts = state.products.filter((p) => p.id !== idToRemove);
                }

                const newCartCount = newProducts.reduce((sum, p) => sum + p.quantity, 0);
                saveToLocalStorage(newProducts, newCartCount);

                return {
                    products: newProducts,
                    cartCount: newCartCount,
                };
            }),

        resetCart: () => {
            saveToLocalStorage([], 0);
            set({ products: [], cartCount: 0 });
        },
    };
});