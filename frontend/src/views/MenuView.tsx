import { mockMenu } from '../mocks/menuData';
import { ProductCard } from '../components/ProductCard';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export const MenuView = () => {
  const addToCart = useCartStore(state => state.addToCart);
  const items = useCartStore(state => state.items);
  const navigate = useNavigate();

  const handleAdd = (product: any) => {
    addToCart({
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-bold">Thực đơn</h2>
      <div className="grid grid-cols-1 gap-3">
        {mockMenu.map(product => (
          <ProductCard 
            key={product.id}
            {...product}
            onAdd={() => handleAdd(product)}
          />
        ))}
      </div>
      
      {items.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-20">
          <button 
            onClick={() => navigate('/cart')}
            className="w-full bg-mint-500 text-white p-4 rounded-xl shadow-lg flex justify-between items-center"
          >
            <span>{items.reduce((a, b) => a + b.quantity, 0)} món</span>
            <span className="font-bold">Xem giỏ hàng</span>
          </button>
        </div>
      )}
    </div>
  );
};
