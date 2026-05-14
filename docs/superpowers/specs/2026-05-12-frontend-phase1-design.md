# Design Specification: Frontend Phase 1 (Customer App)

## 1. Mục tiêu (Objective)
Xây dựng giao diện Frontend (Mini App) hoàn chỉnh cho luồng trải nghiệm của khách hàng (Customer App) từ lúc quét mã QR đến khi đặt món thành công. Hệ thống bám sát `DESIGN_SYSTEM.md` đã chốt và đáp ứng danh sách tính năng màn hình (1-5) từ PRD.

## 2. Phạm vi (Scope)
Phase 1 bao gồm 5 màn hình chính:
1. **Screen 1 (Welcome):** Khởi tạo phiên, xác nhận số bàn.
2. **Screen 2 (Menu):** Hiển thị danh mục, danh sách món ăn, tìm kiếm.
3. **Screen 3 (Chi tiết & Modifier):** Bottom Sheet chọn tùy chọn món ăn, ghi chú.
4. **Screen 4 (Giỏ hàng):** Quản lý món đã chọn, tính tổng tiền, nút gửi đơn.
5. **Screen 5 (Trạng thái Order):** Timeline trạng thái xử lý của đơn hàng.

## 3. Tech Stack
- **Framework:** React + Vite (Khởi tạo nhanh, HMR tốt, build tĩnh cho SPA).
- **Styling:** TailwindCSS (Mapping toàn bộ design tokens từ Design System).
- **State Management:** Zustand (Quản lý trạng thái Global cho Giỏ hàng, Phiên bàn).
- **Routing:** React Router DOM v6.
- **Icons:** Lucide React hoặc Heroicons (Tương đồng với phong cách thiết kế).

## 4. Kiến trúc Thành phần (Component Architecture)

### 4.1. Core Layouts
- `AppLayout`: Layout vỏ bao bọc gồm Header (hiển thị số bàn, nút cart) và Bottom Navigation.
- `PageWrapper`: Cung cấp Animation chuyển trang mượt mà (sử dụng Framer Motion nếu cần, hoặc CSS Transitions cơ bản).

### 4.2. UI Components (Shared)
- `Button`: Hỗ trợ biến thể `primary` (Pill-shape, Mint background) và `icon` (Soft-square).
- `ProductCard`: Thành phần hiển thị món ăn chuẩn (Bo góc 20px, Shadow mềm).
- `FloatingCartBar`: Thanh trạng thái giỏ hàng trượt nổi ở đáy màn hình.
- `CategoryTabs`: Menu ngang cuộn được với trạng thái gạch chân Mint khi active.
- `BottomSheet`: Thành phần UI trượt từ dưới lên cho Screen 3.

### 4.3. Views (Pages)
- `WelcomeView`
- `MenuView`
- `CartView`
- `OrderStatusView`

## 5. Quản lý Trạng thái (State Management - Zustand)

Cấu trúc Store (Mock):
```typescript
interface CartState {
  sessionId: string;
  tableNo: string;
  items: CartItem[];
  addToCart: (item: MenuItem, modifiers: Modifier[], quantity: number, note: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}
```

## 6. Luồng Dữ liệu (Data Flow & Mocks)
- Vì backend (LS Central API) chưa hoàn thiện, ứng dụng sẽ fetch dữ liệu mô phỏng từ `/src/mocks/db.json`.
- Các hàm service (ví dụ: `api.getMenu()`, `api.submitOrder()`) sẽ dùng `setTimeout` để giả lập network delay trước khi trả về dữ liệu tĩnh.

## 7. Rủi ro & Đánh đổi (Risks & Trade-offs)
- **Rủi ro:** Ứng dụng SPA nếu phình to có thể làm chậm quá trình load trang ban đầu (JS Bundle lớn).
- **Khắc phục:** React Lazy Loading theo cấp độ route (Code Splitting). NFR yêu cầu load trang dưới 2s sẽ được đảm bảo bằng bundle size nhỏ gọn của Vite.

## 8. Kế hoạch Kiểm thử (Testing)
- Không yêu cầu Automated Testing nghiêm ngặt trong Phase 1.
- Kiểm thử thủ công UI/UX trên các độ phân giải: Mobile (375px, 390px, 430px) và kiểm tra tương thích trên iOS Safari & Android Chrome.
