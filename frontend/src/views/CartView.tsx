import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, Receipt } from 'lucide-react';

export const CartView = () => {
  const { items, getTotalPrice, updateQuantity, clearCart, removeFromCart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();

  const handleOrder = () => {
    // In a real app, we would make an API call here.
    // For now, we simulate success and move to the order status view.
    placeOrder(items);
    clearCart();
    navigate('/orders');
  };

  const hasItems = items.length > 0;

  return (
    <div className="bg-transparent flex flex-col min-h-screen pt-2 pb-[220px]">
      <div className="px-5 pt-2 pb-2">
        {/* Header Area */}
        <div className="mb-2 flex items-center gap-3">
          <button 
            onClick={() => navigate('/menu')}
            className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-700 shadow-sm shrink-0 hover:bg-gray-50 transition-colors active:scale-95"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="flex-1">
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Giỏ hàng</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Kiểm tra lại các món đã chọn</p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 px-5 pt-2">
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="w-24 h-24 bg-mint-50 rounded-full flex items-center justify-center mb-6">
              <Receipt size={40} className="text-[#599a8d]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-8 max-w-[250px]">Bạn chưa chọn món nào. Hãy xem menu và chọn những món yêu thích nhé!</p>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-[#154e3d] text-white px-8 py-3.5 rounded-full font-medium shadow-md hover:bg-[#0f3d2f] active:scale-[0.98] transition-all"
            >
              Khám phá Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-[20px] flex gap-4 items-center shadow-sm border border-gray-50">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-[14px] overflow-hidden bg-gray-100 shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Receipt size={24} />
                    </div>
                  )}
                </div>

                {/* Product Info & Controls */}
                <div className="flex-1 flex flex-col h-full py-1">
                  <div className="flex justify-between items-start mb-auto">
                    <h3 className="font-bold text-[15px] text-gray-900 leading-tight pr-2">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-3">
                    <p className="text-gray-900 font-extrabold text-[15px]">
                      {item.price.toLocaleString('vi-VN')}
                      <span className="text-[12px] ml-0.5 font-bold">đ</span>
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} 
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-full text-gray-600 shadow-sm active:scale-95 transition-transform"
                      >
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="w-4 text-center font-bold text-[14px] text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="w-7 h-7 flex items-center justify-center bg-[#599a8d] rounded-full text-white shadow-sm active:scale-95 transition-transform"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Footer */}
      {hasItems && (
        <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-5 py-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
          <div className="flex justify-between items-center mb-5">
            <span className="text-gray-500 font-medium text-[15px]">Tổng cộng</span>
            <span className="text-2xl font-extrabold text-[#154e3d]">
              {getTotalPrice().toLocaleString('vi-VN')}
              <span className="text-[16px] ml-1">đ</span>
            </span>
          </div>
          <button 
            onClick={handleOrder}
            className="w-full bg-[#154e3d] text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg active:scale-[0.98] transition-transform flex justify-center items-center gap-2"
          >
            Tiến hành đặt món
          </button>
        </div>
      )}
    </div>
  );
};
