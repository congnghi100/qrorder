import { useState, useMemo } from 'react';
import { mockMenu, mockCategories } from '../mocks/menuData';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { Star, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../components/Button';

export const BestSellerView = () => {
  const [activeCategory, setActiveCategory] = useState(mockCategories[0]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const viewMode = useAppStore(state => state.viewMode);
  const setViewMode = useAppStore(state => state.setViewMode);
  
  const addToCart = useCartStore(state => state.addToCart);
  const items = useCartStore(state => state.items);
  const navigate = useNavigate();

  const handleAdd = (product: any) => {
    addToCart({
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const bestSellers = useMemo(() => {
    let result = mockMenu.filter((item: any) => item.isBestSeller);
    if (activeCategory !== 'All') {
      result = result.filter((item: any) => item.category === activeCategory);
    }
    return result;
  }, [activeCategory]);

  return (
    <div className="bg-transparent flex flex-col min-h-screen pt-2">
      {/* Header Area */}
      <div className="px-5 mb-5 flex items-center gap-3">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 shadow-sm shrink-0">
          <Star size={24} fill="currentColor" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Best Seller</h2>
          <p className="text-[13px] text-gray-500">Món ngon bán chạy nhất</p>
        </div>
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="w-[46px] h-[46px] bg-[#333] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
        >
          {viewMode === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
        </button>
      </div>

      {/* Categories */}
      <div className="px-5 mb-2">
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
          {mockCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "pb-1 text-[15px] font-medium whitespace-nowrap transition-all border-b-2",
                activeCategory === category 
                  ? "border-[#154e3d] text-[#154e3d]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("bg-[#daf0eb] flex-1 rounded-t-[32px] px-4 pb-40", viewMode === 'grid' ? "pt-6" : "pt-3")}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={viewMode === 'grid' ? "grid grid-cols-2 gap-3" : "flex flex-col"}
          >
            {bestSellers.map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                viewMode={viewMode}
                onClick={() => setSelectedProduct(product)}
                onAdd={() => handleAdd(product)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {items.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto z-20 px-4 flex justify-end">
          <button 
            onClick={() => navigate('/cart')}
            className="bg-[#599a8d] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 active:scale-[0.98] transition-transform"
          >
            <span className="font-medium text-[14px]">
              {items.reduce((a, b) => a + b.quantity, 0)} items • {items.reduce((a, b) => a + (b.price * b.quantity), 0).toLocaleString('vi-VN')}đ
            </span>
            <span className="font-medium text-[14px] text-mint-100 ml-1">
              → View Cart
            </span>
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};
