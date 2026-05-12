# 💥 Impact Analysis — 6 Chiều Phân Tích

## 1. Sáu Chiều Bắt Buộc

| # | Chiều | Câu hỏi chính | Ví dụ output |
|---|-------|--------------|-------------|
| 1 | DATABASE | Schema change? Migration? Data backfill? | ALTER TABLE, ADD COLUMN |
| 2 | BACKEND | Files? Logic? Middleware? Services? | contact.service.js, validation |
| 3 | FRONTEND | Components? Screens? State? | ContactForm, ContactTable |
| 4 | API | Breaking change? New endpoints? | PATCH /contacts, new query param |
| 5 | TESTS | New tests? Update existing? | +5 unit tests, +2 E2E |
| 6 | PROCESS | Docs? Training? Communication? | Update API docs, notify team |

## 2. Impact Level Matrix

| Level | Files | Thời gian | Ảnh hưởng | Ví dụ |
|-------|-------|-----------|----------|-------|
| 🟢 LOW | 1-2 | < 2h | 1 component | Sửa label, thêm field optional |
| 🟡 MEDIUM | 3-5 | 2-8h | 1 feature | Thêm filter mới, validation mới |
| 🟠 HIGH | 5-10 | 1-3 ngày | Nhiều features | Thêm role mới, thay đổi workflow |
| 🔴 CRITICAL | 10+ | 3+ ngày | Toàn hệ thống | Đổi auth, migration lớn, refactor |

## 3. Breaking Change Checklist

- [ ] API response format thay đổi?
- [ ] Field bị xóa hoặc đổi tên?
- [ ] Require field mới trên existing data?
- [ ] Database migration cần downtime?
- [ ] Cần client app update?

## 4. Rollback Plan Template

```
1. git revert [commit_hash]
2. prisma migrate resolve --rolled-back [migration_name]
3. Deploy previous version
4. Verify rollback thành công
5. Notify team
```
