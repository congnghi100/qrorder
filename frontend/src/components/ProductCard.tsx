import React from 'react';
import { Plus, Clock, Star } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description?: string;
  price: number;
  image: string;
  onAdd: () => void;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image, onAdd, onClick, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-transparent flex items-start gap-3 py-3 border-b border-[#154e3d]/10 last:border-0 cursor-pointer active:scale-[0.98] transition-transform"
        onClick={onClick}
      >
        <img src={image} alt={name} className="w-[84px] h-[84px] rounded-2xl object-cover bg-gray-100 shrink-0 shadow-sm" />
        <div className="flex-1 flex flex-col min-w-0 py-1">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-bold text-[15px] leading-tight text-gray-900 line-clamp-2">{name}</h3>
              {description && (
                <p className="text-[13px] text-gray-500 line-clamp-2 leading-snug mt-1">{description}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0 h-full">
              <p className="text-[#599a8d] font-extrabold text-[15px] whitespace-nowrap">
                {price.toLocaleString('vi-VN')}
                <span className="text-[12px] ml-0.5 font-bold">đ</span>
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); onAdd(); }}
                className="w-8 h-8 bg-white text-[#42887C] rounded-lg shadow-sm flex items-center justify-center shrink-0 active:scale-95 transition-transform mt-auto"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-[24px] shadow-sm flex flex-col relative border border-gray-50 h-full overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full aspect-[4/3] object-cover bg-gray-100" />
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(); }} 
          className="absolute -bottom-3 right-3 w-8 h-8 bg-white text-[#42887C] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col p-3 pt-4">
        <h3 className="font-bold text-[15px] leading-tight text-gray-900 mb-1">{name}</h3>
        
        <div className="flex gap-2 items-center text-[11px] text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>prep time</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-current" />
            <span>4.5</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-gray-900 font-extrabold text-[16px]">
            {price.toLocaleString('vi-VN')}
            <span className="text-[13px] ml-0.5 font-bold">đ</span>
          </p>
        </div>
      </div>
    </div>
  );
};

