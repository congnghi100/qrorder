# Kế hoạch Triển khai Frontend Phase 1 (Customer App)

> **Dành cho agentic workers:** SUB-SKILL BẮT BUỘC: Sử dụng superpowers:subagent-driven-development (khuyên dùng) hoặc superpowers:executing-plans để triển khai plan này theo từng task. Các bước dùng cú pháp checkbox (`- [ ]`) để dễ theo dõi.

**Mục tiêu:** Xây dựng ứng dụng Frontend cho luồng đặt món của khách hàng (Screens 1-5) bằng React, Vite, TailwindCSS và Zustand.

**Kiến trúc:** Khởi tạo dự án Vite, thiết lập routing với React Router, cấu hình Zustand cho state management. Xây dựng các UI component dùng chung và ráp thành 5 màn hình chính. Dữ liệu sử dụng mock.

**Tech Stack:** React, Vite, TailwindCSS, Zustand, React Router DOM v6, Lucide React.

---

### Task 1: Khởi tạo Project và Cài đặt thư viện

**Files:**
- Tạo: `package.json`, `vite.config.ts`, `tailwind.config.js`, `index.css`
- Xoá: Các file CSS mặc định không cần thiết.

- [ ] **Bước 1: Chạy lệnh khởi tạo Vite project**
```bash
npx -y create-vite@latest frontend --template react-ts
```

- [ ] **Bước 2: Cài đặt TailwindCSS và các thư viện cần thiết**
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx -y tailwindcss init -p
npm install react-router-dom zustand lucide-react clsx tailwind-merge
```

- [ ] **Bước 3: Cấu hình TailwindCSS**
Sửa `frontend/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          500: '#539D8B', // Primary brand color
          600: '#427D6F',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
        }
      },
      borderRadius: {
        'xl': '20px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
```

- [ ] **Bước 4: Thiết lập CSS Tokens cơ bản**
Sửa `frontend/src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary antialiased;
  }
}
```

- [ ] **Bước 5: Commit**
```bash
git add .
git commit -m "chore: init vite project with react, tailwind, zustand, router"
```

### Task 2: Cấu trúc Store (Zustand) và Mocks

**Files:**
- Tạo: `frontend/src/store/useCartStore.ts`
- Tạo: `frontend/src/mocks/menuData.ts`

- [ ] **Bước 1: Viết Mock Data**
```typescript
// frontend/src/mocks/menuData.ts
export const mockMenu = [
  { id: '1', name: 'Cà phê sữa đá', price: 29000, category: 'Coffee', image: 'https://placehold.co/100x100?text=Coffee' },
  { id: '2', name: 'Trà đào cam sả', price: 35000, category: 'Tea', image: 'https://placehold.co/100x100?text=Tea' }
];

export const mockCategories = ['Coffee', 'Tea', 'Snacks'];
```

- [ ] **Bước 2: Viết Zustand Store cho Giỏ hàng**
```typescript
// frontend/src/store/useCartStore.ts
import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
}

