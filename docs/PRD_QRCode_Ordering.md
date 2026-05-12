# PRD: Hệ Thống Đặt Món Tại Bàn Qua QR Code (QR Dine-in Ordering)

**Version:** 1.0
**Author:** Taka Solutions
**Date:** 2026-05-12
**Status:** Draft
**Stakeholders:** Khách hàng, Quản lý nhà hàng, Thu ngân, Nhà bếp, Đội ngũ tích hợp LS Central

---

## Thuật ngữ & Từ viết tắt (Glossary)

- **PRD (Product Requirements Document):** Tài liệu đặc tả yêu cầu sản phẩm.
- **POS (Point of Sale):** Hệ thống máy bán hàng / thu ngân (trong dự án này là phần mềm LS Central).
- **QR / QR Code (Quick Response):** Mã vạch ma trận 2 chiều, dùng để khách hàng quét và truy cập menu.
- **Web App / Mini App:** Ứng dụng web chạy trên trình duyệt điện thoại hoặc ứng dụng nhỏ tích hợp (Zalo/MoMo) không cần cài đặt.
- **KDS (Kitchen Display System):** Màn hình hiển thị hoặc hệ thống máy in đặt tại khu vực bếp để nhận thông tin order.
- **API (Application Programming Interface):** Phương thức kết nối, cho phép Web App, Middleware và hệ thống LS Central giao tiếp với nhau.
- **PII (Personally Identifiable Information):** Dữ liệu định danh cá nhân nhạy cảm (như Tên, SĐT, Email, Địa chỉ).
- **US (User Story):** Câu chuyện/Kịch bản người dùng, mô tả yêu cầu tính năng từ góc nhìn của một đối tượng cụ thể.
- **AC (Acceptance Criteria):** Tiêu chí nghiệm thu, điều kiện cần đạt được để chức năng được coi là hoàn thiện.
- **NFR (Non-Functional Requirement):** Yêu cầu phi chức năng (hiệu năng, bảo mật, khả dụng).

---

## 1. Problem Statement

### Vấn đề hiện tại

Trong các giờ cao điểm tại nhà hàng, khách hàng thường phải chờ đợi lâu để được nhân viên phục vụ đưa menu và ghi nhận món. Điều này làm giảm trải nghiệm khách hàng, đồng thời tạo áp lực lớn lên đội ngũ nhân viên phục vụ, dẫn đến sai sót trong việc ghi nhận order.

### Giải pháp đề xuất

Xây dựng giải pháp Web App cho phép khách hàng tự quét mã QR đặt tại bàn để xem thực đơn điện tử (e-Menu), tự do tùy chỉnh món và gửi order thẳng đến hệ thống POS (LS Central) và Nhà bếp mà không cần thông qua nhân viên phục vụ ghi chép thủ công.

### Business Value

- Tăng trải nghiệm và sự chủ động của khách hàng.
- Giảm tải khối lượng công việc cho nhân viên phục vụ, tối ưu chi phí vận hành.
- Tăng tốc độ luân chuyển bàn (table turnover rate) nhờ việc order nhanh chóng.
- Giảm thiểu sai sót do ghi nhận order thủ công.

### Success Metrics (KPIs)

| Metric                                                 | Đo bằng   | Mục tiêu                         |
| ------------------------------------------------------ | ----------- | ---------------------------------- |
| Tỉ lệ khách sử dụng QR Order                      | POS System  | > 60% tổng lượng khách Dine-in |
| Thời gian trung bình từ lúc ngồi đến lúc order | System Logs | < 5 phút                          |
| Tỉ lệ lỗi/sai sót order                            | CS Report   | Giảm 90%                          |

---

## 2. User Personas

### Persona 1: Khách hàng (Thực khách)

- **Vai trò:** Người trực tiếp sử dụng dịch vụ ăn uống tại nhà hàng.
- **Mục tiêu:** Xem menu dễ dàng, gọi món nhanh chóng, tùy chỉnh món ăn theo sở thích, theo dõi trạng thái món.
- **Pain points:** Ghét phải chờ đợi nhân viên, không thích tải app rườm rà.
- **Tech savvy:** Medium / High

