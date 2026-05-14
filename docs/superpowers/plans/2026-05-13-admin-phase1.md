# Kế hoạch Triển khai Admin Phase 1: Nền tảng & Dashboard

> **Dành cho agentic workers:** SUB-SKILL BẮT BUỘC: Sử dụng superpowers:subagent-driven-development (khuyên dùng) hoặc superpowers:executing-plans để triển khai plan này theo từng task. Các bước dùng cú pháp checkbox (`- [ ]`) để dễ theo dõi.

**Mục tiêu:** Xây dựng nền tảng Layout cho hệ thống Admin (Mobile-first, phong cách SaaS) cùng với màn hình Đăng nhập (Screen 6) và màn hình Dashboard (Screen 7).

**Kiến trúc:** Bổ sung các file vào thư mục `src/layouts` và `src/views/admin`. Cập nhật `src/App.tsx` để định tuyến các đường dẫn `/admin/*`. Sử dụng Tailwind CSS với tone màu Xám/Trắng/Xanh dương cho tính chuyên nghiệp.

**Tech Stack:** React, react-router-dom, framer-motion, lucide-react, Tailwind CSS.

---

### Task 1: Cập nhật App.tsx & Định tuyến

**Files:**
- Sửa: `/Users/nghikieu/dev/outsource/MiniAppPOS/frontend/src/App.tsx`

- [ ] **Bước 1: Import các View Admin (sẽ tạo ở các task sau)**
```tsx
import { AdminLayout } from './layouts/AdminLayout';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
```

- [ ] **Bước 2: Cập nhật AnimatedRoutes để hỗ trợ /admin**
Thêm Route `/admin` độc lập với hệ thống khách hàng:
```tsx
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginView />} />
        <Route 
          path="/admin"
          element={
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AdminLayout />
            </motion.div>
          }
        >
          <Route path="dashboard" element={<AdminDashboardView />} />
        </Route>
```

---

### Task 2: Tạo AdminLayout (Mobile-first)

**Files:**
- Tạo: `/Users/nghikieu/dev/outsource/MiniAppPOS/frontend/src/layouts/AdminLayout.tsx`

- [ ] **Bước 1: Triển khai AdminLayout**
```tsx
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
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      <Outlet />

      {/* Admin Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
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
```

---

### Task 3: Tạo Màn hình Login (AdminLoginView)

**Files:**
- Tạo thư mục: `/Users/nghikieu/dev/outsource/MiniAppPOS/frontend/src/views/admin`
- Tạo file: `/Users/nghikieu/dev/outsource/MiniAppPOS/frontend/src/views/admin/AdminLoginView.tsx`

- [ ] **Bước 1: Triển khai AdminLoginView**
```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';

export const AdminLoginView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login -> redirect to dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
          <Store className="h-8 w-8 text-white" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
          Đăng nhập Quản trị
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium leading-6 text-slate-900">
              Tên đăng nhập
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-slate-900">
              Mật khẩu
            </label>
            <div className="mt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

---

### Task 4: Tạo Màn hình Dashboard (AdminDashboardView)

**Files:**
- Tạo: `/Users/nghikieu/dev/outsource/MiniAppPOS/frontend/src/views/admin/AdminDashboardView.tsx`

- [ ] **Bước 1: Triển khai AdminDashboardView**
```tsx
import { Users, Armchair, CheckCircle2 } from 'lucide-react';

export const AdminDashboardView = () => {
  return (
    <div className="pt-6 px-5">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Tổng quan</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng số bàn</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">30</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Armchair size={16} />
            </div>
            <p className="text-xs font-medium text-slate-500">Đang dùng</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <p className="text-xs font-medium text-slate-500">Bàn trống</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">18</p>
        </div>
      </div>
      
      {/* Top Tables */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Bàn gọi món nhiều nhất</h3>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {[
          { name: 'Bàn 01', orders: 5, total: '1,250,000đ' },
          { name: 'Bàn 15', orders: 4, total: '890,000đ' },
          { name: 'Bàn 08', orders: 3, total: '650,000đ' },
        ].map((item, idx) => (
          <div key={item.name} className={`flex items-center justify-between p-4 ${idx !== 2 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                <p className="text-xs text-slate-500">{item.orders} đơn hàng</p>
              </div>
            </div>
            <p className="font-bold text-blue-600 text-sm">{item.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```
