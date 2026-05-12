# 🔍 Requirements — Kỹ Thuật Khai Thác & Phân Loại

## 1. Phân Loại Requirements

| Type | Prefix | Mô tả | Ví dụ |
|------|--------|-------|-------|
| Functional | FR-001 | Hệ thống PHẢI làm gì | "Tạo contact với tên, email, SĐT" |
| Non-Functional | NFR-001 | Hệ thống phải ĐẠT chỉ số gì | "Response time < 500ms (p95)" |
| Business Rule | BR-001 | Quy tắc nghiệp vụ | "Email contact phải unique" |
| Constraint | CON-001 | Ràng buộc kỹ thuật/tổ chức | "Phải dùng PostgreSQL" |

## 2. Kỹ Thuật Khai Thác (Elicitation)

| Kỹ thuật | Khi nào dùng | Output |
|---------|-------------|--------|
| Phỏng vấn 1-1 | Stakeholder cấp cao | Goals, constraints, KPIs |
| Workshop nhóm | Nhiều stakeholder | Consensus, priority |
| Observation | Hiểu quy trình thực tế | AS-IS process, pain points |
| Document Analysis | Đã có tài liệu cũ | Gaps, inconsistencies |
| Prototyping | Yêu cầu mơ hồ | Concrete expectations |
| Survey/Questionnaire | Nhiều người dùng | Quantitative data |

## 3. Câu Hỏi Mẫu Theo Nhóm

### Business Context
- Vì sao dự án này được khởi tạo?
- Vấn đề lớn nhất hiện tại là gì?
- Nếu không làm gì, hậu quả là gì?

### Scope & Priority
- Deadline cứng có không? Tại sao mốc đó quan trọng?
- Nếu chỉ được làm 3 tính năng, bạn chọn gì?
- Tính năng nào có thể chờ Phase 2?

### User & Process
- Ai dùng hệ thống hàng ngày?
- Quy trình hiện tại (AS-IS) như thế nào?
- Pain point lớn nhất khi dùng hệ thống cũ?

### Technical
- Có hệ thống nào cần tích hợp?
- Data hiện tại lưu ở đâu? Cần migrate?
- Có yêu cầu bảo mật đặc biệt?

## 4. Gap Detection Checklist

- [ ] Thông tin thiếu → Tạo câu hỏi
- [ ] Mâu thuẫn giữa các nguồn → Liệt kê conflicts
- [ ] Giả định chưa xác nhận → Đánh dấu assumptions
- [ ] Edge case chưa xử lý → Ghi footnote
- [ ] Requirement mơ hồ → Yêu cầu metrics cụ thể
