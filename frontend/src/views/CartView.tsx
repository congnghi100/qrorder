import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const CartView = () => {
  const { items, getTotalPrice, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleOrder = () => {
    alert('Đặt món thành công! Giả lập chuyển sang màn hình trạng thái.');
    clearCart();
    navigate('/order-status');
  };

  if (items.length === 0) return <div className="text-center mt-10">Giỏ hàng trống</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Giỏ hàng</h2>
      {items.map(item => (
        <div key={item.id} className="bg-white p-3 rounded-xl flex justify-between items-center border border-gray-100">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-mint-500 font-semibold">{item.price.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">-</button>
            <span className="w-4 text-center font-medium">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">+</button>
          </div>
        </div>
      ))}
      <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-lg mt-6">
        <span>Tổng cộng:</span>
        <span className="text-mint-500">{getTotalPrice().toLocaleString('vi-VN')} đ</span>
      </div>
      <Button className="w-full mt-4" size="lg" onClick={handleOrder}>Tiến hành đặt món</Button>
    </div>
  );
};
