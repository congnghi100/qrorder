import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 flex gap-3 items-center border border-gray-100">
      <img src={image} alt={name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
      <div className="flex-1">
        <h3 className="font-medium text-text-primary">{name}</h3>
        <p className="text-mint-500 font-semibold mt-1">{price.toLocaleString('vi-VN')} đ</p>
      </div>
      <Button variant="primary" size="sm" onClick={onAdd} className="!px-3 !rounded-lg">
        <Plus size={18} />
      </Button>
    </div>
  );
};
