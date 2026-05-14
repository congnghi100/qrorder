# Kế hoạch Triển khai Core UI và Order Context

> **Dành cho agentic workers:** SUB-SKILL BẮT BUỘC: Sử dụng superpowers:subagent-driven-development (khuyên dùng) hoặc superpowers:executing-plans để triển khai plan này theo từng task. Các bước dùng cú pháp checkbox (`- [ ]`) để dễ theo dõi.

**Mục tiêu:** Xây dựng phần Frontend (Mini App) của MiniAppPOS bao gồm quản lý trạng thái giỏ hàng (Order Context) và các màn hình chính (Welcome, Menu, Modifier, Order Status) cùng với tích hợp API Middleware.

**Kiến trúc:** Mini App sử dụng React, Vite, React Router DOM. Trạng thái toàn cục của giỏ hàng được quản lý qua React Context API. Giao tiếp với API Gateway (Middleware) qua Axios.

**Tech Stack:** React, Vite, React Router DOM, Axios, CSS (Glassmorphism & Gold Accent Theme).

---

### Task 1: Xây dựng OrderContext.jsx

**Files:**
- Tạo: `apps/web-app/src/context/OrderContext.jsx`
- Tạo: `apps/web-app/src/context/OrderContext.test.jsx` (Dùng Vitest/React Testing Library - setup tối thiểu để verify state)

- [ ] **Bước 1: Viết failing test**

```jsx
// apps/web-app/src/context/OrderContext.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderProvider, useOrder } from './OrderContext';
import React from 'react';

const TestComponent = () => {
  const { cart, addToCart } = useOrder();
  return (
    <div>
      <span data-testid="cart-count">{cart.length}</span>
      <button onClick={() => addToCart({ id: 'item1', name: 'Coffee', price: 50000, quantity: 1 })}>Add</button>
    </div>
  );
};

describe('OrderContext', () => {
  it('should initialize empty cart and add items', () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>
    );
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });
});
```

- [ ] **Bước 2: Chạy test để xác minh nó fail**

Chạy: `npm run test -- --run apps/web-app/src/context/OrderContext.test.jsx` (giả sử có cấu hình vitest, nếu chưa, test thủ công qua console log hoặc tạo file mock tạm thời - ở đây ta sẽ mô phỏng việc fail do chưa có context). *Nếu chưa cài vitest, skip bước test tự động và thay bằng test thủ công render ra UI.*
Mong đợi: Lỗi "useOrder must be used within an OrderProvider" hoặc tương tự.

- [ ] **Bước 3: Viết triển khai tối thiểu**

```jsx
// apps/web-app/src/context/OrderContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext();

const initialState = {
  cart: [],
  session: null,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += action.payload.quantity;
        return { ...state, cart: newCart };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const setSession = (session) => dispatch({ type: 'SET_SESSION', payload: session });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <OrderContext.Provider value={{ ...state, addToCart, setSession, clearCart }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
}
```

- [ ] **Bước 4: Cập nhật main.jsx để bao bọc App bằng OrderProvider**

```jsx
// Sửa apps/web-app/src/main.jsx
// Thêm import { OrderProvider } from './context/OrderContext';
// Bọc <App /> bằng <OrderProvider>
```

- [ ] **Bước 5: Commit**

```bash
git add apps/web-app/src/context/OrderContext.jsx apps/web-app/src/context/OrderContext.test.jsx apps/web-app/src/main.jsx
git commit -m "feat(web): implement OrderContext for cart state management"
```

---

### Task 2: Triển khai màn hình Welcome Screen

**Files:**
- Tạo: `apps/web-app/src/pages/Welcome.jsx`
- Sửa: `apps/web-app/src/App.jsx`

- [ ] **Bước 1: Viết mã nguồn cho Welcome.jsx (Có chức năng nhập OTP)**

