# 📄 BUSINESS REQUIREMENT DOCUMENT (BRD)

---

## 1. Thông Tin Tài Liệu

| Hạng mục               | Chi tiết                                                         |
| ------------------------ | ----------------------------------------------------------------- |
| **Tên dự án**   | Hệ Thống Đặt Món Tại Bàn Qua QR Code (QR Dine-in Ordering) |
| **Mã tài liệu** | BRD-QRPOS-001                                                     |
| **Phiên bản**    | 1.0                                                               |
| **Ngày tạo**     | 12/05/2026                                                        |
| **Tác giả**      | Taka Solutions                                                    |
| **Trạng thái**   | Draft                                                             |

### Lịch sử thay đổi

| Version | Ngày      | Người sửa   | Nội dung thay đổi   |
| ------- | ---------- | -------------- | ---------------------- |
| 1.0     | 12/05/2026 | Taka Solutions | Tạo mới từ PRD v1.1 |

### Phê duyệt

| Vai trò        | Họ tên        | Ngày ký | Chữ ký |
| --------------- | --------------- | --------- | -------- |
| Project Sponsor | [CẦN BỔ SUNG] |           |          |
| Business Owner  | [CẦN BỔ SUNG] |           |          |
| IT Lead         | [CẦN BỔ SUNG] |           |          |

---

## 2. Executive Summary

Nhà hàng đang đối mặt với tình trạng quá tải nhân viên phục vụ trong giờ cao điểm, dẫn đến khách hàng chờ đợi lâu để gọi món và tỷ lệ sai sót order ở mức cao. Đây là vấn đề trực tiếp ảnh hưởng đến chất lượng trải nghiệm khách hàng và hiệu quả vận hành.

Giải pháp đề xuất là triển khai hệ thống **QR Dine-in Ordering** — cho phép khách hàng tự quét mã QR tại bàn, xem thực đơn điện tử và gửi order thẳng vào hệ thống POS (LS Central) mà không cần thông qua nhân viên ghi chép thủ công. Hệ thống hoạt động dưới dạng Mini App, không yêu cầu tải về hay cài đặt ứng dụng độc lập.

Kỳ vọng sau triển khai: hơn 60% khách Dine-in tự đặt món qua QR, thời gian từ lúc ngồi đến lúc gọi món giảm xuống dưới 5 phút, và sai sót order giảm 90%.

---

## 3. Bối Cảnh & Vấn Đề Kinh Doanh

### 3.1 Bối cảnh

Nhà hàng đang vận hành hệ thống POS LS Central để quản lý order và thanh toán. Tuy nhiên, toàn bộ quy trình gọi món hiện tại đang phụ thuộc hoàn toàn vào nhân viên phục vụ: khách ngồi → chờ nhân viên đến → nhân viên ghi order thủ công → chuyển bếp. Quy trình này tạo ra nút thắt cổ chai nghiêm trọng vào giờ cao điểm.

### 3.2 Vấn đề

| # | Vấn đề                                               | Ảnh hưởng                                 | Mức độ      |
| - | ------------------------------------------------------- | -------------------------------------------- | -------------- |
| 1 | Khách chờ đợi lâu để được phục vụ gọi món | Giảm sự hài lòng, tăng tỷ lệ rời bỏ | 🔴 Cao         |
| 2 | Nhân viên quá tải giờ cao điểm                   | Sai sót ghi order, stress nhân viên       | 🔴 Cao         |
| 3 | Sai sót khi nghe và ghi nhận order thủ công        | Khách nhận nhầm món, hoàn trả          | 🔴 Cao         |
| 4 | Tốc độ luân chuyển bàn chậm                      | Giảm doanh thu trên mỗi ca                | 🟡 Trung bình |
| 5 | Chi phí vận hành nhân sự phục vụ cao             | Tăng chi phí, khó mở rộng quy mô       | 🟡 Trung bình |

### 3.3 Cơ hội

Nếu khách hàng có thể tự chủ trong việc xem menu và đặt món, nhà hàng có thể tối ưu số lượng nhân viên phục vụ, tăng tốc độ luân chuyển bàn và cải thiện đáng kể trải nghiệm khách hàng — từ đó tăng doanh thu trên cùng một diện tích mặt bằng mà không cần tăng nhân sự.

---

## 4. Mục Tiêu Kinh Doanh

