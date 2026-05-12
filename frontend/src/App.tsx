import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

import { WelcomeView } from './views/WelcomeView';
import { MenuView } from './views/MenuView';
import { CartView } from './views/CartView';
import { OrdersView } from './views/OrdersView';
import { BestSellerView } from './views/BestSellerView';
import { ProfileView } from './views/ProfileView';

import { CheckCircle2, Home } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const OrderStatusView = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-[#daf0eb] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle2 size={48} className="text-[#154e3d]" />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Đơn hàng đang xử lý</h2>
      <p className="text-gray-500 mb-8 max-w-[280px]">Nhà bếp đã nhận được đơn hàng và đang chuẩn bị món cho bạn.</p>
      
      <button 
        onClick={() => navigate('/menu')}
        className="flex items-center gap-2 text-[#599a8d] font-medium hover:text-[#154e3d] transition-colors"
      >
        <Home size={18} />
        <span>Về trang chủ</span>
      </button>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isWelcome = location.pathname === '/';

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={isWelcome ? 'welcome' : 'app'}>
        <Route 
          path="/" 
          element={
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <WelcomeView />
            </motion.div>
          } 
        />
        <Route 
          element={
            <motion.div
              key="app"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AppLayout />
            </motion.div>
          }
        >
          <Route path="/menu" element={<MenuView />} />
          <Route path="/best-seller" element={<BestSellerView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/orders" element={<OrdersView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/order-status" element={<OrderStatusView />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

export default App;