### Persona 2: Nhân viên Phục vụ / Thu ngân (Staff)

- **Vai trò:** Quản lý đơn hàng, xác nhận order, tính tiền.
- **Mục tiêu:** Xử lý đơn hàng chính xác, gộp bill, thêm món dễ dàng trên POS.
- **Pain points:** Quá tải giờ cao điểm, sai sót khi nghe khách đọc order.
- **Tech savvy:** Medium

### Persona 3: Đầu bếp (Kitchen)

- **Vai trò:** Chế biến món ăn theo order.
- **Mục tiêu:** Nhận thông tin order rõ ràng, theo đúng thứ tự.
- **Pain points:** Order tay chữ xấu, thiếu note quan trọng của khách.
- **Tech savvy:** Low

---

## 3. Scope

### ✅ In Scope (Phiên bản này - Phase 1)

1. Khởi tạo mã QR theo Bàn & Cửa hàng.
2. Web App xem menu đồng bộ từ LS Central.
3. Chức năng chọn món, thêm modifier, note.
4. Quản lý phiên đặt hàng (Session) để order nhiều lần.
5. Theo dõi trạng thái đơn hàng (Draft -> Pending -> Confirmed/Cancelled).
6. Tích hợp đồng bộ đơn hàng về LS Central POS và máy in/KDS Bếp.
7. Đa ngôn ngữ (Anh/Việt).

### ❌ Out of Scope (Phiên bản sau - Phase 2)

1. Tích hợp cổng thanh toán trực tuyến (Online Payment / Momo / ZaloPay / VNPay).
2. Tích điểm hiển thị Loyalty / Membership trên màn hình QR.
3. Yêu cầu khách hàng đăng nhập/đăng ký tài khoản.

---

## 4. User Stories & Acceptance Criteria

### Epic 1: Quản lý Bàn & Truy cập Menu (Table & Access)

#### US-000: Quản lý mã QR Code theo bàn

**As a** System Admin / Quản lý nhà hàng
**I want** tạo và quản lý các mã QR Code bàn dựa trên danh sách bàn được đồng bộ từ API của LS Central
**So that** tôi có thể kiểm soát số lượng bàn hợp lệ và tạo mã QR chính xác để đặt tại từng bàn.

**Priority:** 🔴 High | **Story Points:** 5

**Acceptance Criteria:**

| #    | Given                                                | When                                    | Then                                                                                                                                                  |
| ---- | ---------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | Quản trị viên truy cập màn hình Quản lý Bàn | Yêu cầu xem danh sách                | Hệ thống hiển thị danh sách các bàn hiện có của nhà hàng.                                                                                 |
| AC-2 | Có danh sách bàn hợp lệ                         | Chọn một bàn và bấm "Tạo QR Code" | Hệ thống sinh ra một mã QR Code chứa thông tin định danh của bàn đó (Store ID, Table No, v.v.) để admin có thể tải xuống và in ra. |
| AC-3 | Quản trị viên truy cập màn hình Quản lý Bàn | Sync dữ liệu Bàn mới nhất          | Hệ thống gọi API qua LS Central để cập nhật dữ liệu bàn mới nhất                                                                          |

#### US-001: Quét mã QR nhận diện bàn

**As a** Khách hàng
**I want** quét mã QR trên bàn để mở menu
**So that** tôi không cần phải chọn lại tên cửa hàng hay số bàn.

**Priority:** 🔴 High | **Story Points:** 3

**Acceptance Criteria:**

| #    | Given                                                | When                                 | Then                                                                                                       |
| ---- | ---------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| AC-1 | Khách hàng ngồi tại bàn 10                      | Dùng camera quét mã QR trên bàn | Hệ thống mở trình duyệt Web App, và hiển thị đúng "Bàn 10" và Menu của cửa hàng hiện tại. |
| AC-2 | Mã QR đã hết hạn session hoặc không có thực | Khách hàng quét mã               | Hệ thống thông báo không tìm thấy mã bàn.                                                         |

---

### Epic 2: Khám phá Thực đơn (Menu Discovery)

#### US-002: Xem danh sách món ăn

**As a** Khách hàng
**I want** xem danh sách các món ăn kèm hình ảnh và giá cả
**So that** tôi có thể dễ dàng quyết định món mình muốn ăn.

