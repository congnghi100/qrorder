# ✅ Acceptance Testing — Checklist & Kỹ Thuật Tham Khảo

## 1. Các Loại Test Cần Cover

| Loại | Mô tả | Ưu tiên |
|------|--------|---------|
| Happy Path | Luồng chính đúng, dữ liệu hợp lệ | 🔴 Must |
| Negative | Dữ liệu sai, lỗi validation | 🔴 Must |
| Boundary | Giá trị biên (min, max, min-1, max+1) | 🟡 Should |
| Edge Case | Trường hợp hiếm (unicode, emoji, SQL injection) | 🟡 Should |
| Concurrency | Hai user cùng thao tác 1 record | 🟢 Could |
| Performance | Tải 1000+ records, response time | 🟢 Could |

## 2. Checklist Kiểm Tra Cho Mỗi Input Field

- [ ] Nhập giá trị hợp lệ (Happy Path)
- [ ] Bỏ trống (nếu field required)
- [ ] Nhập dưới min length
- [ ] Nhập đúng min length
- [ ] Nhập đúng max length
- [ ] Nhập vượt max length
- [ ] Nhập ký tự đặc biệt (`<script>`, `'; DROP TABLE`, `"`, `\`)
- [ ] Nhập emoji (👋🏻)
- [ ] Nhập dấu tiếng Việt có tổ hợp (ắ, ồ, ữ)
- [ ] Copy-paste dữ liệu có khoảng trắng đầu/cuối

## 3. Checklist CRUD Operations

### Create
- [ ] Tạo OK với đầy đủ fields
- [ ] Tạo OK chỉ với required fields
- [ ] Tạo fail khi thiếu required field
- [ ] Tạo fail khi trùng unique field
- [ ] Verify dữ liệu ghi vào DB đúng

### Read
- [ ] Xem danh sách (có data)
- [ ] Xem danh sách (không data — Empty State)
- [ ] Xem chi tiết 1 record
- [ ] Xem record không tồn tại (404)
- [ ] Phân trang hoạt động đúng
- [ ] Filter hoạt động đúng
- [ ] Search hoạt động đúng
- [ ] Sort hoạt động đúng

### Update
- [ ] Sửa OK với dữ liệu hợp lệ
- [ ] Sửa fail khi vi phạm validation
- [ ] Sửa fail khi record đã bị xóa
- [ ] Sửa fail khi không có quyền

### Delete
- [ ] Xóa OK (Soft Delete → set deletedAt)
- [ ] Xóa fail khi không có quyền
- [ ] Record đã xóa không hiện trong danh sách
- [ ] Record đã xóa vẫn truy cập được qua Admin (nếu cần)

## 4. Checklist Phân Quyền (RBAC)

- [ ] User không đăng nhập → 401
- [ ] User không có quyền → 403
- [ ] User chỉ thấy dữ liệu của mình (nếu rule "own data")
- [ ] Admin thấy tất cả
- [ ] Test từng action × từng role

## 5. Convention Đặt Tên Test Case

```
TC-[MODULE]-[NUMBER]

Ví dụ:
TC-AUTH-001   → Đăng nhập thành công
TC-CON-001    → Tạo contact thành công
TC-ORD-001    → Tạo đơn hàng thành công
TC-RPT-001    → Xem báo cáo doanh thu
```

## 6. Test Data Convention

```
Email:   test_[feature]_[number]@test.com
Phone:   090XXXXXXX (10 số)
Name:    "Test [Feature] [Number]"
Date:    Ngày cụ thể, không dùng "hôm nay"
Amount:  Dùng số tròn + số lẻ + biên (0, 0.01, 999999.99)
```
