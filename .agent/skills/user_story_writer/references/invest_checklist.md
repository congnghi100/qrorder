# 📖 User Story — INVEST Checklist & AC Guide

## 1. INVEST Framework

| Chữ | Tiêu chí | Câu hỏi kiểm tra | Fail? |
|-----|---------|------------------|-------|
| I | Independent | US này có phụ thuộc US khác? | Split/Reorder |
| N | Negotiable | Scope có thể thương lượng? | Làm rõ constraint |
| V | Valuable | Mang lại giá trị gì cho user? | Viết lại "So that" |
| E | Estimable | Team ước lượng được effort? | Thêm info / spike |
| S | Small | Hoàn thành trong 1 sprint? | Split nhỏ hơn |
| T | Testable | Có AC rõ ràng để test? | Viết AC cụ thể hơn |

## 2. Story Point (Fibonacci)

| SP | Mô tả | Ví dụ |
|----|-------|-------|
| 1 | Rất nhỏ, gần như chỉ config | Đổi label, thêm tooltip |
| 2 | Nhỏ, logic đơn giản | Thêm 1 field vào form |
| 3 | Trung bình, có validation | CRUD cơ bản cho 1 entity |
| 5 | Lớn hơn, nhiều edge cases | Search + filter + pagination |
| 8 | Lớn, nên xem xét split | Module hoàn chỉnh |
| 13 | Quá lớn → BẮT BUỘC split | Epic-level, không phải story |

## 3. AC Format (Given-When-Then)

```
✅ TỐT:
Given tôi đang ở trang Contacts với quyền Staff
When  tôi click "Thêm mới", nhập "Nguyễn A" vào Họ tên, click "Lưu"
Then  contact được tạo, toast "Tạo thành công" hiện 3 giây, danh sách refresh

❌ XẤU:
"Tạo contact thành công"
→ Mơ hồ, không test được, không rõ precondition
```

## 4. AC Coverage Tối Thiểu

| Loại | Số lượng tối thiểu | Bắt buộc? |
|------|-------------------|-----------|
| ✅ Happy Path | 2-3 | 🔴 Must |
| ❌ Negative / Error | 1-2 | 🔴 Must |
| ⚠️ Edge Case | 1 | 🟡 Should |

## 5. MoSCoW Priority

| Level | Ý nghĩa | % Capacity |
|-------|---------|-----------|
| 🔴 Must | Bắt buộc | 60% |
| 🟡 Should | Quan trọng, có workaround | 20% |
| 🟢 Could | Nice-to-have | 20% |
| ⚪ Won't | Phiên bản sau | 0% |