**Priority:** 🔴 High | **Story Points:** 5

**Acceptance Criteria:**

| #    | Given                         | When                                       | Then                                                                                   |
| ---- | ----------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| AC-1 | Truy cập thành công        | Lướt trang chủ                          | Các món ăn được phân loại theo danh mục (category) đồng bộ từ LS Central. |
| AC-2 | Khách muốn đổi ngôn ngữ | Bấm nút chuyển đổi ngôn ngữ (VN/EN) | Toàn bộ tên món và giao diện chuyển sang ngôn ngữ tương ứng.               |

#### US-003: Tùy chỉnh món ăn (Modifiers)

**As a** Khách hàng
**I want** thêm các tùy chọn (ít đá, nhiều đường) hoặc ghi chú riêng cho món
**So that** món ăn được phục vụ đúng ý thích.

**Priority:** 🔴 High | **Story Points:** 5

**Acceptance Criteria:**

| #    | Given                                   | When                   | Then                                                                                                                            |
| ---- | --------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | Đang xem chi tiết 1 món có modifier | Chọn món đó        | Modal hiển thị yêu cầu chọn các tùy chọn bắt buộc (VD: Mức độ chín của Bò) và cho phép điền ghi chú thêm. |
| AC-2 | Bỏ trống modifier bắt buộc          | Bấm "Thêm vào giỏ" | Nút bị vô hiệu hóa, báo lỗi yêu cầu chọn thuộc tính bắt buộc.                                                     |

---

### Epic 3: Giỏ hàng & Gửi Order (Cart & Checkout)

#### US-004: Gửi thông tin Order qua hệ thống POS

**As a** Khách hàng
**I want** kiểm tra giỏ hàng và xác nhận gửi order
**So that** nhà bếp có thể bắt đầu chế biến món ăn của tôi.

**Priority:** 🔴 High | **Story Points:** 8

**Acceptance Criteria:**

| #    | Given                                 | When                                              | Then                                                                                                                                             |
| ---- | ------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-1 | Giỏ hàng đã có món              | Bấm nút "Gửi Đơn"                            | Đơn hàng được lưu lại ở Admin với trạng thái `Pending Confirmation`, ứng dụng chuyển sang màn hình "Theo dõi trạng thái". |
| AC-2 | Khách đã gửi 1 order trước đó | Tiếp tục chọn thêm món và bấm "Gửi Đơn" | Món ăn mới được append (thêm) vào cùng một phiên bàn (session) hiện tại mà không tạo hóa đơn mới rời rạc.                 |

---

### Epic 4: Theo dõi & Xử lý (Tracking & Processing)

#### US-005: Theo dõi trạng thái món

**As a** Khách hàng
**I want** biết đơn hàng của tôi đang ở trạng thái nào
**So that** tôi có thể yên tâm chờ đợi.

**Priority:** 🟡 Medium | **Story Points:** 5

**Acceptance Criteria:**

| #    | Given                                       | When                                     | Then                                                                                                                          |
| ---- | ------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | Nhân viên vừa xác nhận order trên POS | Khách hàng mở lại màn hình Web App | Ứng dụng gọi API LS Central lấy trạng thái mới nhất, chuyển từ `Đang chờ` sang `Đã xác nhận` (Confirmed). |

#### US-006: Xử lý order của khách tại bàn và đẩy thông tin tới POS

**As a** Nhân viên Thu ngân
**I want** nhận thông báo và thao tác với order từ QR code trên POS
**So that** tôi có thể gộp bill, tính tiền như khách gọi món trực tiếp.

**Priority:** 🔴 High | **Story Points:** 8

**Acceptance Criteria:**

| #    | Given                       | When                                     | Then                                                                                                    |
| ---- | --------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| AC-1 | Có order mới từ QR       | Nhân viên mở POS LS Central           | Đơn hàng hiển thị với Sales Type là "QR Order", đầy đủ thông tin số Bàn.                  |
| AC-2 | Khách ra quầy thanh toán | Nhân viên bấm "Thanh toán" bàn đó | Thao tác diễn ra bình thường, hệ thống tự động đóng phiên (end session) QR của bàn đó. |

