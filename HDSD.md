# 📘 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG THEO DÕI SLA TÍN DỤNG BÁN LẺ (SLA RBT APP)

Ứng dụng **SLA Retail Credit Tracker (SLA RBT App)** là công cụ hỗ trợ Chi nhánh ngân hàng quản lý, theo dõi và giám sát tiến độ xử lý hồ sơ tín dụng bán lẻ theo các cam kết về chất lượng dịch vụ (Service Level Agreement - SLA).

---

## 📌 MỤC LỤC

1. [Giới Thiệu Chung](#1-giới-thiệu-chung)
2. [Kiến Trúc & Hướng Dẫn Cài Đặt Vận Hành](#2-kiến-trúc--hướng-dẫn-cài-đặt-vận-hành)
3. [Tài Khoản Demo & Cơ Chế Phân Quyền](#3-tài-khoản-demo--cơ-chế-phân-quyền)
4. [Quy Trình 10 Bước Tín Dụng Chuẩn](#4-quy-trình-10-bước-tín-dụng-chuẩn)
5. [Cơ Chế Tính Toán SLA & Trạng Thái Cảnh Báo](#5-cơ-chế-tính-toán-sla--trạng-thái-cảnh-báo)
6. [Hướng Dẫn Thao Tác - Cán Bộ Nghiệp Vụ](#6-hướng-dẫn-thao-tác---cán-bộ-nghiệp-vụ)
7. [Hướng Dẫn Thao Tác - Quản Trị Viên (Admin)](#7-hướng-dẫn-thao-tác---quản-trị-viên-admin)

---

## 1. GIỚI THIỆU CHUNG

Hệ thống **SLA RBT App** được thiết kế nhằm giải quyết các bài toán:
*   **Theo dõi Real-time**: Giám sát hồ sơ đang ở bước nào trong quy trình tín dụng, do bộ phận nào chịu trách nhiệm.
*   **Phát hiện Điểm nghẽn**: Tự động tính toán thời gian xử lý thực tế và cảnh báo các bước bị chậm trễ hoặc vượt quá hạn mức SLA cho phép.
*   **Minh bạch Hiệu suất**: Thống kê số lượng hồ sơ, thời gian xử lý trung bình và số hồ sơ bị vượt quá thời gian cam kết của từng Cán bộ nghiệp vụ.
*   **Cá nhân hóa theo Chi nhánh**: Cho phép cấu hình giờ làm việc thực tế, thời gian nghỉ trưa, ngày nghỉ lễ và định mức giờ SLA của riêng chi nhánh.

---

## 2. KIẾN TRÚC & HƯỚNG DẪN CÀI ĐẶT VẬN HÀNH

Hệ thống sử dụng mô hình Client-Server độc lập:
*   **Frontend**: ReactJS (React 19), TypeScript, Tailwind CSS, TanStack Query (React Query) để quản lý luồng dữ liệu, Axios.
*   **Backend**: NodeJS, Express.
*   **Database**: MySQL.

### 2.1 Chuẩn bị môi trường
*   Cài đặt **Node.js** (Khuyến nghị phiên bản LTS từ 18 trở lên).
*   Cài đặt cơ sở dữ liệu **MySQL Server** và kích hoạt dịch vụ.

### 2.2 Thiết lập Cơ sở dữ liệu (Database)
1. Đăng nhập vào MySQL Server và chạy script tạo database mẫu trong file `server/init-db.sql`:
   ```sql
   source server/init-db.sql;
   ```
   *Lưu ý: Script này sẽ tự động tạo database `sla_rbt`, thiết lập các bảng, cấu hình ban đầu cùng danh sách tài khoản demo và dữ liệu hồ sơ mẫu.*

### 2.3 Thiết lập & Khởi chạy Backend
1. Di chuyển vào thư mục backend:
   ```bash
   cd server
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Tạo và chỉnh sửa cấu hình môi trường trong file `server/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=Mật_khẩu_mysql_của_bạn
   DB_NAME=sla_rbt
   PORT=5000
   ```
4. Khởi chạy Backend Server:
   ```bash
   node index.js
   ```
   *Server sẽ lắng nghe tại cổng `http://localhost:5000`.*

### 2.4 Thiết lập & Khởi chạy Frontend
1. Di chuyển về thư mục gốc của dự án:
   ```bash
   cd ..
   ```
2. Cài đặt các thư viện Frontend:
   ```bash
   npm install
   ```
3. Khởi chạy ứng dụng Client (chế độ phát triển):
   ```bash
   npm start
   ```
   *Trình duyệt sẽ tự động mở trang: `http://localhost:3000`.*

---

## 3. TÀI KHOẢN DEMO & CƠ CHẾ PHÂN QUYỀN

Để hỗ trợ kiểm thử và demo toàn bộ quy trình liên phòng ban, hệ thống đã cài đặt sẵn các tài khoản tương ứng với các vai trò nghiệp vụ:

### 3.1 Bảng tài khoản mẫu (Tất cả mật khẩu mặc định là: `1`)

| Tên Đăng Nhập | Họ và Tên | Vai Trò (Role) | Phòng Ban (Department) | Quyền hạn chính |
| :--- | :--- | :--- | :--- | :--- |
| **admin** | Trần Quản Trị | **ADMIN** | QLNB (Quản lý nội bộ) | Quyền tối cao (Xem/Sửa/Xóa mọi thứ, đổi cấu hình hệ thống) |
| **qhkh** | Nguyễn Văn Quan Hệ | USER | **QHKH** (Quan hệ khách hàng) | Khởi tạo hồ sơ, thực hiện Bước 1, 2, 4 |
| **dinhgia** | Lê Thị Định Giá | USER | **Định giá TS** | Định giá tài sản bảo đảm (Bước 3) |
| **thamdinh** | Phạm Thẩm Định | USER | **Thẩm định** | Thẩm định tín dụng và lập Báo cáo (Bước 5, 6) |
| **pheduyet** | Hoàng Phê Duyệt | USER | **Phê duyệt** | Phê duyệt cấp tín dụng (Bước 7) |
| **httd** | Vũ Hỗ Trợ | USER | **HTTD** (Hỗ trợ tín dụng) | Các bước tác nghiệp sau phê duyệt (Bước 8, 9, 10) |

### 3.2 Cơ chế phân quyền xử lý hồ sơ (Workflow Handover Guard)
*   **Quyền tạo hồ sơ**: Chỉ tài khoản thuộc phòng ban `QHKH` hoặc `ADMIN` mới có nút tạo hồ sơ mới.
*   **Quyền sửa/xóa hồ sơ**: Chỉ người trực tiếp tạo ra hồ sơ đó hoặc `ADMIN` mới được quyền chỉnh sửa thông tin chung hoặc xóa hồ sơ.
*   **Quyền chuyển tiếp/trả lại hồ sơ (Tác nghiệp)**:
    *   Hồ sơ tại mỗi thời điểm chỉ nằm ở một Bước tích cực với Phòng ban phụ trách xác định.
    *   **Chỉ cán bộ thuộc Phòng ban phụ trách bước đó** (và đang trong trạng thái đăng nhập) mới nhìn thấy các nút hành động:
        *   `← Trả lại`: Chuyển hồ sơ ngược về bước trước đó (yêu cầu bổ sung thông tin hoặc chỉnh sửa).
        *   `Hoàn thành & Bàn giao →` hoặc `Xác nhận kết quả & Đi tiếp`: Hoàn thành bước hiện tại, hệ thống tự động ghi nhận thời gian thực hiện của bộ phận và chuyển giao hồ sơ sang bộ phận phụ trách bước tiếp theo.
    *   Các tài khoản khác bộ phận hoặc Admin chỉ có quyền xem chi tiết tiến độ mà không thể thực hiện chuyển bước (để bảo toàn quy trình tác nghiệp thực tế).

---

## 4. QUY TRÌNH 10 BƯỚC TÍN DỤNG CHUẨN

Hệ thống được cấu hình sẵn quy trình 10 bước tín dụng bán lẻ chuẩn của ngân hàng:

| ID | Mã Bước | Tên Bước Tác Nghiệp | Bộ Phận Xử Lý (Owner) | SLA Định Mức (Giờ) | Hệ Thống Xử lý | Phân Loại |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | TNHS | Tiếp nhận & Kiểm tra hồ sơ | QHKH | 4.0 | Hệ thống LOS | Nội bộ |
| **2** | NLHT | Nhập liệu hệ thống | QHKH | 2.0 | Hệ thống LOS | Nội bộ |
| **3** | DGTS | Định giá tài sản | Định giá TS | 8.0 | Hệ thống LOS | Nội bộ |
| **4** | LTT | Lập tờ trình | QHKH | 4.0 | Hệ thống LOS | Nội bộ |
| **5** | TDTD | Thẩm định tín dụng | Thẩm định | 16.0 | Hệ thống LOS | Nội bộ |
| **6** | BCTD | Báo cáo thẩm định | Thẩm định | 4.0 | Hệ thống LOS | Nội bộ |
| **7** | PDTD | Phê duyệt tín dụng | Phê duyệt | 8.0 | Hệ thống LOS | Nội bộ |
| **8** | KTTGN | Kiểm tra trước giải ngân | HTTD | 4.0 | Hệ thống LOS | Nội bộ |
| **9** | KHDCC | Ký hợp đồng & Công chứng | HTTD | 8.0 | Hệ thống LOS | **Bên ngoài (\*)** |
| **10** | GN | Giải ngân | HTTD | 4.0 | Hệ thống core Kiên Long/BĐS | Nội bộ |

> [!NOTE]
> **(\*) Bước ngoài ngân hàng (External Step)**: SLA của bước này mang tính chất tham chiếu theo thực tế công chứng/đăng ký giao dịch. Chi nhánh có quyền chủ động điều chỉnh hoặc bỏ qua cảnh báo quá hạn dựa theo tính chất tài sản bảo đảm.

---

## 5. CƠ CHẾ TÍNH TOÁN SLA & TRẠNG THÁI CẢNH BÁO

Điểm vượt trội của **SLA RBT App** là cách tính thời gian xử lý hồ sơ thông minh, phản ánh chính xác giờ làm việc thực tế của Ngân hàng thay vì đếm giờ vật lý 24/24.

### 5.1 Nguyên tắc tính Business Hours (Giờ làm việc)
Khi tính thời gian thực hiện (`actualHours`) của một bước, hệ thống sẽ tự động:
1.  **Chỉ tính thời gian trong khung giờ làm việc** (Ví dụ: Từ 08:00 đến 17:00).
2.  **Khấu trừ thời gian nghỉ trưa** nếu khoảng thời gian xử lý giao cắt với giờ nghỉ trưa (Ví dụ: từ 12:00 đến 13:00).
3.  **Bỏ qua các ngày nghỉ cuối tuần** không làm việc (Ví dụ: Thứ Bảy và Chủ Nhật).
4.  **Bỏ qua các ngày nghỉ lễ** đã được khai báo trên hệ thống.

*Ví dụ: Hồ sơ bàn giao cho Thẩm định lúc 16:30 chiều thứ Sáu, và Thẩm định hoàn thành bàn giao lúc 09:30 sáng thứ Hai tuần sau. Khung giờ làm việc cấu hình là 8h-17h (nghỉ trưa 12h-13h), nghỉ thứ 7 và CN.*
* *Thời gian thực tế đếm: Từ 16:30 thứ Sáu $\rightarrow$ 17:00 thứ Sáu (30 phút) + Từ 08:00 thứ Hai $\rightarrow$ 09:30 thứ Hai (1.5 giờ) = **2.0 giờ làm việc**.*
* *Toàn bộ ngày thứ Bảy, Chủ Nhật và đêm đều bị loại trừ khỏi phép tính.*

### 5.2 Các mức Trạng thái SLA
Dựa trên tỷ lệ giữa **Thời gian thực tế xử lý (`actualHours`)** và **Thời gian SLA định mức (`slaHours`)**, bước sẽ được dán nhãn trạng thái trực quan:

*   🟢 **Đúng hạn (OK)**:
    *   *Điều kiện*: $\frac{\text{actualHours}}{\text{slaHours}} < 0.8$
    *   *Hiển thị*: Dot màu xanh lá cây. Biểu thị hồ sơ được xử lý nhanh, an toàn.
*   🟡 **Cần chú ý (Warning)**:
    *   *Điều kiện*: $0.8 \le \frac{\text{actualHours}}{\text{slaHours}} \le 1.0$
    *   *Hiển thị*: Dot màu cam. Cảnh báo hồ sơ sắp sửa quá hạn, cần ưu tiên hoàn thành gấp.
*   🔴 **Vượt SLA (Exceeded)**:
    *   *Điều kiện*: $\frac{\text{actualHours}}{\text{slaHours}} > 1.0$
    *   *Hiển thị*: Dot màu đỏ. Hồ sơ đã xử lý quá thời gian quy định của bước.

---

## 6. HƯỚNG DẪN THAO TÁC - CÁN BỘ NGHIỆP VỤ

### 6.1 Đăng nhập Hệ thống
1.  Truy cập giao diện trang web. Giao diện Login xuất hiện.
2.  Nhập Tên đăng nhập (ví dụ: `qhkh`) và Mật khẩu (ví dụ: `1`).
3.  Nhấn nút **Đăng nhập**.

### 6.2 Sử dụng Trang Dashboard (Tổng quan)
Sau khi đăng nhập thành công, giao diện mặc định hiển thị trang Dashboard:
1.  **Các thẻ chỉ số đo lường (Metric Cards)**:
    *   *Hồ sơ đang xử lý*: Tổng số hồ sơ chưa hoàn thành xong bước 10.
    *   *Vượt SLA*: Số bước bị quá hạn (màu đỏ) hiện hữu trên toàn hệ thống.
    *   *Hoàn thành trung bình*: Số bước hoàn thành bình quân trên mỗi hồ sơ.
2.  **Danh sách Hồ sơ Cần chú ý / Đang xử lý**:
    *   Hiển thị danh sách hồ sơ dạng bảng/lưới với thông tin Khách hàng, Loại vay, Số tiền, Người xử lý.
    *   **Thanh tiến độ SLA (SLA Bar)**: Trực quan hóa tiến trình 10 bước. Từng block tương ứng với một bước. Màu sắc của block phản ánh trạng thái bước đó (Xanh: đúng hạn, Cam: sắp quá hạn, Đỏ: quá hạn, Xám: chưa thực hiện).
    *   Click vào bất kỳ hồ sơ nào trên Dashboard sẽ tự động dẫn bạn đến trang chi tiết của hồ sơ đó.

### 6.3 Quản lý Hồ sơ tín dụng (Phân hệ "Hồ sơ")
Click vào tab **Hồ sơ** trên thanh điều hướng đầu trang:
1.  **Tạo mới hồ sơ (Chỉ QHKH & Admin)**:
    *   Nhấn nút `+ Tạo hồ sơ` ở cột danh sách bên trái.
    *   Nhập đầy đủ: Tên khách hàng, Mã Chi nhánh/PGD xử lý, Loại hình cấp tín dụng, Số tiền đề xuất.
    *   Nhấn nút **Tạo hồ sơ**. Hồ sơ mới được tạo sẽ tự động xuất hiện tại Bước 1 (Tiếp nhận & Kiểm tra hồ sơ) gán cho bộ phận `QHKH`.
2.  **Sửa / Xóa thông tin chung của hồ sơ**:
    *   Rê chuột vào thẻ tên hồ sơ ở cột bên trái.
    *   Nhấn nút ✏️ (Sửa) để thay đổi thông tin Khách hàng, số tiền, loại vay...
    *   Nhấn nút 🗑️ (Xóa) để xóa hẳn hồ sơ ra khỏi hệ thống (Chỉ người tạo hoặc Admin có quyền này).

### 6.4 Tác nghiệp Bàn giao & Trả lại hồ sơ (Tại bảng chi tiết hồ sơ)
Tại màn hình chi tiết hồ sơ (cột bên phải):
1.  **Nếu bạn là Bộ phận đang chịu trách nhiệm xử lý bước hiện tại**: Bạn sẽ thấy các nút hành động nổi bật nằm bên cạnh bước đó.
2.  **Bàn giao đi tiếp**:
    *   Nhấn nút `Hoàn thành & Bàn giao →` (đối với bước nội bộ) hoặc `Xác nhận kết quả & Đi tiếp` (đối với bước ngoài ngân hàng).
    *   Xác nhận hộp thoại hiện lên. Hệ thống sẽ đóng bước này, ghi nhận thời gian thực tế xử lý, đồng thời chuyển trạng thái sang bước tiếp theo và gán trách nhiệm cho bộ phận kế tiếp.
3.  **Trả lại hồ sơ về bộ phận trước**:
    *   Nếu phát hiện hồ sơ bị lỗi thông tin hoặc thiếu giấy tờ từ bộ phận trước đó, nhấn nút `← Trả lại`.
    *   Hồ sơ sẽ quay trở lại bước trước đó và gán lại cho bộ phận trước xử lý lại. Hệ thống sẽ tự động đặt lại thời gian bắt đầu của bước trước đó để bắt đầu tính thời gian làm lại (rework).

### 6.5 Đính kèm và quản lý tài liệu (Documents)
Ở phía dưới cùng của bảng chi tiết hồ sơ là phân hệ tài liệu đính kèm:
1.  **Tải tài liệu lên**:
    *   Nhấn chọn file hoặc kéo thả tài liệu (PDF, hình ảnh, văn bản...) vào khung tải lên.
    *   Hệ thống cho phép chọn tối đa 5 file cùng lúc.
    *   Nhấn nút tải lên. Tài liệu sẽ được lưu trữ vật lý trên server và liên kết trực tiếp vào hồ sơ.
2.  **Xem và Tải xuống tài liệu**:
    *   Danh sách file hiển thị kèm thông tin dung lượng và thời gian upload.
    *   Nhấp vào tên tài liệu để tải trực tiếp file về máy tính.
3.  **Xóa tài liệu**:
    *   Nhấn nút 🗑️ bên cạnh file để xóa file khỏi hệ thống (Chỉ áp dụng với tài khoản tạo hồ sơ hoặc Admin).

---

## 7. HƯỚNG DẪN THAO TÁC - QUẢN TRỊ VIÊN (ADMIN)

Tài khoản Admin có đầy đủ các quyền nghiệp vụ và được mở rộng thêm 3 tab chức năng quản lý hệ thống:

### 7.1 Báo cáo Hiệu suất Nhân sự (Tab "Cán bộ")
Giao diện này hiển thị bảng thống kê hiệu suất tác nghiệp của toàn bộ cán bộ đăng ký trên hệ thống:
*   **Tổng số hồ sơ xử lý**: Số bước/hồ sơ cán bộ đã thực hiện thành công.
*   **Thời gian xử lý trung bình (giờ)**: Tổng số giờ làm việc thực tế chia cho số bước đã xử lý.
*   **Số lần vượt hạn SLA**: Tổng số lần cán bộ bàn giao bước bị trễ so với định mức giờ quy định.
*   *Lợi ích*: Giúp Ban giám đốc đánh giá đúng năng lực xử lý, định biên lao động và phát hiện cá nhân/bộ phận quá tải.

### 7.2 Quản lý Tài khoản (Tab "Người dùng")
Admin có thể quản trị cơ sở dữ liệu người dùng tại đây:
1.  **Thêm người dùng mới**:
    *   Nhập đầy đủ thông tin: Họ tên, Tên đăng nhập (username), Vai trò (ADMIN/USER), Bộ phận (`QHKH`, `Thẩm định`, `Định giá TS`, `Phê duyệt`, `HTTD`), Mã phòng ban.
    *   Nhấn nút **Thêm người dùng**.
    *   **QUAN TRỌNG**: Hệ thống sẽ tự động tạo ngẫu nhiên mật khẩu gồm 6 chữ số cho tài khoản mới và hiển thị duy nhất 1 lần trên màn hình. Admin cần ghi lại mật khẩu này để bàn giao cho nhân sự.
2.  **Sửa thông tin người dùng**: Nhấn nút `Sửa` trên dòng thông tin cán bộ để thay đổi Tên hiển thị, Vai trò hoặc Phòng ban công tác.
3.  **Khôi phục mật khẩu (Reset Password)**: Nhấn nút `Khôi phục mật khẩu` đối với nhân viên quên mật khẩu. Hệ thống sẽ cấp lại một mật khẩu ngẫu nhiên mới gồm 6 chữ số.
4.  **Xóa người dùng**: Nhấn nút `Xóa` đối với các tài khoản nhân sự đã nghỉ việc hoặc luân chuyển. *Lưu ý: Không thể xóa tài khoản Admin gốc.*

### 7.3 Cấu hình Tham số Hệ thống (Tab "Cấu hình")
Đây là khu vực quan trọng nhất để điều chỉnh công cụ đo lường SLA phù hợp với thực tế vận hành:

1.  **Cấu hình Giờ làm việc (Working Hours)**:
    *   *Khung giờ làm việc*: Chọn Giờ bắt đầu và Giờ kết thúc làm việc trong ngày.
    *   *Nghỉ trưa*: Bật/Tắt tính năng nghỉ trưa và cấu hình khung giờ nghỉ (ví dụ: `12:00` đến `13:00`). Nếu bật, thời gian này sẽ được tự động trừ ra khỏi SLA.
    *   *Ngày làm việc trong tuần*: Bật/Tắt các ngày làm việc trong tuần từ Thứ Hai đến Chủ Nhật bằng cách nhấp chọn các nút tương ứng (nút xanh là ngày làm việc, nút xám là ngày nghỉ).
2.  **Cấu hình Ngày nghỉ lễ (Holidays)**:
    *   Để thêm ngày nghỉ lễ (không tính SLA): Chọn Ngày nghỉ trên lịch, nhập Tên dịp lễ (Ví dụ: Quốc khánh 2/9), rồi nhấn nút `+ Thêm`.
    *   Để xóa ngày nghỉ lễ: Nhấp vào dấu `✕` bên cạnh ngày lễ trong danh sách phân loại theo tháng.
3.  **Cấu hình Định mức SLA từng bước (SLA Config)**:
    *   Bảng hiển thị danh sách 10 bước nghiệp vụ hiện hành.
    *   Nhập số giờ quy định mới trực tiếp vào cột **SLA Định mức (Giờ)** của bước tương ứng.
    *   Nhấn nút **Lưu cấu hình** để áp dụng. Định mức mới sẽ ngay lập tức được áp dụng cho việc tính toán trạng thái SLA của toàn bộ hồ sơ đang xử lý.
