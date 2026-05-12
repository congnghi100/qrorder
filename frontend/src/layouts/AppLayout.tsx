import React from 'react';
import { Outlet } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export const AppLayout = () => {
  const { tableNo, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative pb-20 shadow-xl overflow-hidden">
      <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="font-semibold">Bàn: {tableNo || '---'}</div>
        <div className="relative">
          <ShoppingCart className="text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
