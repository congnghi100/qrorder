import { useState, useMemo } from 'react';
import { mockMenu, mockCategories } from '../mocks/menuData';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/Button';
import { Search, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MenuView = () => {
  const [activeCategory, setActiveCategory] = useState(mockCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredMenu = useMemo(() => {
    let result = activeCategory === 'All' 
      ? mockMenu 
      : mockMenu.filter(item => item.category === activeCategory);
      
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-transparent flex flex-col min-h-screen pt-2">
      {/* Search Bar */}
      <div className="px-5 mb-5 flex gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#eff1f0] border-none rounded-2xl pl-11 pr-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-500/50"
            placeholder="Search food, drinks..."
          />
        </div>
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="w-[46px] h-[46px] bg-[#333] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
        >
          {viewMode === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
        </button>
      </div>

      {/* Categories */}
      <div className="px-5">
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
            {filteredMenu.map(product => (
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
        <div className="fixed bottom-24 left-0 right-0 max-w-2xl mx-auto z-20 px-4 flex justify-end">
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
