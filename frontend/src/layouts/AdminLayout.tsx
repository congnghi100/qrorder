import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, ClipboardList, Settings, Users } from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutGrid, label: 'Tổng quan' },
    { path: '/admin/tables', icon: Users, label: 'QL Bàn' },
    { path: '/admin/orders', icon: ClipboardList, label: 'Đơn hàng' },
    { path: '/admin/profile', icon: Settings, label: 'Tài khoản' },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 min-h-screen text-slate-900 pb-20 relative shadow-xl overflow-x-hidden">
      <Outlet />

      {/* Admin Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