| #  | Mục tiêu                                              | Chỉ số đo lường                     | Baseline                  | Target       |
| -- | ------------------------------------------------------- | ---------------------------------------- | ------------------------- | ------------ |
| O1 | Tăng tỷ lệ khách tự đặt món qua QR              | % khách Dine-in dùng QR Order          | 0%                        | > 60%        |
| O2 | Rút ngắn thời gian từ ngồi xuống đến đặt món | Phút/lượt khách                      | ~15 phút                 | < 5 phút    |
| O3 | Giảm sai sót trong quá trình ghi nhận order        | Số sự cố sai order/tuần              | [CẦN BỔ SUNG: baseline] | Giảm 90%    |
| O4 | Tối ưu chi phí vận hành nhân sự phục vụ        | Số nhân viên phục vụ cần thiết/ca | [CẦN BỔ SUNG]           | Giảm 20-30% |

---

## 5. Phạm Vi Dự Án

### 5.1 ✅ Trong phạm vi (Phase 1 - MVP)

1. **Quản lý mã QR theo bàn:** System Admin tạo và quản lý mã QR cho từng bàn dựa trên dữ liệu bàn từ LS Central.
2. **Xác thực truy cập bằng Zalo Mini App:** Khách hàng mở App Zalo quét QR để truy cập vào menu nhà hàng qua ứng dụng Zalo Mini App.
3. **Hiển thị thực đơn điện tử:** Đồng bộ danh sách món ăn, giá, hình ảnh, phân loại từ LS Central.
4. **Tùy chỉnh món ăn:** Cho phép chọn modifier (tùy chọn) và ghi chú riêng cho từng món.
5. **Quản lý phiên đặt hàng (Session):** Cho phép khách order nhiều lần trong cùng một lần ngồi bàn.
6. **Gửi order về POS:** Đẩy đơn hàng từ Mini App vào LS Central với đúng số bàn và Sales Type.
7. **Theo dõi trạng thái đơn hàng:** Khách xem được trạng thái order (Chờ xác nhận → Đã xác nhận).
8. **Đa ngôn ngữ:** Giao diện hỗ trợ Tiếng Việt và Tiếng Anh.

### 5.2 ❌ Ngoài phạm vi (Phase 2 - Tương lai)

1. **Thanh toán trực tuyến** (MoMo, ZaloPay, VNPay) — Cần tích hợp cổng thanh toán, nằm ngoài phạm vi hiện tại.
2. **Loyalty / Tích điểm** — Chưa có hạ tầng thành viên, để Phase 2.
3. **Đăng nhập / Tài khoản khách hàng** — Mục tiêu không thu PII trong Phase 1.

### 5.3 Phân pha

| Phase         | Nội dung                   | Timeline dự kiến |
| ------------- | --------------------------- | ------------------ |
| Phase 1 (MVP) | Toàn bộ phạm vi mục 5.1 | [CẦN BỔ SUNG]    |
| Phase 2       | Thanh toán online, Loyalty | [CẦN BỔ SUNG]    |

---

## 6. Các Bên Liên Quan (Stakeholders)

| # | Vai trò                               | Đại diện             | Mức độ ảnh hưởng | Mức độ quan tâm | Kỳ vọng chính                                          |
| - | -------------------------------------- | ----------------------- | ---------------------- | ------------------- | --------------------------------------------------------- |
| 1 | Project Sponsor / Quản lý nhà hàng | [CẦN BỔ SUNG]         | 🔴 Cao                 | 🔴 Cao              | Giảm chi phí vận hành, tăng doanh thu                |
| 2 | Khách hàng (Thực khách)            | Nhóm Dine-in           | 🔴 Cao                 | 🔴 Cao              | Đặt món nhanh, không cần chờ, không cần cài app  |
| 3 | Nhân viên Thu ngân / Phục vụ      | Đội ngũ nhà hàng   | 🟡 TB                  | 🔴 Cao              | Nhận order chính xác, thao tác quen thuộc trên POS  |
| 4 | Đầu bếp (Kitchen)                   | Đội bếp              | 🟡 TB                  | 🟡 TB               | Order rõ ràng, đúng thứ tự, có ghi chú đầy đủ |
| 5 | IT / Đội tích hợp                  | Taka Solutions          | 🔴 Cao                 | 🟡 TB               | API LS Central ổn định, spec rõ ràng                 |
| 6 | System Admin                           | Quản lý IT nhà hàng | 🟡 TB                  | 🟡 TB               | Công cụ quản lý QR/bàn đơn giản, dễ dùng        |

