import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

import { WelcomeView } from './views/WelcomeView';
import { MenuView } from './views/MenuView';
import { CartView } from './views/CartView';

const OrderStatusView = () => (
  <div className="text-center mt-10">
    <div className="w-20 h-20 bg-mint-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-3xl">✅</span>
    </div>
    <h2 className="text-xl font-bold text-mint-500 mb-2">Đơn hàng đang xử lý</h2>
    <p className="text-text-secondary">Nhà bếp đang chuẩn bị món cho bạn.</p>
  </div>
);

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
