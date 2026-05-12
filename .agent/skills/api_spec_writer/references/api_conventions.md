# 🔌 API Design — Conventions & Best Practices

## 1. REST Endpoint Naming

```
✅ ĐÚNG:
GET    /api/v1/contacts          → Danh sách (+ pagination, filter)
GET    /api/v1/contacts/:id      → Chi tiết
POST   /api/v1/contacts          → Tạo mới → 201
PUT    /api/v1/contacts/:id      → Full update → 200
PATCH  /api/v1/contacts/:id      → Partial update → 200
DELETE /api/v1/contacts/:id      → Soft delete → 204

❌ SAI:
GET /api/getContacts
POST /api/createNewContact
GET /api/contact/delete/123
```

## 2. HTTP Status Codes

| Code | Tên | Khi nào dùng |
|------|-----|-------------|
| 200 | OK | GET, PUT, PATCH thành công |
| 201 | Created | POST tạo mới thành công |
| 204 | No Content | DELETE thành công |
| 400 | Bad Request | Validation error, sai format |
| 401 | Unauthorized | Chưa đăng nhập hoặc token hết hạn |
| 403 | Forbidden | Đăng nhập rồi nhưng không có quyền |
| 404 | Not Found | Resource không tồn tại |
| 409 | Conflict | Trùng dữ liệu (duplicate email) |
| 422 | Unprocessable | Vi phạm business rule |
| 500 | Internal Error | Lỗi server không lường trước |

## 3. Response Format Chuẩn

```json
// Success (single)
{ "success": true, "data": { ... } }

// Success (list)
{ "success": true, "data": [...], "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 } }

// Error
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Chung", "details": [{ "field": "email", "message": "Cụ thể" }] } }
```

## 4. Pagination Convention

| Param | Type | Default | Range |
|-------|------|---------|-------|
| page | int | 1 | ≥ 1 |
| limit | int | 20 | 1–100 |
| sort | string | -createdAt | prefix `-` = DESC |
| search | string | — | min 2 chars |

## 5. Authentication Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 6. Error Code Convention

```
VALIDATION_ERROR    → 400 — Dữ liệu đầu vào sai
UNAUTHORIZED        → 401 — Chưa đăng nhập
FORBIDDEN           → 403 — Không có quyền
NOT_FOUND           → 404 — Không tìm thấy
DUPLICATE_[FIELD]   → 409 — Trùng dữ liệu (DUPLICATE_EMAIL)
BUSINESS_RULE       → 422 — Vi phạm logic nghiệp vụ
INTERNAL_ERROR      → 500 — Lỗi hệ thống
```