---

## 5. Functional Requirements

| ID     | Category         | Requirement                                                                                                                         | Priority | US liên quan |
| ------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| FR-001 | QR Generation    | Backend có API sinh QR code động chứa mã Token mã hóa (Store, Table, Type).                                                  | High     | US-001        |
| FR-002 | Menu Sync        | Đồng bộ data Menu (Items, Prices, Modifiers, Images...) từ LS Central qua API. Caching để giảm tải.                         | High     | US-002        |
| FR-003 | Order Submission | Gọi LS Central API để đẩy giỏ hàng. Đơn phải map đúng `Table No`.                                                     | High     | US-004        |
| FR-004 | Order Status     | Gọi API LS Central (Polling/Webhook) để lấy trạng thái đơn (Draft -> Pending -> Confirmed). LS Central là Source of Truth. | Medium   | US-005        |
| FR-005 | QR Management    | Gọi API Admin tool để khởi tạo, validate và đóng QR code. Session timeout do Admin tool quản lý.                         | High     | US-001        |

---

## 6. Non-Functional Requirements

| ID      | Category     | Requirement                               | Metric   | Acceptance                                                                        |
| ------- | ------------ | ----------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| NFR-001 | Performance  | Thời gian tải trang ban đầu (Menu)    | < 2s     | Tối ưu hình ảnh, Caching                                                      |
| NFR-002 | UX/UI        | Tương thích thiết bị                 | 100%     | Hoạt động tốt trên iOS Safari, Android Chrome và Zalo Mini App (nếu có)) |
| NFR-003 | Security     | Không yêu cầu đăng nhập, không PII | Zero PII | Audit không chứa dữ liệu cá nhân                                            |
| NFR-004 | Availability | Hoạt động 24/7                         | 99.9%    | Server uptime                                                                     |

---

## 7. Data Model (Sơ bộ)

### Entities chính

| Entity          | Key Fields                                                                    | Mô tả                                            |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `Session`     | `lsSessionId`, `storeId`, `tableNo`, `status`                         | Phiên làm việc (Map trực tiếp từ LS Central) |
| `MenuItem`    | `itemId`, `name`, `price`, `imageUrl`, `categoryId`                 | Món ăn (Map từ LS Central)                      |
| `Modifier`    | `modifierId`, `itemId`, `name`, `priceOptions`, `isRequired`        | Tùy chọn món ăn                                |
| `Order`       | `orderId`, `lsSessionId`, `status`, `totalAmount`, `lsCentralRefId` | Hóa đơn đặt hàng (Đồng bộ LS Central)     |
| `OrderDetail` | `lineId`, `orderId`, `itemId`, `quantity`, `note`, `modifiers`    | Chi tiết món ăn trong order                     |

---

## 8. UI/UX Wireframes (Mô tả)

### Screen 1: Welcome / Bàn

- **Layout:** Logo nhà hàng, Số bàn, Nút "Bắt đầu gọi món".
- **Behavior:** Khi khách hàng click nút "Bắt đầu gọi món" để truy cập vào danh sách món (Screen 2).

### Screen 2: Menu / Danh sách món

- **Layout:** Header hiển thị Số Bàn đang order. Thanh tìm kiếm/Filter category ở trên cùng. Lưới danh sách món ăn với hình ảnh to, bắt mắt (Dark mode).
- **Behavior:** Bấm vào hình ảnh hoặc nút "+" để xem chi tiết / chọn modifier. Nút giỏ hàng nổi (Floating Cart) ở góc dưới.

### Screen 3: Chi tiết món & Modifier

- **Layout:** Bottom Sheet (trượt từ dưới lên). Ảnh món, Mô tả, Checkbox/Radio button cho các tùy chọn, Ô text nhập ghi chú, Nút "Thêm vào giỏ".

### Screen 4: Giỏ hàng (Cart)

- **Layout:** Header hiển thị Số Bàn đang order. Danh sách các món đã chọn, Nút Tăng/Giảm số lượng, Tổng tiền, Nút "Gửi Đơn".

### Screen 5: Trạng thái Order

