# 📊 Stakeholder — RACI Matrix & Power/Interest Guide

## 1. RACI Definitions

| Ký hiệu | Nghĩa | Quy tắc |
|---------|-------|---------|
| **R** (Responsible) | Người thực hiện | Có thể nhiều người |
| **A** (Accountable) | Người chịu trách nhiệm cuối cùng | **CHỈ ĐÚNG 1 NGƯỜI** |
| **C** (Consulted) | Người được tham vấn (2-way) | Hỏi ý kiến trước khi quyết |
| **I** (Informed) | Người được thông báo (1-way) | Báo sau khi xong |

## 2. Power/Interest Matrix

```
              INTEREST
         Low         High
    ┌──────────┬──────────┐
    │ Theo dõi │ Cập nhật │
Low │ (Monitor)│ thường   │
    │          │ xuyên    │  POWER
    ├──────────┼──────────┤
    │ Giữ      │ Quản lý  │
High│ hài lòng │ CHẶT ⭐  │
    └──────────┴──────────┘
```

| Quadrant | Chiến lược | Ví dụ |
|----------|-----------|-------|
| High Power + High Interest | Quản lý chặt, engage thường xuyên | Sponsor, PM |
| High Power + Low Interest | Giữ hài lòng, update khi cần | CTO, CFO |
| Low Power + High Interest | Cập nhật thường xuyên, lấy feedback | End Users, QA |
| Low Power + Low Interest | Theo dõi, minimal effort | HR, Vendor |

## 3. Nhóm Stakeholder Thường Bị Bỏ Sót

| Nhóm | Tại sao quan trọng |
|------|-------------------|
| End Users | Bị ảnh hưởng trực tiếp nhất |
| IT Operations | Deploy, maintain, monitoring |
| Legal / Compliance | GDPR, privacy, contracts |
| Finance / Kế toán | Budget, invoicing, reporting |
| Customer Support | Nhận phản hồi từ users |

## 4. Communication Plan Template

| Ai | Nhận gì | Khi nào | Kênh | Owner |
|-----|---------|---------|------|-------|
| Sponsor | Status report + risks | Tuần | Email + Meeting | PM |
| Dev Team | Sprint backlog, AC | Ngày | Standup + Jira | SM |
| End Users | Release notes, training | Per release | Email + Training | BA |
| QA | Test plan, CR | Per sprint | Jira + Slack | QA Lead |