### RACI Matrix

| Hoạt động              | Sponsor | BA | Dev Lead | QA | End User |
| ------------------------- | ------- | -- | -------- | -- | -------- |
| Phê duyệt BRD           | A       | R  | C        | I  | C        |
| Review PRD                | I       | R  | A        | C  | C        |
| Xác nhận API LS Central | A       | C  | R        | I  | I        |
| UAT                       | I       | C  | I        | R  | A        |
| Go-live                   | A       | C  | R        | C  | I        |

> R = Responsible · A = Accountable · C = Consulted · I = Informed

---

## 7. Yêu Cầu Nghiệp Vụ Cấp Cao

| ID     | Yêu cầu                                     | Mô tả                                                                                                                   | Priority  | Liên quan |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| BR-001 | Quản lý mã QR theo bàn                    | Hệ thống cho phép Admin tạo và xuất mã QR cho từng bàn dựa trên danh sách bàn thực tế từ LS Central       | 🔴 Must   | O1         |
| BR-002 | Hiển thị số bàn xuyên suốt              | Tên/số bàn luôn hiển thị trên mọi màn hình để khách xác nhận mình đang order đúng bàn                 | 🔴 Must   | O2         |
| BR-003 | Xem thực đơn điện tử đồng bộ từ POS | Toàn bộ menu (món ăn, giá, hình ảnh, danh mục) lấy trực tiếp từ LS Central, không cần cập nhật thủ công | 🔴 Must   | O2         |
| BR-004 | Tùy chỉnh và ghi chú món ăn             | Khách được chọn các tùy chọn đi kèm (modifier) và ghi chú đặc biệt cho từng món                          | 🔴 Must   | O3         |
| BR-005 | Gửi order vào hệ thống POS                | Đơn hàng từ nhân viên được đẩy thẳng vào LS Central với đầy đủ thông tin bàn, món, ghi chú         | 🔴 Must   | O3         |
| BR-006 | Cho phép gọi thêm món trong cùng phiên  | Khách có thể tiếp tục chọn và gửi thêm món mà không cần tạo hóa đơn mới                                 | 🔴 Must   | O2         |
| BR-007 | Theo dõi trạng thái order                  | Khách xem được trạng thái hiện tại của đơn hàng mà không cần hỏi nhân viên                              | 🟡 Should | O2         |
| BR-008 | Nhân viên xử lý order QR trên POS        | Order từ QR hiển thị trên POS với nhãn "QR Order" và số bàn để thu ngân gộp bill                             | 🔴 Must   | O3         |
| BR-009 | Đa ngôn ngữ Việt/Anh                      | Khách có thể chuyển ngôn ngữ giao diện                                                                             | 🟢 Could  | O1         |

### Chi tiết từng yêu cầu

#### BR-001: Quản lý mã QR theo bàn

- **Mô tả:** Admin truy cập màn hình quản lý bàn, hệ thống tải danh sách bàn từ LS Central, cho phép chọn bàn và tạo/xuất mã QR tương ứng.
- **Quy trình hiện tại (AS-IS):** Admin tạo mã QR thủ công bên ngoài hệ thống, không đồng bộ với POS.
- **Quy trình mong muốn (TO-BE):** Admin chọn bàn từ danh sách đồng bộ LS Central → Bấm "Tạo QR" → Tải về/In QR dán lên bàn.
- **Tiêu chí chấp nhận:** Mã QR khi quét sẽ mở đúng menu của đúng bàn đó.
- **Stakeholder liên quan:** System Admin, Quản lý nhà hàng.

#### BR-003: Xem thực đơn điện tử đồng bộ từ POS

- **Mô tả:** Toàn bộ dữ liệu menu (tên, giá, mô tả, hình ảnh, danh mục) đến từ LS Central. Khi nhà hàng cập nhật giá/món trên POS, App tự phản ánh thay đổi mà không cần thao tác thủ công thêm.
- **Quy trình hiện tại (AS-IS):** Menu giấy in ra, đổi giá phải in lại.
- **Quy trình mong muốn (TO-BE):** Cập nhật một lần trên POS, tất cả kênh phản ánh ngay.
- **Tiêu chí chấp nhận:** Thay đổi trên LS Central phản ánh trong Mini App trong vòng [CẦN BỔ SUNG: thời gian cache].
- **Stakeholder liên quan:** Quản lý nhà hàng, Nhân viên thu ngân.