- **Layout:** Header hiển thị Số Bàn đang order. Timeline trạng thái (Đã nhận đơn -> Đang chuẩn bị). Các món đã order. Nút "Gọi thêm món".

### Screen 6: Màn hình Login (Admin)

- **Layout:** Form đăng nhập với các trường Username, Password.
- **Behavior:** Xác thực tài khoản của Quản trị viên/Nhân viên để truy cập vào hệ thống quản lý.

### Screen 7: Màn hình Dashboard (Admin)

- **Layout:** Hiển thị các thẻ thống kê tổng quan (Cards) bao gồm: Số lượng bàn, Số lượng bàn đang sử dụng, Số lượng bàn trống, Top bàn được order nhiều nhất.

### Screen 8: Màn hình Danh sách Bàn (Admin)

- **Layout:** Bảng danh sách tất cả các bàn trong nhà hàng, kèm theo nút "Sync dữ liệu" để đồng bộ từ hệ thống POS.
- **Behavior:** Khi click vào một bàn cụ thể sẽ đi vào chi tiết bàn hiển thị các thông tin: Mã bàn, Tên bàn, Vị trí (Text), và Nội dung/Ghi chú. Tại đây admin có thể thực hiện tạo mã QR Code cho bàn.

### Screen 9: Danh sách Order (Admin)

- **Layout:** Bảng danh sách các đơn hàng theo thời gian thực. Mỗi dòng hiển thị Mã bàn, Tên bàn và Danh sách các món ăn đã order chi tiết bên trong.

### Screen 10: Quản lý tài khoản đăng nhập (Admin)

- **Layout:** Danh sách các tài khoản người dùng có quyền truy cập hệ thống quản trị.
- **Behavior:** Admin cấp cao có thể thêm/sửa/xóa tài khoản. Đặc biệt cung cấp nút tác vụ "Reset password về mặc định" cho các tài khoản khi cần thiết.

### Screen 11: Thông tin tài khoản đăng nhập (Profile)

- **Layout:** Hiển thị thông tin cá nhân của người đang đăng nhập bao gồm: Username, Họ tên, Mã nhân viên.
- **Behavior:** Cung cấp form cho phép người dùng tự "Thay đổi password" mới.

---

## 9. Technical Considerations

### Dependencies

- **LS Central API/Web Services:** Cần xác nhận các endpoint có sẵn của LS Central để lấy Menu, Gửi Order, và nhận Webhook/Polling trạng thái.

### Constraints

- Web App sẽ phụ thuộc hoàn toàn vào tốc độ phản hồi của hệ thống LS Central nội bộ cho mọi nghiệp vụ lõi (Menu, Session, Order, Status). Cần có cơ chế Caching, Timeout và Retry hợp lý để tránh treo app.

### Integration Points

- Hệ thống cần giao tiếp qua một Middleware (API Gateway) thay vì gọi trực tiếp thẳng vào Database của máy POS nhà hàng để đảm bảo an toàn bảo mật nội bộ.

---

## 10. Chốt Phương Án Kỹ Thuật (Resolved Open Questions)

- [X] **Q1:** Cơ chế chống quét lén mã QR từ xa: Dùng **Mã PIN xác thực (Web App)** hoặc **Xác thực SĐT (Zalo Mini App)** do nhân viên cung cấp khi khách vào bàn.
- [ ] **Q2:** Đồng bộ trạng thái: Đề xuất **Webhook từ LS Central (ưu tiên)** hoặc **Client Polling**. (Chờ khách hàng/team LS Central confirm tính khả thi).
- [X] **Q3:** Logic gộp bill: Web App gọi API **Tạo Hóa đơn mới** mỗi lần gửi order. Middleware sẽ gán nhãn `lsSessionId` và `TableNo` để gom nhóm, thu ngân gộp bill thủ công lúc tính tiền. (Theo yêu cầu).

---

## Revision History

| Version | Date       | Author         | Changes                                                   |
| ------- | ---------- | -------------- | --------------------------------------------------------- |
| 1.0     | 2026-05-12 | Taka Solutions | Initial draft                                             |
| 1.1     | 2026-05-12 | Taka Solutions | Cập nhật giải pháp kỹ thuật cho các Open Questions |
