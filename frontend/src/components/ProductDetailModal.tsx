import { X, Plus, Minus, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductDetailModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [size, setSize] = useState('M');
  const [toppings, setToppings] = useState<string[]>([]);
  const addToCart = useCartStore(state => state.addToCart);

  // Cache product for exit animations
  const [cachedProduct, setCachedProduct] = useState(product);

  useEffect(() => {
    if (product) {
      setCachedProduct(product);
    }
  }, [product]);

  const displayProduct = product || cachedProduct;

  const handleAddToCart = () => {
    if (!displayProduct) return;
    addToCart({
      id: Date.now().toString(),
      productId: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price + (size === 'L' ? 10000 : 0) + (toppings.length * 10000),
      quantity,
      image: displayProduct.image,
      note: [
        `Size: ${size}`,
        toppings.length > 0 ? `Thêm: ${toppings.join(', ')}` : '',
        note ? `Ghi chú: ${note}` : ''
      ].filter(Boolean).join(' | ')
    });
    onClose();
    // Reset state for next time
    setTimeout(() => {
      setQuantity(1);
      setNote('');
      setSize('M');
      setToppings([]);
    }, 300);
  };

  const toggleTopping = (topping: string) => {
    setToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  if (!displayProduct) return null;

  const totalPrice = (displayProduct.price + (size === 'L' ? 10000 : 0) + (toppings.length * 10000)) * quantity;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {isOpen && (
        <motion.div 
          key="modal"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white rounded-t-[32px] z-[70] overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]"
        >
        
        {/* Fixed Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/30 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pb-40 no-scrollbar">
          {/* Header Image */}
          <div className="relative shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[220px] object-cover bg-gray-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-[24px] font-extrabold text-gray-900 leading-tight pr-4">{product.name}</h2>
              <p className="text-[#154e3d] font-extrabold text-[20px] whitespace-nowrap">
                {product.price.toLocaleString('vi-VN')}<span className="text-[14px] ml-0.5">đ</span>
              </p>
            </div>
            
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
              {product.description || 'Hương vị tuyệt hảo được chuẩn bị bằng công thức đặc biệt của nhà hàng, mang lại trải nghiệm khó quên.'}
            </p>

          {/* Size Selection */}
          <div className="mb-8">
            <label className="block text-[16px] font-bold text-gray-900 mb-3">Kích cỡ</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setSize('M')}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-[15px] transition-all border-2 ${size === 'M' ? 'border-[#154e3d] bg-[#daf0eb] text-[#154e3d]' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
              >
                Vừa
              </button>
              <button 
                onClick={() => setSize('L')}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl font-bold transition-all border-2 ${size === 'L' ? 'border-[#154e3d] bg-[#daf0eb] text-[#154e3d]' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
              >
                <span className="text-[15px]">Lớn</span>
                <span className="text-[12px] font-medium opacity-80">+10.000đ</span>
              </button>
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="mb-8">
            <label className="block text-[16px] font-bold text-gray-900 mb-3">Thêm Topping</label>
            <div className="space-y-3">
              {[
                { id: 'tranchau', name: 'Trân châu trắng', price: 10000 },
                { id: 'thach', name: 'Thạch trái cây', price: 10000 },
                { id: 'pudding', name: 'Pudding trứng', price: 10000 }
              ].map(topping => {
                const isActive = toppings.includes(topping.name);
                return (
                  <button 
                    key={topping.id}
                    onClick={() => toggleTopping(topping.name)}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-colors ${isActive ? 'border-[#154e3d] bg-[#daf0eb]' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className={`text-[15px] ${isActive ? 'text-[#154e3d] font-bold' : 'text-gray-700 font-medium'}`}>
                      {topping.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-[14px] ${isActive ? 'text-[#154e3d] font-medium' : 'text-gray-500'}`}>
                        +{topping.price.toLocaleString('vi-VN')}đ
                      </span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-[#154e3d] bg-[#154e3d]' : 'border-gray-300'}`}>
                        {isActive && <Check size={14} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-6">
            <label className="block text-[16px] font-bold text-gray-900 mb-3">Ghi chú thêm</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="VD: Ít đá, nhiều đường..."
              className="w-full bg-[#f8faf9] border border-gray-100 rounded-2xl p-4 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154e3d]/30 focus:border-[#154e3d]/50 resize-none h-28 transition-all"
            />
          </div>
        </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[16px] font-bold text-gray-900">Tổng cộng</span>
            <p className="text-[#154e3d] font-extrabold text-[22px]">
              {totalPrice.toLocaleString('vi-VN')}
              <span className="text-[14px] ml-0.5">đ</span>
            </p>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 bg-[#f8faf9] rounded-full px-2 py-2 border border-gray-100 shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-gray-600 shadow-sm active:scale-95 transition-transform"
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>
              <span className="w-6 text-center font-bold text-[18px] text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-[#599a8d] rounded-full text-white shadow-sm active:scale-95 transition-transform"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#154e3d] text-white py-4 rounded-full font-bold text-[16px] shadow-xl shadow-[#154e3d]/20 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>

          </motion.div>
      )}
    </AnimatePresence>
  );
};
