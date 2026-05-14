import { create } from 'zustand';
import type { CartItem } from './useCartStore';

export type OrderStatus = 'pending' | 'confirmed';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  note: string;
  image?: string;
}

export interface Order {
  id: string;
  table: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
}

import { mockMenu } from '../mocks/menuData';

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    table: 'Bàn 01',
    time: '10:30 AM',
    status: 'pending',
    items: [
      { productId: mockMenu[1].id, name: mockMenu[1].name, qty: 2, note: 'Ghi chú: Nhiều bì', price: mockMenu[1].price, image: mockMenu[1].image },
      { productId: mockMenu[17].id, name: mockMenu[17].name, qty: 1, note: 'Size: M', price: mockMenu[17].price, image: mockMenu[17].image }
    ]
  },
  {
    id: 'ORD-002',
    table: 'Bàn 15',
    time: '10:25 AM',
    status: 'confirmed',
    items: [
      { productId: mockMenu[16].id, name: mockMenu[16].name, qty: 2, note: 'Size: L | Thêm: Thạch trái cây', price: mockMenu[16].price + 20000, image: mockMenu[16].image }
    ]
  },
  {
    id: 'ORD-003',
    table: 'Bàn 08',
    time: '10:15 AM',
    status: 'confirmed',
    items: [
      { productId: mockMenu[9].id, name: mockMenu[9].name, qty: 1, note: '', price: mockMenu[9].price, image: mockMenu[9].image },
      { productId: mockMenu[18].id, name: mockMenu[18].name, qty: 3, note: 'Ghi chú: Ít đá', price: mockMenu[18].price, image: mockMenu[18].image }
    ]
  }
];

interface OrderState {
  orders: Order[];
  placeOrder: (items: CartItem[], table?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateItemQtyAndNote: (orderId: string, itemIdx: number, qty: number, note: string) => void;
  deleteOrderItem: (orderId: string, itemIdx: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: mockOrders,
  placeOrder: (items, table = 'Bàn 01') => set((state) => {
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    
    const newItems: OrderItem[] = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      qty: item.quantity,
      note: item.note || '',
      image: item.image
    }));
    
    const newOrder: Order = {
      id: orderId,
      table,
      time,
      status: 'pending',
      items: newItems
    };
    
    return {
      orders: [newOrder, ...state.orders]
    };
  }),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
  })),
  updateItemQtyAndNote: (orderId, itemIdx, qty, note) => set((state) => ({
    orders: state.orders.map(order => {
      if (order.id !== orderId) return order;
      const newItems = [...order.items];
      newItems[itemIdx] = { ...newItems[itemIdx], qty, note };
      return { ...order, items: newItems };
    })
  })),
  deleteOrderItem: (orderId, itemIdx) => set((state) => ({
    orders: state.orders.map(order => {
      if (order.id !== orderId) return order;
      const newItems = order.items.filter((_, idx) => idx !== itemIdx);
      return { ...order, items: newItems };
    })
  }))
}));
