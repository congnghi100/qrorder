# Đặc Tả Kiến Trúc: QR Dine-in Ordering - Open Questions Resolution

**Ngày:** 2026-05-12
**Tác giả:** Taka Solutions

## Mục Tiêu
Giải quyết các vấn đề còn mở (Open Questions) trong tài liệu PRD để chốt phương án kỹ thuật cho hệ thống MiniAppPOS kết nối LS Central.

## Quyết Định Thiết Kế

### 1. Bảo mật mã QR tĩnh chống quét lén (Q1)
- **Vấn đề:** Mã QR dán tại bàn có thể bị chụp lén để tạo order rác.
- **Quyết định:** Sử dụng xác thực bằng yếu tố thứ 2 do nhân viên cung cấp.
- **Chi tiết:**
  - Nếu là Web App trình duyệt: Hệ thống sinh mã PIN dùng 1 lần (OTP/PIN), nhân viên đọc cho khách nhập vào.
  - Nếu là Zalo Mini App: Yêu cầu xác thực bằng số điện thoại khách hàng. 

### 2. Đồng bộ trạng thái đơn hàng (Q2)
- **Vấn đề:** Khi POS hủy món hoặc thay đổi, Web App làm sao để biết?
- **Đề xuất:** Ghi nhận 2 phương án: 
  1. Sử dụng Webhook do LS Central đẩy (Push) về Middleware (Ưu tiên số 1 - hiệu năng cao, realtime).
  2. Sử dụng Polling từ Client (Client liên tục gọi hỏi trạng thái mỗi 15s).
- **Trạng thái:** Chờ khách hàng / Team kỹ thuật LS Central xác nhận tính khả thi của Webhook.

### 3. Logic Gộp Bill (Q3)
- **Vấn đề:** Khách gọi nhiều lần thì gộp bill thế nào trên máy POS?
- **Quyết định:** Tạo mới Hóa đơn (Order) độc lập cho mỗi lần gửi.
- **Chi tiết:** Middleware sẽ chịu trách nhiệm nhóm các Order này lại bằng cách gắn chung `TableNo` và `lsSessionId`. Thu ngân sẽ thao tác gom bill thủ công hoặc dùng tính năng gom bàn/gom bill của LS Central khi khách thanh toán.

## Các Rủi Ro/Cần Lưu Ý
- Với Q2, nếu LS Central không có Webhook, phương pháp Polling sẽ gây tải lớn lên Database của máy chủ nội bộ nhà hàng vào giờ cao điểm, do đó cần cấu hình Middleware Caching hoặc Rate Limit hợp lý.
- Với Q3, thu ngân cần được training cách gộp bill của cùng 1 bàn, tránh bỏ sót bill lẻ của khách.
