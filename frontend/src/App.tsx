import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Placeholder cho các views
const WelcomeView = () => <div>Welcome View</div>;
const MenuView = () => <div>Menu View</div>;
const CartView = () => <div>Cart View</div>;
const OrderStatusView = () => <div>Order Status View</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route element={<AppLayout />}>
          <Route path="/menu" element={<MenuView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/order-status" element={<OrderStatusView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
