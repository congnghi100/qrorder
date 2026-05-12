# 💾 Data Model — Data Types & Naming Conventions

## 1. Naming Convention

```
Bảng:     snake_case, số nhiều      → users, order_items
Cột:      snake_case                → full_name, created_at
PK:       id (UUID hoặc serial)
FK:       [table_singular]_id       → user_id, order_id
Timestamps: created_at, updated_at, deleted_at
Enum:     PascalCase                → OrderStatus, UserRole
Index:    idx_[table]_[columns]     → idx_orders_created_at
```

## 2. Data Type Mapping (Prisma + PostgreSQL)

| Loại dữ liệu | Prisma | PostgreSQL | Lưu ý |
|--------------|--------|-----------|-------|
| ID | `String @id @default(uuid())` | UUID | Không dùng auto-increment nếu có thể |
| Email | `String @unique` | VARCHAR(255) | Validate format ở app |
| Tiền | `Decimal @db.Decimal(12,2)` | DECIMAL(12,2) | ❌ KHÔNG dùng Float |
| Phone | `String` | VARCHAR(15) | 10-15 chars, country code |
| Status | `Enum` | ENUM | ❌ KHÔNG dùng String cho status |
| Password | `String` | VARCHAR(255) | ❌ KHÔNG plaintext, LUÔN hash |
| Text dài | `String @db.Text` | TEXT | Cho description, notes |
| JSON data | `Json` | JSONB | Cho flexible fields |
| Ngày giờ | `DateTime @default(now())` | TIMESTAMPTZ | Luôn dùng timezone |
| Boolean | `Boolean @default(false)` | BOOLEAN | Default rõ ràng |

## 3. Ràng Buộc Bắt Buộc

- Mọi bảng PHẢI có: `id`, `created_at`, `updated_at`
- Dùng Soft Delete: `deleted_at DateTime?` (nullable)
- Foreign Key luôn có `ON DELETE` policy rõ ràng
- Fields thường query/filter/sort PHẢI có index

## 4. Relationship Patterns

| Loại | Ví dụ | Mô tả |
|------|-------|-------|
| 1:1 | User ↔ Profile | Dùng `@relation` + unique FK |
| 1:N | User → Contacts | FK ở bảng "nhiều" |
| N:M | User ↔ Role | Bảng junction (user_roles) |
| Self-ref | Category → SubCategory | FK trỏ về chính bảng đó |

## 5. Checklist Khi Review Data Model

- [ ] Mọi entity đều có PK (uuid)
- [ ] Mọi entity đều có timestamps (created_at, updated_at)
- [ ] Soft delete cho entities quan trọng
- [ ] Index cho các cột thường filter/sort
- [ ] Unique constraint cho email, mã code,...
- [ ] Không lưu computed data (total = SUM items)
- [ ] ER Diagram vẽ bằng Mermaid
- [ ] Prisma schema syntax kèm theo