```jsx
// apps/web-app/src/pages/Welcome.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import api from '../services/api';

export default function Welcome() {
  const [searchParams] = useSearchParams();
  const tableNo = searchParams.get('table');
  const navigate = useNavigate();
  const { setSession } = useOrder();
  
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!tableNo) {
      setError('Vui lòng quét mã QR tại bàn.');
    }
  }, [tableNo]);

  const handleStart = () => {
    setShowOtp(true);
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) return;
    try {
      setLoading(true);
      // Giả sử API check OTP sẽ được thêm vào payload
      const res = await api.post('/session/start', { tableNo, otp: otpCode });
      setSession(res.data.data);
      navigate('/menu');
    } catch (err) {
      setError('Mã OTP không hợp lệ hoặc lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Chào mừng quý khách</h1>
      {tableNo && <h2>Bàn: {tableNo}</h2>}
      
      {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
      
      {!showOtp ? (
        <button className="btn btn-primary" onClick={handleStart} style={{ marginTop: '2rem' }}>
          Bắt đầu gọi món
        </button>
      ) : (
        <div className="card glass-panel" style={{ marginTop: '2rem', padding: '2rem', width: '100%', maxWidth: '300px' }}>
          <h3>Nhập mã OTP</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Vui lòng nhập mã PIN do nhân viên cung cấp</p>
          <input 
            type="text" 
            className="input" 
            placeholder="Ví dụ: 1234" 
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            style={{ margin: '1rem 0', textAlign: 'center', letterSpacing: '0.2rem', fontSize: '1.2rem' }}
          />
          <button className="btn btn-primary" onClick={handleVerifyOtp} disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Đang xác thực...' : 'Xác nhận'}
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Bước 2: Cập nhật App.jsx với Routes**

```jsx
// apps/web-app/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* Các route khác sẽ thêm sau */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Bước 3: Chạy và kiểm tra thủ công**

Chạy: Mở trình duyệt `http://localhost:5176/welcome?table=10`
Mong đợi: Thấy thông báo chào mừng Bàn 10, bấm "Bắt đầu gọi món" chuyển hướng (có thể báo lỗi route chưa có nhưng không lỗi gọi API).

- [ ] **Bước 4: Commit**

```bash
git add apps/web-app/src/pages/Welcome.jsx apps/web-app/src/App.jsx
git commit -m "feat(web): add Welcome screen and table check-in logic"
```

---

### Task 3: Triển khai màn hình Menu

**Files:**
- Tạo: `apps/web-app/src/pages/Menu.jsx`
- Tạo: `apps/web-app/src/components/MenuItem.jsx`
- Sửa: `apps/web-app/src/App.jsx`

- [ ] **Bước 1: Tạo component MenuItem**

```jsx
// apps/web-app/src/components/MenuItem.jsx
import React from 'react';

export default function MenuItem({ item, onClick }) {
  return (
    <div className="card" onClick={() => onClick(item)} style={{ cursor: 'pointer', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h3>{item.name}</h3>
        <p>{item.price.toLocaleString('vi-VN')} ₫</p>
      </div>
      <div>
        {/* Placeholder image or icon */}
        <div style={{ width: '60px', height: '60px', backgroundColor: '#333', borderRadius: '8px' }}></div>
      </div>
    </div>
  );
}
```

- [ ] **Bước 2: Triển khai Menu.jsx**

```jsx
// apps/web-app/src/pages/Menu.jsx
import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import MenuItem from '../components/MenuItem';
import { useNavigate } from 'react-router-dom';

const mockMenu = [
  { id: '1', name: 'Cà phê đen', price: 30000, category: 'Drinks' },
  { id: '2', name: 'Trà sen vàng', price: 45000, category: 'Drinks' },
  { id: '3', name: 'Bánh sừng trâu', price: 25000, category: 'Food' },
];

export default function Menu() {
  const { cart, session } = useOrder();
  const navigate = useNavigate();
  // Ở đây có thể tích hợp Modal chọn món sau. Tạm thời add luôn.
  const { addToCart } = useOrder();

  const handleItemClick = (item) => {
    addToCart({ ...item, quantity: 1 });
    // Nếu có modifier sẽ mở Modal (Task sau).
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        <h2 style={{ margin: 0 }}>Thực đơn</h2>
        {session?.tableNo && <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>Bàn {session.tableNo}</span>}
      </div>
      
      <div className="menu-list">
        {mockMenu.map(item => (
          <MenuItem key={item.id} item={item} onClick={handleItemClick} />
        ))}
      </div>

      {totalItems > 0 && (
        <div 
          className="card glass-panel" 
          style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/status')}
        >
          <span>Giỏ hàng: {totalItems} món</span>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Xem & Đặt</button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Bước 3: Cập nhật Router trong App.jsx**

```jsx
// Thêm route cho Menu trong apps/web-app/src/App.jsx
// <Route path="/menu" element={<Menu />} />
```

- [ ] **Bước 4: Kiểm tra thủ công**

Chạy: Bấm thử các item, xem bottom bar hiện lên.
Mong đợi: Bottom bar cập nhật đúng số lượng.

- [ ] **Bước 5: Commit**

```bash
git add apps/web-app/src/pages/Menu.jsx apps/web-app/src/components/MenuItem.jsx apps/web-app/src/App.jsx
git commit -m "feat(web): implement Menu layout and cart summary"
```

---

### Task 4: Triển khai Modifier Modal

**Files:**
- Tạo: `apps/web-app/src/components/ModifierModal.jsx`
- Sửa: `apps/web-app/src/pages/Menu.jsx`

- [ ] **Bước 1: Tạo ModifierModal**

```jsx
// apps/web-app/src/components/ModifierModal.jsx
import React, { useState } from 'react';

