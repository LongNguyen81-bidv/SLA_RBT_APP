-- Script tạo CSDL và các Test Data ban đầu cho SLA RBT App
CREATE DATABASE IF NOT EXISTS sla_rbt DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sla_rbt;

-- 1. Bảng Users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL,
    dept VARCHAR(100) NOT NULL,
    dept_code VARCHAR(20) DEFAULT NULL,
    name VARCHAR(255) NOT NULL
);

-- Dữ liệu mẫu (Users - Tương đương mockData)
INSERT INTO users (id, username, password, role, dept, dept_code, name) VALUES
('1', 'admin', '1', 'ADMIN', 'QLNB', '000', 'Trần Quản Trị'),
('2', 'qhkh', '1', 'USER', 'QHKH', '001', 'Nguyễn Văn Quan Hệ'),
('3', 'dinhgia', '1', 'USER', 'Định giá TS', '002', 'Lê Thị Định Giá'),
('4', 'thamdinh', '1', 'USER', 'Thẩm định', '003', 'Phạm Thẩm Định'),
('5', 'pheduyet', '1', 'USER', 'Phê duyệt', '004', 'Hoàng Phê Duyệt'),
('6', 'httd', '1', 'USER', 'HTTD', '005', 'Vũ Hỗ Trợ')
ON DUPLICATE KEY UPDATE username=username;

-- 2. Bảng SLA Steps Config
CREATE TABLE IF NOT EXISTS sla_steps (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sla_hours DECIMAL(10,2) NOT NULL,
    owner VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    internal BOOLEAN DEFAULT TRUE,
    `system` VARCHAR(50) DEFAULT 'LOS'
);

-- Dữ liệu cấu hình 10 bước (thực tế BIDV process)
INSERT INTO sla_steps (id, name, sla_hours, owner, code, internal, `system`) VALUES
(1, 'Tiếp nhận & Kiểm tra hồ sơ', 4.0, 'QHKH', 'TNHS', TRUE, 'LOS'),
(2, 'Nhập liệu hệ thống', 2.0, 'QHKH', 'NLHT', TRUE, 'LOS'),
(3, 'Định giá tài sản', 8.0, 'Định giá TS', 'DGTS', TRUE, 'LOS'),
(4, 'Lập tờ trình', 4.0, 'QHKH', 'LTT', TRUE, 'LOS'),
(5, 'Thẩm định tín dụng', 16.0, 'Thẩm định', 'TDTD', TRUE, 'LOS'),
(6, 'Báo cáo thẩm định', 4.0, 'Thẩm định', 'BCTD', TRUE, 'LOS'),
(7, 'Phê duyệt tín dụng', 8.0, 'Phê duyệt', 'PDTD', TRUE, 'LOS'),
(8, 'Kiểm tra trước giải ngân', 4.0, 'HTTD', 'KTTGN', TRUE, 'LOS'),
(9, 'Ký hợp đồng & Công chứng', 8.0, 'HTTD', 'KHDCC', FALSE, 'LOS'),
(10, 'Giải ngân', 4.0, 'HTTD', 'GN', TRUE, 'Kiên Long/BĐS')
ON DUPLICATE KEY UPDATE name=name;

-- 3. Bảng Loans
CREATE TABLE IF NOT EXISTS loans (
    id VARCHAR(50) PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    dept_code VARCHAR(20) DEFAULT NULL,
    type VARCHAR(100) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    start_time BIGINT NOT NULL,
    officer VARCHAR(100) NOT NULL,
    current_step_id INT NOT NULL,
    assigned_dept VARCHAR(100) NOT NULL,
    created_by VARCHAR(50) DEFAULT NULL,
    CONSTRAINT fk_loan_step FOREIGN KEY (current_step_id) REFERENCES sla_steps(id),
    CONSTRAINT fk_loan_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 3.5 Bảng Loan Documents (file đính kèm)
CREATE TABLE IF NOT EXISTS loan_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT DEFAULT 0,
    uploaded_at BIGINT NOT NULL,
    uploaded_by VARCHAR(50),
    CONSTRAINT fk_doc_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
);

-- 4. Bảng Loan Progress
CREATE TABLE IF NOT EXISTS loan_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id VARCHAR(50) NOT NULL,
    step_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    actual_hours DECIMAL(10,2) DEFAULT 0,
    started_at BIGINT NOT NULL,
    completed_at BIGINT,
    executed_by VARCHAR(100),
    CONSTRAINT fk_progress_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_step FOREIGN KEY (step_id) REFERENCES sla_steps(id)
);

-- 5. Bảng Config
CREATE TABLE IF NOT EXISTS config (
    config_key VARCHAR(50) PRIMARY KEY,
    config_value JSON NOT NULL
);

-- Config mặc định
INSERT INTO config (config_key, config_value) VALUES
('business_hours', '{"workDays": [1, 2, 3, 4, 5], "startHour": 8, "endHour": 17, "lunchBreakEnabled": true, "lunchBreak": {"start": 12, "end": 13}}'),
('holidays', '[{"date": "2026-01-01", "name": "Tết Dương lịch"}]')
ON DUPLICATE KEY UPDATE config_value=config_value;
