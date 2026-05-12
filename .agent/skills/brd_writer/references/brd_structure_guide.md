# 📄 BRD Structure — 11 Mục Chuẩn & Hướng Dẫn

## Cấu Trúc 11 Mục

| # | Mục | Nội dung chính | Ai đọc |
|---|-----|---------------|--------|
| 1 | Thông tin tài liệu | Version, Date, Author, Approval table | Tất cả |
| 2 | Executive Summary | Tóm tắt 2-3 đoạn (Vấn đề → Giải pháp → Kỳ vọng) | C-level |
| 3 | Bối cảnh & Vấn đề | Pain points, cơ hội, AS-IS | Sponsor |
| 4 | Mục tiêu kinh doanh | KPIs có Baseline + Target | Sponsor, PM |
| 5 | Phạm vi | In-scope / Out-of-scope / Phases | Tất cả |
| 6 | Stakeholders | Registry, RACI Matrix | PM, BA |
| 7 | Yêu cầu nghiệp vụ | BR-001... (AS-IS → TO-BE) | Dev, QA |
| 8 | Ràng buộc & Giả định | Constraints ≠ Assumptions | PM, Tech Lead |
| 9 | Success Criteria | KPIs đo lường được | Sponsor |
| 10 | Timeline sơ bộ | Phases + Milestones | PM |
| 11 | Phụ lục | Thuật ngữ, tham khảo | Tất cả |

## BRD vs PRD — Phân Biệt

| Tiêu chí | BRD | PRD |
|----------|-----|-----|
| Trả lời | WHAT — Business cần gì? | HOW — Sản phẩm giải quyết thế nào? |
| Đối tượng đọc | Sponsor, C-level, Business | Dev Team, QA, Designer |
| Level | Business requirements | Product/Technical requirements |
| Thứ tự | Trước | Sau (dựa trên BRD approved) |

## Checklist Viết Tốt

- [ ] Mọi requirement đều mô tả WHAT (không phải HOW)
- [ ] Mọi KPI đều có số cụ thể (Baseline → Target)
- [ ] Out-of-scope rõ ràng kèm lý do
- [ ] Phần thiếu info đều có placeholder `[CẦN BỔ SUNG: ...]`
- [ ] Assumptions và Constraints tách riêng biệt
- [ ] Có Approval table cho sign-off
- [ ] Gaps report ở cuối tài liệu

## Nguyên Tắc Viết Nội Dung BRD

```
✅ "Hệ thống cần cho phép nhân viên tra cứu tồn kho realtime"
   → Rõ ràng, mô tả WHAT, business đọc được

❌ "Cần API endpoint GET /inventory với Redis cache TTL 5 phút"
   → Quá kỹ thuật, thuộc SRS/PRD

✅ "Giảm thời gian xử lý đơn hàng từ 10 phút xuống 3 phút"
   → Đo lường được, có baseline + target

❌ "Cải thiện quy trình đặt hàng"
   → Mơ hồ, không đo lường được
```