#### BR-005: Gửi order vào hệ thống POS

- **Mô tả:** Đơn hàng từ nhân viên được đẩy thẳng vào LS Central với đầy đủ thông tin bàn, món, ghi chú.
- **Quy trình hiện tại (AS-IS):** Nhân viên nghe và nhập tay trên POS.
- **Quy trình mong muốn (TO-BE):** Khách tự chọn và gửi → Order tự động vào POS và bếp.
- **Tiêu chí chấp nhận:** Order xuất hiện đúng trên POS và KDS bếp trong vòng 5 giây sau khi khách bấm gửi.
- **Stakeholder liên quan:** Khách hàng, Nhân viên thu ngân, Đầu bếp.

---

## 8. Ràng Buộc & Giả Định

### 8.1 Ràng buộc (Constraints)

| #  | Ràng buộc                                                                         | Loại    | Ảnh hưởng                                                            |
| -- | ----------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| C1 | Hệ thống phải tích hợp với LS Central hiện có, không được thay thế POS | Tech     | Mọi nghiệp vụ lõi (menu, session, order) phụ thuộc API LS Central |
| C2 | App không được lưu PII của khách hàng                                       | Legal    | Không thể cá nhân hóa trải nghiệm, không loyalty trong Phase 1  |
| C3 | Khách hàng không cài đặt ứng dụng                                           | UX       | Phải là Mini App chạy trong Zalo App                                |
| C4 | Giao tiếp với LS Central qua Middleware (API Gateway)                             | Security | Không gọi trực tiếp vào database POS                               |
| C5 | [CẦN BỔ SUNG: Ràng buộc ngân sách]                                            | Budget   | [Ảnh hưởng]                                                          |

### 8.2 Giả định (Assumptions)

| #  | Giả định                                                                                           | Rủi ro nếu sai                                            | Cần xác nhận bởi      |
| -- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------- |
| A1 | LS Central có API/Web Services để lấy danh sách bàn, menu, gửi order và tra cứu trạng thái | Toàn bộ dự án không khả thi nếu API không tồn tại | IT Lead + Team LS Central |
| A2 | API LS Central trả về dữ liệu đủ để sinh mã QR theo bàn                                     | Phải custom thêm nếu không có Table API                | IT Lead                   |
| A4 | Khách hàng có smartphone với camera và kết nối internet                                        | Nếu không, cần phương án QR kiosk tại bàn           | [CẦN BỔ SUNG]           |

---

## 9. Success Criteria & KPIs

| #     | Tiêu chí                            | Cách đo                  | Baseline                  | Target    | Deadline             |
| ----- | ------------------------------------- | -------------------------- | ------------------------- | --------- | -------------------- |
| KPI-1 | Tỷ lệ khách Dine-in dùng QR Order | POS System logs            | 0%                        | > 60%     | 3 tháng sau go-live |
| KPI-2 | Thời gian từ ngồi đến gửi order | System timestamp logs      | ~15 phút                 | < 5 phút | 1 tháng sau go-live |
| KPI-3 | Tỷ lệ sai sót order                | Báo cáo Customer Service | [CẦN BỔ SUNG: baseline] | Giảm 90% | 3 tháng sau go-live |
| KPI-4 | Tỷ lệ uptime của hệ thống        | Server monitoring          | N/A                       | ≥ 99.9%  | Liên tục           |
| KPI-5 | Thời gian tải trang Menu lần đầu | Lighthouse / RUM           | N/A                       | < 2 giây | Trước go-live      |

### Definition of Done (DoD) cho dự án

- [ ] Tất cả yêu cầu BR-001 đến BR-009 đã implement và test
- [ ] KPIs kỹ thuật (KPI-4, KPI-5) đạt target trước go-live
- [ ] User Acceptance Test (UAT) pass 100% với đại diện nhân viên nhà hàng
- [ ] Tài liệu hướng dẫn sử dụng cho Admin và Nhân viên hoàn chỉnh
- [ ] Training cho nhân viên (cách phát PIN, cách xử lý order QR trên POS) hoàn thành

---

## 10. Timeline Sơ Bộ