export default function ModifierModal({ item, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!item) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' }}>
      <div className="glass-panel" style={{ width: '100%', padding: '2rem', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', animation: 'slideUp 0.3s ease-out' }}>
        <h3>{item.name}</h3>
        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.price.toLocaleString('vi-VN')} ₫</p>
        
        <div style={{ margin: '1rem 0' }}>
          <label>Số lượng:</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
            <button className="btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span style={{ fontSize: '1.2rem' }}>{quantity}</span>
            <button className="btn" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <label>Ghi chú:</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ít đá, nhiều đường..." 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn" style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--color-text)' }} onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => onConfirm({ ...item, quantity, note })}>Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Bước 2: Tích hợp vào Menu.jsx**

```jsx
// Sửa apps/web-app/src/pages/Menu.jsx để gọi Modal thay vì add trực tiếp
// 1. import ModifierModal
// 2. State: const [selectedItem, setSelectedItem] = useState(null);
// 3. handleItemClick => setSelectedItem(item);
// 4. Modal onConfirm => addToCart(payload); setSelectedItem(null);
```

- [ ] **Bước 3: Commit**

```bash
git add apps/web-app/src/components/ModifierModal.jsx apps/web-app/src/pages/Menu.jsx
git commit -m "feat(web): add ModifierModal for item customization"
```

---

### Task 5: Triển khai Order Status Screen (Cart & Submit)

**Files:**
- Tạo: `apps/web-app/src/pages/OrderStatus.jsx`
- Sửa: `apps/web-app/src/App.jsx`

- [ ] **Bước 1: Tạo OrderStatus.jsx**

```jsx
// apps/web-app/src/pages/OrderStatus.jsx
import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function OrderStatus() {
  const { cart, session, clearCart } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async () => {
    if (!session || cart.length === 0) return;
    try {
      setLoading(true);
      await api.post('/order/submit', {
        lsSessionId: session.lsSessionId,
        items: cart
      });
      setSuccessMsg('Gửi order thành công!');
      clearCart();
      setTimeout(() => navigate('/menu'), 3000);
    } catch (err) {
      alert('Lỗi khi gửi order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        <h2 style={{ margin: 0 }}>Xác nhận Order</h2>
        {session?.tableNo && <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>Bàn {session.tableNo}</span>}
      </div>
      
      {successMsg ? (
        <div className="card glass-panel" style={{ borderColor: 'var(--color-primary)' }}>
          <h3 style={{ color: 'var(--color-primary)', textAlign: 'center' }}>{successMsg}</h3>
          <p style={{ textAlign: 'center' }}>Hệ thống sẽ chuyển về Menu trong giây lát...</p>
        </div>
      ) : (
        <>
          <div className="card">
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '0.5rem 0' }}>
                <div>
                  <h4>{item.quantity}x {item.name}</h4>
                  {item.note && <small style={{ color: 'var(--color-text-muted)' }}>Ghi chú: {item.note}</small>}
                </div>
                <span>{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--color-primary)' }}>{totalAmount.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button className="btn" style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--color-text)' }} onClick={() => navigate('/menu')}>Quay lại</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleSubmit} disabled={loading || cart.length === 0}>
              {loading ? 'Đang xử lý...' : 'Gửi Order Bếp'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Bước 2: Cập nhật Router**

```jsx
// Thêm route cho OrderStatus trong apps/web-app/src/App.jsx
// <Route path="/status" element={<OrderStatus />} />
```

- [ ] **Bước 3: Kiểm tra Flow**

Chạy: Thử thêm món, bấm Xem & Đặt, bấm Gửi Order Bếp.
Mong đợi: API call `/order/submit` chạy (gọi đến Middleware port 5110). Thông báo thành công và xóa giỏ hàng.

- [ ] **Bước 4: Commit**

```bash
git add apps/web-app/src/pages/OrderStatus.jsx apps/web-app/src/App.jsx
git commit -m "feat(web): implement Order Status screen and API submit logic"
```

---
