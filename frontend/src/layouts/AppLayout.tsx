import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, LayoutGrid, Star, ClipboardList, User } from 'lucide-react';
import { cn } from '../components/Button';
import { AnimatePresence, motion } from 'framer-motion';

export const AppLayout = () => {
  const { tableNo, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const currentOutlet = useOutlet();

  return (
    <div className="max-w-2xl mx-auto bg-[#f8faf9] min-h-screen relative shadow-xl overflow-x-hidden font-sans">
      {/* Header */}
      <header className="bg-[#f8faf9] px-5 pt-6 pb-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-[22px] font-bold tracking-tight text-gray-900">
          Table {tableNo || '08'} Ordering
        </h1>
        <button 
          onClick={() => navigate('/cart')}
          className="relative w-10 h-10 bg-[#e6f2ef] rounded-xl flex items-center justify-center text-mint-600 transition-transform active:scale-95"
        >
          <ShoppingCart size={20} strokeWidth={2.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-[80px] pb-4 px-2 z-50 rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <NavItem 
          icon={<LayoutGrid size={24} />} 
          label="Menu" 
          active={location.pathname === '/menu' || location.pathname === '/'} 
          onClick={() => navigate('/menu')}
        />
        <NavItem 
          icon={<Star size={24} />} 
          label="Best seller" 
          active={location.pathname === '/best-seller'} 
          onClick={() => navigate('/best-seller')}
        />
        <NavItem 
          icon={<ClipboardList size={24} />} 
          label="My Orders" 
          active={location.pathname === '/orders'} 
          onClick={() => navigate('/orders')}
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Profile" 
          active={location.pathname === '/profile'} 
          onClick={() => navigate('/profile')}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-16 gap-1 transition-colors",
        active ? "text-mint-600 font-medium" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <div className={cn("transition-transform duration-200", active && "scale-110")}>
        {icon}
      </div>
      <span className="text-[10px]">{label}</span>
    </button>
  );
};
