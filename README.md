# SLA Retail Credit Tracker (SLA RBT App)

Ứng dụng giám sát và quản lý tiến độ xử lý hồ sơ tín dụng bán lẻ tại các Chi nhánh theo cam kết chất lượng dịch vụ (SLA - Service Level Agreement).

---

## 🚀 Tính năng cốt lõi

*   **Dashboard Tổng quan**: Theo dõi thời gian thực số lượng hồ sơ đang xử lý, hồ sơ vượt quá thời hạn SLA và năng suất xử lý trung bình.
*   **Quy trình 10 bước chuẩn hóa**: Từ khâu tiếp nhận hồ sơ, định giá tài sản, thẩm định, phê duyệt cho tới giải ngân.
*   **Cơ chế phân quyền tác nghiệp**: Bảo đảm chỉ có phòng ban phụ trách bước hiện tại mới có quyền Bàn giao hoặc Trả lại hồ sơ.
*   **Tính toán giờ làm việc thông minh (Business Hours)**: Tự động loại trừ giờ nghỉ trưa, ngày nghỉ cuối tuần và ngày lễ đã thiết lập ra khỏi thời gian xử lý hồ sơ.
*   **Hệ thống cấu hình cho Admin**: Quản lý tài khoản cán bộ, thống kê hiệu suất, cấu hình thời gian làm việc, danh sách ngày nghỉ lễ và hạn mức SLA của từng bước quy trình.

---

## 📘 Tài liệu Hướng dẫn sử dụng

Vui lòng tham khảo tài liệu hướng dẫn sử dụng chi tiết bằng tiếng Việt tại đây:

👉 **[Hướng dẫn sử dụng chi tiết (HDSD.md)](file:///c:/LongNguyen/vibeCode/sla-rbt-app/HDSD.md)**

Tài liệu hướng dẫn bao gồm:
1. Hướng dẫn cài đặt và vận hành hệ thống (Frontend, Backend, Database).
2. Danh sách các tài khoản demo tương ứng với từng phòng ban nghiệp vụ (`QHKH`, `Thẩm định`, `Định giá`, `Phê duyệt`, `HTTD`).
3. Cách thức thao tác chuyển bước hồ sơ, đính kèm file tài liệu.
4. Hướng dẫn cấu hình giờ làm việc, ngày nghỉ lễ và thời gian SLA định mức dành cho Quản trị viên (Admin).
5. Cơ chế tính toán thời gian và phân loại các trạng thái SLA (Ok - xanh, Cảnh báo - cam, Vượt hạn - đỏ).

---

## 🛠️ Công nghệ sử dụng

### Frontend
*   React 19 + TypeScript
*   Tailwind CSS (Styling hiện đại, Responsive)
*   TanStack Query (React Query)
*   React Router DOM

### Backend & Database
*   Node.js + Express
*   MySQL Database (Trình kết nối `mysql2`)
*   JWT (JSON Web Token) cho xác thực bảo mật
*   Multer (Quản lý tải tệp tin đính kèm)
