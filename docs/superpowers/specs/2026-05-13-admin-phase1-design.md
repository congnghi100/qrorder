# Admin App - Phase 1: Nền tảng & Dashboard
**Ngày:** 2026-05-13

## Tổng Quan
Thiết kế kiến trúc nền tảng và màn hình Dashboard dành riêng cho hệ thống Admin của MiniAppPOS theo phong cách Mobile-first, nhưng mang hơi hướng Clean & Minimalist (SaaS/Corporate) để đảm bảo tính chuyên nghiệp.

## Phạm vi (Scope)
- `<AdminLayout />`: Layout với Bottom Navigation Bar dành riêng cho Admin.
- `<AdminLoginView />`: Màn hình Đăng nhập quản trị viên (Screen 6).
- `<AdminDashboardView />`: Màn hình thống kê (Screen 7).

## Chi Tiết Kỹ Thuật

### 1. Kiến trúc Routing
Hệ thống Admin sẽ hoạt động dưới sub-path `/admin`.
- `/admin/login`: Không dùng AdminLayout.
- `/admin/dashboard`: Dùng AdminLayout.
- Các route khác trong tương lai (tables, orders, profile) cũng sẽ đặt dưới `/admin/*`.

### 2. UI/UX Guidelines (SaaS Style)
- **Màu sắc chủ đạo:** 
  - Nền: Xám nhạt (ví dụ: `#f8fafc` hoặc `bg-slate-50`).
  - Card/Bảng: Trắng tinh (`bg-white`) kèm theo border mỏng (`border-slate-200`) để tách biệt.
  - Chữ: Đen (`text-slate-900`) cho tiêu đề, xám đậm (`text-slate-500`) cho mô tả.
  - Điểm nhấn (Primary): Xanh dương đậm hoặc một tone màu trầm chuyên nghiệp (như `#0f172a` hoặc `#2563eb`).
- **Hình khối:** Ít dùng bo tròn lớn. Thường dùng `rounded-md` hoặc `rounded-lg` (khoảng 6px-8px). Bóng đổ nhỏ và sắc nét (`shadow-sm`).

### 3. Thành phần (Components)

#### 3.1. AdminLayout
- Render qua `Outlet` cho các trang con.
- **Bottom Tab Bar:** Nằm cố định ở dưới màn hình. Các icon đơn giản (stroke mỏng), chữ nhỏ, trạng thái active sẽ có màu Primary. Cấu trúc menu:
  - Dashboard (Home icon)
  - Quản lý Bàn (Grid icon)
  - Đơn hàng (ClipboardList icon)
  - Tài khoản/Cài đặt (User/Settings icon)

#### 3.2. AdminLoginView (Screen 6)
- **Bố cục:** Canh giữa màn hình (Center alignment).
- **Thành phần:**
  - Logo nhà hàng (hoặc logo MiniAppPOS) ở trên cùng.
  - Tiêu đề: "Đăng nhập Quản trị".
  - Input: Tên đăng nhập.
  - Input: Mật khẩu.
  - Nút Submit: Thiết kế dạng solid, màu Primary.
- **Logic:** Tạm thời sử dụng mock login. Khi bấm Submit sẽ chuyển hướng (`useNavigate`) thẳng đến `/admin/dashboard`.

#### 3.3. AdminDashboardView (Screen 7)
- **Bố cục:** Một list cuộn dọc.
- **Thành phần:**
  - Tiêu đề trang: "Tổng quan".
  - **Khu vực Stats (Grid 2 cột):**
    - Thẻ "Tổng số bàn": Hiển thị số tổng (vd: 30), icon bàn.
    - Thẻ "Bàn đang dùng": (vd: 12), màu cảnh báo/nhấn mạnh nhẹ.
    - Thẻ "Bàn trống": (vd: 18), màu xanh lá nhạt/hiền hòa.
  - **Khu vực Top Bàn Order:**
    - Tiêu đề section: "Bàn gọi món nhiều nhất".
    - Danh sách dạng List View (ví dụ: Bàn 01 - 5 đơn, Bàn 05 - 3 đơn).

## Kế Hoạch Test (Tự kiểm tra)
- Truy cập `/admin/login` -> Đăng nhập thành công -> Chuyển sang `/admin/dashboard`.
- Tại `/admin/dashboard`, kiểm tra Bottom Tab Bar xem có đúng phong cách SaaS (minimalist, không quá màu mè) không.
- Thử nghiệm trên mobile view để đảm bảo các thẻ số liệu không bị tràn màn hình.