interface CartState {
  sessionId: string;
  tableNo: string;
  items: CartItem[];
  setSession: (sessionId: string, tableNo: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  sessionId: '',
  tableNo: '',
  items: [],
  setSession: (sessionId, tableNo) => set({ sessionId, tableNo }),
  addToCart: (item) => set((state) => {
    const existing = state.items.find(i => i.productId === item.productId);
    if (existing) {
      return { items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i) };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity === 0 ? state.items.filter(i => i.id !== id) : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
  clearCart: () => set({ items: [] }),
}));
```

- [ ] **Bước 3: Commit**
```bash
git add frontend/src/store/ frontend/src/mocks/
git commit -m "feat: setup zustand cart store and mock data"
```

### Task 3: Xây dựng UI Components dùng chung

**Files:**
- Tạo: `frontend/src/components/Button.tsx`
- Tạo: `frontend/src/components/ProductCard.tsx`

- [ ] **Bước 1: Component Button**
```tsx
// frontend/src/components/Button.tsx
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-mint-500 text-white hover:bg-mint-600 rounded-pill shadow-md",
    outline: "border border-mint-500 text-mint-500 hover:bg-mint-50 rounded-pill",
    ghost: "hover:bg-gray-100 text-text-secondary rounded-lg"
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  };

  return (
    <button className={cn(baseStyle, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
```

- [ ] **Bước 2: Component ProductCard**
```tsx
// frontend/src/components/ProductCard.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 flex gap-3 items-center border border-gray-100">
      <img src={image} alt={name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
      <div className="flex-1">
        <h3 className="font-medium text-text-primary">{name}</h3>
        <p className="text-mint-500 font-semibold mt-1">{price.toLocaleString('vi-VN')} đ</p>
      </div>
      <Button variant="primary" size="sm" onClick={onAdd} className="!px-3 !rounded-lg">
        <Plus size={18} />
      </Button>
    </div>
  );
};
```

- [ ] **Bước 3: Commit**
```bash
git add frontend/src/components/
git commit -m "feat: add Button and ProductCard components"
```

### Task 4: Setup Routing và Layout

**Files:**
- Sửa: `frontend/src/App.tsx`
- Sửa: `frontend/src/main.tsx`
- Tạo: `frontend/src/layouts/AppLayout.tsx`

- [ ] **Bước 1: Viết AppLayout**
```tsx
// frontend/src/layouts/AppLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export const AppLayout = () => {
  const { tableNo, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative pb-20 shadow-xl overflow-hidden">
      <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="font-semibold">Bàn: {tableNo || '---'}</div>
        <div className="relative">
          <ShoppingCart className="text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
```

- [ ] **Bước 2: Cấu hình Router trong App.tsx**
```tsx
// frontend/src/App.tsx
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
```

- [ ] **Bước 3: Update main.tsx**
```tsx
// frontend/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Bước 4: Commit**
```bash
git add frontend/src/App.tsx frontend/src/main.tsx frontend/src/layouts/
git commit -m "feat: setup react router and layout"
```

### Task 5: Triển khai 5 màn hình cơ bản

**Files:**
- Tạo: `frontend/src/views/WelcomeView.tsx`
- Tạo: `frontend/src/views/MenuView.tsx`
- Tạo: `frontend/src/views/CartView.tsx`

- [ ] **Bước 1: Welcome View (Screen 1)**
```tsx
// frontend/src/views/WelcomeView.tsx
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';

export const WelcomeView = () => {
  const navigate = useNavigate();
  const setSession = useCartStore(state => state.setSession);

  const handleStart = () => {
    // Giả lập quét QR được bàn số 5
    setSession('session-123', '05');
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <div className="w-24 h-24 bg-mint-50 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">👋</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Chào mừng bạn!</h1>
      <p className="text-text-secondary mb-8">Vui lòng xác nhận bàn để bắt đầu gọi món</p>
      <div className="bg-gray-50 p-4 rounded-xl w-full mb-8">
        <p className="text-sm text-gray-500">Bàn của bạn</p>
        <p className="text-3xl font-bold text-mint-500">Số 05</p>
      </div>
      <Button className="w-full" size="lg" onClick={handleStart}>Bắt đầu gọi món</Button>
    </div>
  );
};
```

- [ ] **Bước 2: Menu View (Screen 2 & 3)**
```tsx
// frontend/src/views/MenuView.tsx
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
```

- [ ] **Bước 3: Cart View (Screen 4) & Order Status (Screen 5)**
```tsx
// frontend/src/views/CartView.tsx
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
```

- [ ] **Bước 4: Update App.tsx với các Views thật**
```tsx
// frontend/src/App.tsx
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
```

- [ ] **Bước 5: Commit**
```bash
git add frontend/src/views/ frontend/src/App.tsx
git commit -m "feat: implement phase 1 screens 1-5"
```