| Phase                    | Mốc thời gian | Deliverables                        |
| ------------------------ | --------------- | ----------------------------------- |
| Phân tích & Thiết kế | [CẦN BỔ SUNG] | BRD, PRD, Mockup, API Spec          |
| Phát triển (Dev)       | [CẦN BỔ SUNG] | Mini App + Middleware + Admin Panel |
| Tích hợp LS Central    | [CẦN BỔ SUNG] | API integration, end-to-end test    |
| Testing (SIT + UAT)      | [CẦN BỔ SUNG] | Test reports, sign-off              |
| Go-live                  | [CẦN BỔ SUNG] | Production deployment               |
| Hypercare (1 tháng)     | [CẦN BỔ SUNG] | Monitoring, bug fix, KPI review     |

---

## 11. Phụ Lục

### 11.1 Thuật ngữ

| Thuật ngữ | Định nghĩa                                                                           |
| ----------- | --------------------------------------------------------------------------------------- |
| POS         | Point of Sale — Hệ thống máy bán hàng/thu ngân (LS Central)                      |
| LS Central  | Phần mềm POS do Microsoft/LS Retail phát triển, đang dùng tại nhà hàng         |
| QR Code     | Mã vạch ma trận 2D, khách quét bằng camera điện thoại để mở Mini App        |
| Mini App    | Ứng dụng nhỏ chạy bên trong Zalo, không cần tải về hay cài đặt              |
| Session     | Phiên làm việc của một bàn, từ lúc check-in đến lúc thanh toán              |
| Modifier    | Tùy chọn đi kèm món ăn (VD: ít đá, nhiều đường, mức chín của thịt bò) |
| OTP / PIN   | Mã số xác thực do nhân viên cung cấp cho khách khi check-in bàn                |
| KDS         | Kitchen Display System — Màn hình/máy in tại bếp nhận thông tin order           |
| Middleware  | API Gateway trung gian giữa Mini App và LS Central, đảm bảo bảo mật              |
| PII         | Personally Identifiable Information — Dữ liệu định danh cá nhân nhạy cảm       |

### 11.2 Tài liệu tham khảo

- PRD_QRCode_Ordering.md — Tài liệu đặc tả sản phẩm chi tiết (Taka Solutions, 2026-05-12)
- LS Central API Documentation — [CẦN BỔ SUNG: Link/version tài liệu]

### 11.3 Ghi chú bổ sung

- Ưu tiên xác nhận khả năng của LS Central API sớm nhất (A1, A2) trước khi bắt đầu phát triển.
- Cơ chế đồng bộ trạng thái order (Webhook vs Polling) cần được team LS Central xác nhận trước khi thiết kế chi tiết.

---

## ⚠️ Thông Tin Cần BA/PM Bổ Sung

| # | Mục BRD                    | Nội dung thiếu                                               | Ưu tiên |
| - | --------------------------- | -------------------------------------------------------------- | --------- |
| 1 | Mục 1 (Phê duyệt)        | Chưa có tên Project Sponsor, Business Owner, IT Lead        | 🔴 Cao    |
| 2 | Mục 4 (Mục tiêu O3)      | Baseline hiện tại về số sự cố sai order/tuần            | 🔴 Cao    |
| 3 | Mục 4 (Mục tiêu O4)      | Số nhân viên phục vụ hiện tại/ca để tính % giảm     | 🟡 TB     |
| 4 | Mục 5 (Timeline phân pha) | Ngày bắt đầu và deadline cụ thể cho Phase 1 & 2         | 🔴 Cao    |
| 5 | Mục 8 (C5)                 | Ràng buộc ngân sách dự án                                | 🔴 Cao    |
| 6 | Mục 8 (A1, A2)             | Xác nhận LS Central có API lấy bàn, menu và submit order | 🔴 Cao    |
| 7 | Mục 9 (KPI-3)              | Baseline số sai sót order hiện tại để đo improvement    | 🟡 TB     |
| 8 | Mục 10 (Timeline)          | Toàn bộ timeline cụ thể cho các phase                     | 🔴 Cao    |
| 9 | Mục 11.2                   | Link/version tài liệu API LS Central                         | 🟡 TB     |

**Đề xuất:** Tổ chức 1 buổi workshop 45-60 phút với Sponsor và IT Lead để bổ sung các mục 🔴 trước khi chuyển sang viết PRD chi tiết và thiết kế kỹ thuật.
