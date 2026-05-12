# 🎨 Design System: QR Code Ordering App

Tài liệu này mô tả hệ thống thiết kế (Design System) cho ứng dụng đặt món qua mã QR, được phân tích dựa trên giao diện tham khảo chuẩn của dự án. Mục tiêu là mang lại trải nghiệm hiện đại, thanh lịch, tươi mát và thân thiện với người dùng di động.

## 1. Màu sắc (Color Palette)

Hệ thống sử dụng tông màu chủ đạo là **Xanh Bạc Hà (Mint Green)** kết hợp với các gam màu trung tính. Sự kết hợp này tạo ra cảm giác sạch sẽ, hữu cơ (organic) - rất phù hợp với ngành F&B, đồng thời làm nổi bật hình ảnh món ăn.

### Màu chủ đạo (Primary Colors)
- **Primary Mint (Action / Active):** `#539D8B` (Xanh bạc hà đậm) - Dùng cho các nút bấm chính (View Cart), trạng thái active, icon quan trọng.
- **Primary Light (Surface Highlight):** `#E4F5EF` (Xanh bạc hà nhạt) - Dùng làm màu nền cho khu vực danh sách món ăn, hoặc nền của các icon button để tạo sự phân cấp.

### Màu nền (Background Colors)
- **App Background:** `#F8F9FA` hoặc `#FAF9F6` (Trắng ngà / Off-white) - Dùng cho nền tổng thể của ứng dụng, giúp mắt đỡ mỏi hơn so với màu trắng tinh.
- **Card Background:** `#FFFFFF` (Trắng tinh) - Dùng cho nền của các thẻ món ăn (Product Cards) để làm nổi bật hình ảnh và text so với nền app.

### Màu văn bản (Typography Colors)
- **Text Primary:** `#1A1A1A` (Đen nhám) - Dùng cho Tiêu đề trang, Tên món ăn, và Giá tiền.
- **Text Secondary:** `#8E8E93` (Xám) - Dùng cho mô tả phụ, thời gian chuẩn bị món, đánh giá, và placeholder của thanh tìm kiếm.

---

## 2. Nghệ thuật chữ (Typography)

Sử dụng các font chữ không chân (Sans-serif) hiện đại, các nét cắt gọt gàng, bo tròn nhẹ để tạo sự thân thiện. Khuyến nghị sử dụng **Inter**, **SF Pro Display** (nếu trên iOS), hoặc **Outfit**.

- **Header / Page Titles:** Trọng lượng **Bold (700)**. Kích thước lớn (Size: ~24px - 28px). *Ví dụ: "Table 08 Ordering".*
- **Section / Card Titles:** Trọng lượng **Semi-Bold (600)** hoặc **Bold (700)**. Kích thước vừa (Size: ~16px). *Ví dụ: Tên món ăn.*
- **Body Text:** Trọng lượng **Regular (400)**. Kích thước nhỏ (Size: ~12px - 14px). *Ví dụ: "prep time".*
- **Prices (Giá tiền):** Trọng lượng **Heavy / Bold (700)**, lớn hơn body text một chút để dễ quét mắt (Size: ~16px - 18px).

---

## 3. Các thành phần giao diện (UI Components)

### 3.1. Thẻ món ăn (Product Cards)
- **Hình dạng:** Bo góc lớn, khoảng `16px` đến `24px` (`border-radius: 20px`).
- **Bố cục:** Dạng thẻ dọc. Hình ảnh sản phẩm chiếm 50% diện tích phía trên (bo góc khớp với thẻ). Thông tin chữ nằm ở nửa dưới.
- **Đổ bóng (Shadow):** Bóng râm rất nhẹ, mềm và phân tán rộng để tạo cảm giác thẻ đang nổi lên so với nền. *Ví dụ: `box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04)`.*
- **Nút Add (+):** Một nút hình vuông bo góc nhỏ đè lên phần thông tin góc phải, tạo điểm nhấn tương tác.

### 3.2. Nút bấm (Buttons)
- **Nút CTA Chính (Ví dụ: Thanh "View Cart" lơ lửng):** 
  - Hình dạng: **Pill-shape** (Bo góc tròn hoàn toàn 2 đầu, `border-radius: 9999px`).
  - Màu nền: Gradient hoặc Xanh Mint đậm (`#539D8B`), text màu trắng. Cấu trúc lơ lửng (Floating) ở dưới cùng màn hình (trên bottom nav).
- **Nút Icon phụ (Ví dụ: Nút giỏ hàng trên Header, Nút thêm món):**
  - Hình dạng: **Soft-square** (Vuông bo góc mềm mại, `border-radius: 12px` - `14px`).
  - Màu nền: Trắng (có shadow) hoặc Xanh Mint nhạt. Icon màu Xanh Mint đậm.

### 3.3. Thanh tìm kiếm (Search Bar)
- **Hình dạng:** Pill-shape (`border-radius: 9999px`). Đạt chiều cao chuẩn chạm ngón tay (~44px - 48px).
- **UI:** Màu nền xám nhạt (`#F0F2F5`), không có viền (borderless). Icon kính lúp và placeholder chữ màu xám nằm sát lề trái.

### 3.4. Hệ thống điều hướng (Navigation)
- **Category Tabs (Menu cuộn ngang: All, Breakfast...):**
  - Dạng danh sách text cuộn ngang không viền.
  - **Active:** Text màu Đen đậm. Điểm nhấn là một **đường gạch chân ngắn, dày, bo 2 đầu** màu Xanh Mint phía dưới text.
  - **Inactive:** Text màu Xám (`Text Secondary`).
- **Bottom Navigation Bar (Thanh điều hướng dưới cùng):**
  - Trắng trơn, đổ bóng lên phía trên để tách biệt khỏi nội dung.
  - Chứa Icon xếp trên Text.
  - **Active:** Icon và Text chuyển sang màu Xanh Mint chủ đạo.
  - **Inactive:** Trạng thái xám trơn.

---

## 4. Không gian & Bố cục (Spacing & Layout)

Hệ thống khoảng cách tuân thủ triệt để lưới **4px/8px** để tạo nhịp điệu thị giác nhất quán.

- **Padding hai bên màn hình (Screen Margin):** `16px` hoặc `20px` để chừa không gian "thở" cho các thẻ.
- **Khoảng cách giữa các thẻ (Grid Gap):** `16px` cho lưới (Grid) 2 cột.
- **Padding trong thẻ món ăn (Inner Card Padding):** Khoảng `12px` đến `16px`.
- **Khoảng cách giữa các khu vực (Section Spacing):** `24px` đến `32px` (từ Search bar xuống Categories, từ Categories xuống Main Content).
- **Khu vực Main Content:** Phần danh sách món ăn được nhóm lại trong một background riêng màu Mint nhạt (`#E4F5EF`), bo góc lớn ở hai cạnh trên, kéo dài xuống dưới. Điều này tạo hiệu ứng Layering (phân lớp) cực kỳ nịnh mắt.
