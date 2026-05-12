# 🎨 Design Spec — UI States & Component Guide

## 1. Bắt Buộc Định Nghĩa 4 Trạng Thái

Mọi màn hình/component CÓ DATA phải có đủ 4 trạng thái:

| State | Icon | Mô tả | Ví dụ |
|-------|------|-------|-------|
| ⚪ Empty | 📭 | Chưa có dữ liệu | Illustration + "Chưa có khách hàng" + CTA "Thêm mới" |
| 🔄 Loading | ⏳ | Đang tải dữ liệu | Skeleton loader / Spinner |
| 🔴 Error | ❌ | Lỗi tải/xử lý | Thông báo lỗi + CTA "Thử lại" |
| 🟢 Ideal | ✅ | Hiển thị dữ liệu chính | Danh sách/bảng/thẻ hoàn chỉnh |

### Trạng thái bổ sung (cho form/action):
| State | Mô tả |
|-------|-------|
| 🟡 Validation Error | Inline error dưới field lỗi |
| ✅ Success | Toast/snackbar "Thành công" |
| ⏳ Submitting | Button loading, disable form |

## 2. Component Checklist Cho Mỗi Màn Hình

- [ ] **Header**: Logo/Title, Back button, Actions
- [ ] **Body**: Main content, Empty/Loading/Error states
- [ ] **Footer/Bottom Nav**: Navigation items, Action buttons
- [ ] **CTA chính**: Xác định Primary CTA là gì, vị trí ở đâu
- [ ] **CTA phụ**: Secondary actions (Cancel, Back, Skip...)

## 3. Form Component Checklist

- [ ] Label rõ ràng cho mỗi field
- [ ] Placeholder text gợi ý
- [ ] Required indicator (dấu *)
- [ ] Helper text bên dưới (nếu cần giải thích)
- [ ] Inline error message khi validation fail
- [ ] Max length indicator (nếu giới hạn)
- [ ] Disable submit khi form chưa valid
- [ ] Loading state khi submit

## 4. Copywriting (Microcopy) Patterns

| Element | Pattern | Ví dụ |
|---------|---------|-------|
| Page Title | Danh từ + động từ | "Quản lý Khách hàng" |
| Empty State | Mô tả + CTA | "Chưa có đơn hàng nào. Tạo đơn đầu tiên!" |
| Error | Lỗi cụ thể + Hướng dẫn | "Email không hợp lệ. Vui lòng nhập dạng abc@email.com" |
| Success Toast | Xác nhận hành động | "Đã tạo khách hàng thành công ✅" |
| Confirm Dialog | Câu hỏi + hậu quả | "Xóa khách hàng? Dữ liệu sẽ không thể khôi phục." |
| CTA Button | Động từ + danh từ | "Thêm khách hàng", "Lưu thay đổi", "Xác nhận thanh toán" |

## 5. Mobile-First Layout Patterns

| Pattern | Khi nào dùng |
|---------|-------------|
| Tab Bar (Bottom Nav) | Điều hướng chính (3-5 tabs) |
| Full-width Buttons | CTA chính trên mobile |
| Pull-to-refresh | Danh sách / News feed |
| Swipe actions | Nhanh: Xóa, Archive, Star |
| Bottom Sheet | Form ngắn, lựa chọn, confirm |
| Floating Action Button | Hành động tạo mới |

## 6. Edge Cases Phổ Biến

| Case | Xử lý UX |
|------|---------|
| Rớt mạng khi submit | Snackbar "Lỗi kết nối" + giữ data đã nhập |
| Text quá dài | Cắt bằng `...` + tooltip khi hover |
| Ảnh lỗi/không load | Placeholder image + icon broken |
| Session hết hạn | Redirect login + giữ URL hiện tại |
| Trùng dữ liệu | Inline error ngay tại field |
| Quá nhiều data | Pagination/Infinite scroll + filter |
