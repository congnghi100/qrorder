import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  note?: string;
}

interface CartState {
  sessionId: string;
  tableNo: string;
  items: CartItem[];
  setSession: (sessionId: string, tableNo: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  sessionId: '',
  tableNo: '',
  items: [],
  setSession: (sessionId, tableNo) => set({ sessionId, tableNo }),
  addToCart: (item) => set((state) => {
    const existing = state.items.find(i => i.productId === item.productId);
    if (existing) {
      return { items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i) };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity === 0 ? state.items.filter(i => i.id !== id) : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
  clearCart: () => set({ items: [] }),
}));
