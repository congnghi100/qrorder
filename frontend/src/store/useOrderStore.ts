import { create } from 'zustand';
import type { CartItem } from './useCartStore';

export type OrderStatus = 'Đang xử lý' | 'Đã đặt';

export interface OrderedItem extends CartItem {
  orderId: string;
  status: OrderStatus;
  timestamp: number;
}

interface OrderState {
  orderedItems: OrderedItem[];
  placeOrder: (items: CartItem[]) => void;
  updateItemStatus: (orderId: string, productId: string, status: OrderStatus) => void;
  deleteOrderedItem: (orderId: string, productId: string, timestamp: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderedItems: [],
  placeOrder: (items) => set((state) => {
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const timestamp = Date.now();
    
    const newOrderedItems: OrderedItem[] = items.map(item => ({
      ...item,
      orderId,
      status: 'Đang xử lý',
      timestamp
    }));
    
    return {
      orderedItems: [...newOrderedItems, ...state.orderedItems]
    };
  }),
  updateItemStatus: (orderId, productId, status) => set((state) => ({
    orderedItems: state.orderedItems.map(item => 
      (item.orderId === orderId && item.productId === productId) 
        ? { ...item, status } 
        : item
    )
  })),
  deleteOrderedItem: (orderId, productId, timestamp) => set((state) => ({
    orderedItems: state.orderedItems.filter(item => 
      !(item.orderId === orderId && item.productId === productId && item.timestamp === timestamp)
    )
  }))
}));
