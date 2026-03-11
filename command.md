# 📋 SLA RBT App — Command & Progress Tracker

> Cập nhật: 2026-03-10  
> Trạng thái: Hoàn tất Sprint 1–7, đang chuẩn bị Sprint 8 (CI/CD & Security)

---

## 🔧 Các lệnh thường dùng

```bash
# === FRONTEND ===
# Khởi chạy development server (port 3000)
npm start

# Build production
npm run build

# Chạy tests
npm test

# Test + coverage report
npm run test:coverage

# Format code
npm run format

# Kiểm tra format
npm run format:check

# Lint code
npm run lint

# Lint + auto fix
npm run lint:fix

# Chạy SonarQube scan
npm run sonar

# === BACKEND (chạy trong thư mục /server) ===
# Khởi chạy backend server (port 5000)
cd server && node index.js

# Khởi tạo database MySQL
cd server && node run-init.js

# Seed dữ liệu mẫu (qua API)
curl -X POST http://localhost:5000/api/test/seed
```

### Tài khoản đăng nhập

| Username | Password | Role | Phòng ban | Mã PB |
|---|---|---|---|---|
| `admin` | `1` | ADMIN | QLNB | 000 |
| `qhkh` | `1` | USER | QHKH | 001 |
| `dinhgia` | `1` | USER | Định giá TS | 002 |
| `thamdinh` | `1` | USER | Thẩm định | 003 |
| `pheduyet` | `1` | USER | Phê duyệt | 004 |
| `httd` | `1` | USER | HTTD | 005 |

---

## 📊 Trạng thái tổng quan

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Refactor cấu trúc | ✅ Hoàn tất | Modular: components, pages, hooks, context, services, utils, constants, types |
| Tailwind CSS | ✅ Hoàn tất | 100% Tailwind CSS, BIDV light theme, responsive |
| TypeScript | ✅ Hoàn tất | 100% codebase TypeScript, 13 interfaces/types |
| React Router | ✅ Hoàn tất | 8 routes (incl. `/login`, `/users`, `/loans/:id`, `*` → 404) |
| Authentication | ✅ Hoàn tất | AuthContext + Login page + ProtectedRoute |
| Role-Based Access | ✅ Hoàn tất | ADMIN-only: `/staff`, `/users`, `/config` |
| React Query | ✅ Hoàn tất | 6 custom hooks (useLoans, useSLAConfig, useStaffPerf, useUsers + CRUD mutations) |
| Config Management | ✅ Hoàn tất | ConfigContext: giờ làm việc, nghỉ lễ, lunch break |
| Business Hours Calc | ✅ Hoàn tất | `calculateBusinessHours()` với ngày lễ, giờ nghỉ trưa, workDays |
| Backend Node.js | ✅ Hoàn tất | Express + MySQL (9 API endpoints, 500 LOC) |
| Database MySQL | ✅ Hoàn tất | 5 tables: users, sla_steps, loans, loan_progress, config |
| SLA Steps (10 bước) | ✅ Hoàn tất | Đầy đủ 10 bước quy trình RBT BIDV từ DB |
| User Management (CRUD) | ✅ Hoàn tất | Tạo/Sửa/Xóa/Reset password người dùng |
| Staff Performance | ✅ Hoàn tất | Hiển thị tất cả cán bộ, kể cả chưa có dữ liệu hồ sơ |
| Number Formatting | ✅ Hoàn tất | `formatNumber()` vi-VN locale (dấu chấm phân cách nghìn) |
| SLA Hour Precision | ✅ Hoàn tất | `hourToTime()` hiển thị giờ:phút chính xác (vd: 7:30) |
| Prettier + ESLint | ✅ Hoàn tất | `.prettierrc` + `eslint-config-prettier` |
| Testing | ⚠️ Cơ bản | 10 test files, coverage cần nâng cao |
| CI/CD | ⚠️ Cơ bản | GitHub Actions `ci.yml` (lint, test, build) — chưa deploy |
| SonarQube | ⚠️ Cơ bản | `sonar-project.properties` đã cấu hình, chưa chạy server |

---

## 🛢️ Backend API Endpoints

| # | Method | Endpoint | Mô tả |
|---|---|---|---|
| 1 | POST | `/api/auth/login` | Đăng nhập (username + password → user object) |
| 2 | GET | `/api/config` | Lấy cấu hình giờ làm việc + ngày lễ |
| 3 | GET | `/api/sla-steps` | Lấy 10 bước SLA config |
| 4 | GET | `/api/loans` | Danh sách hồ sơ + progress + steps |
| 5 | POST | `/api/loans/:loanId/steps/:stepId` | Chuyển bước (FORWARD / BACKWARD) |
| 6 | POST | `/api/test/seed` | Tạo dữ liệu mẫu (3 hồ sơ) |
| 7 | GET | `/api/users` | Danh sách người dùng |
| 8 | POST | `/api/users` | Tạo người dùng mới |
| 9 | DELETE | `/api/users/:id` | Xóa người dùng |
| 10 | PUT | `/api/users/:id` | Cập nhật thông tin người dùng |
| 11 | POST | `/api/users/:id/reset-password` | Khôi phục mật khẩu |
| 12 | GET | `/api/staff/performance` | Hiệu suất cán bộ (aggregate từ loan_progress) |

---

## 🛢️ Database Schema (MySQL)

```
sla_rbt/
├── users           ← id, username, password, role, dept, dept_code, name
├── sla_steps       ← id, name, sla_hours, owner, code, internal, system
├── loans           ← id, customer, branch, type, amount, start_time, officer, current_step_id, assigned_dept
├── loan_progress   ← id, loan_id, step_id, completed, actual_hours, started_at, completed_at, executed_by
└── config          ← config_key, config_value (JSON)
```

---

## 🐛 Issues & Code Smells hiện tại

| # | File / Khu vực | Mô tả | Mức độ |
|---|---|---|---|
| 1 | `server/index.js` | Password lưu plaintext trong DB, chưa hash (bcrypt) | 🔴 Cao |
| 2 | `server/index.js` | Chưa có JWT token, auth chỉ verify user/pass rồi trả user object | 🔴 Cao |
| 3 | `server/index.js` | Không có middleware xác thực — tất cả endpoint đều public | 🔴 Cao |
| 4 | `server/index.js` | Server file monolith 500 LOC, chưa tách routes/controllers | 🟡 Trung bình |
| 5 | `src/services/api.ts` | `USE_MOCK = false` nhưng code mock vẫn còn (dead code ~100 LOC) | 🟡 Trung bình |
| 6 | `src/pages/UsersTab.tsx` | File lớn 462 LOC, nên tách thành sub-components | 🟡 Trung bình |
| 7 | `src/utils/` | `helpers_backup.ts` file thừa chưa xoá | 🟢 Thấp |
| 8 | Root dir | Nhiều file tạm: `fix-*.js`, `*.txt`, `*.log`, `current_UsersTab.txt` | 🟢 Thấp |
| 9 | Testing | Thiếu test cho: UsersTab, StaffPerf, ConfigTab, LoanDetailPanel, hooks/useUsers | 🟡 Trung bình |
| 10 | `server/` | Chưa có unit test cho backend API | 🟡 Trung bình |

---

## 🗺️ Roadmap — Tiến trình Sprint

### Sprint 1: Chuyển đổi Tailwind CSS & Fix Bugs ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-03

- [x] Fix bug `ConfigTab.js` màu text
- [x] Fix `App.test.js` (viết lại test cơ bản)
- [x] Chuyển 9 components sang Tailwind CSS
- [x] Chuyển 4 pages sang Tailwind CSS
- [x] Chuyển `App.js` sang Tailwind
- [x] Thêm responsive breakpoints
- [x] Kiểm tra build: `npm run build` ✅

### Sprint 2: React Router & Navigation ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-03

- [x] Cài `react-router-dom`
- [x] Routes: `/`, `/loans`, `/loans/:id`, `/staff`, `/config`, `/login`
- [x] `AppHeader` → `NavLink` navigation
- [x] Trang 404 NotFound
- [x] Test routing

### Sprint 3: API Layer & React Query ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-03

- [x] Cài `@tanstack/react-query` + `axios`
- [x] Tạo `src/services/api.ts` (authApi, loansApi, configApi, staffApi, usersApi, testApi)
- [x] Custom hooks: `useLoans`, `useSLAConfig`, `useStaffPerf`, `useUsers` + CRUD mutations
- [x] Loading / Error states
- [x] Mock data fallback
- [x] Authentication (AuthContext, Login page, ProtectedRoute)
- [x] Role-based authorization (ADMIN routes)

### Sprint 3.5: Admin Configuration ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-03

- [x] `ConfigContext` (giờ làm việc, ngày lễ, lunch break)
- [x] `WorkingHoursConfig` component
- [x] `HolidaysConfig` component
- [x] `calculateBusinessHours()` utility
- [x] Unit tests cho `calculateBusinessHours`

### Sprint 4: Fix Issues & Polish ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-04

- [x] Fix `index.html`: thêm Google Fonts link, viewport meta, favicon
- [x] Fix `App.test.tsx`: wrap với `AuthProvider` + `ConfigProvider`
- [x] Chạy `npm run format` để đồng bộ formatting
- [x] Fix code smell `LoanCardComp.tsx` (nhận `SLA_STEPS` qua props)
- [x] Fix `getElapsedHours` đọc config qua Context thay vì localStorage

### Sprint 5: TypeScript Migration ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-04

- [x] Đổi đuôi file source từ `.js` sang `.ts` / `.tsx`
- [x] Định nghĩa 13 Types/Interfaces: `User`, `Role`, `Loan`, `SLAStep`, `StepProgress`, `LoansData`, `StaffPerf`, `Holiday`, `LunchBreak`, `BusinessConfig`, `BusinessHoursCalcConfig`, `ConfigContextType`, `SLAStatus`
- [x] Fix các lỗi Type check của TypeScript (`any`, implicit types)
- [x] Xác nhận npm test và npm run build hoạt động trơn tru với TS

### Sprint 6: Testing & Quality Assurance ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-04

- [x] Unit tests: helpers + hooks (`useLoans`, `useSLAConfig`)
- [x] Component tests: `StatusBadge`, `MetricCard`, `SLABar`
- [x] Page tests: `Dashboard`, `Login`
- [x] Cấu hình SonarQube (`sonar-project.properties`)

### Sprint 7: Backend & Data Integration ✅
> Trạng thái: **HOÀN TẤT** — 2026-03-10

- [x] Setup Node.js + Express server (`server/index.js`, 500 LOC)
- [x] MySQL database: 5 tables (users, sla_steps, loans, loan_progress, config)
- [x] Schema init script: `server/init-db.sql`
- [x] API Integration: `USE_MOCK = false`, frontend gọi trực tiếp backend
- [x] 10 bước SLA đầy đủ từ database (không hardcode)
- [x] API CRUD quản lý người dùng (GET/POST/PUT/DELETE + reset password)
- [x] Trang UsersTab: tạo, sửa, xóa, reset mật khẩu người dùng
- [x] API hiệu suất cán bộ: aggregate từ `loan_progress` JOIN `users`
- [x] Tab Hiệu suất hiển thị tất cả cán bộ (kể cả chưa có dữ liệu)
- [x] Fix định dạng số (formatNumber vi-VN), precision giờ (hourToTime)
- [x] Fix logic chuyển bước FORWARD / BACKWARD
- [x] Fix department code format 3-digit (001, 002, ...)
- [x] Proxy config: `"proxy": "http://localhost:5000"` trong `package.json`
- [ ] Authentication thật (JWT token, hash password)
- [ ] Tích hợp SSO / Active Directory của BIDV
- [ ] API HR lấy lịch làm việc tự động

### Sprint 8: Security, Refactor Backend & CI/CD
> Trạng thái: **LÊN KẾ HOẠCH**

- [ ] Hash password với bcrypt
- [ ] JWT token authentication (access + refresh token)
- [ ] Middleware xác thực: bảo vệ tất cả API endpoints
- [ ] Tách `server/index.js` → routes, controllers, middleware
- [ ] HTTPS, TLS/SSL, CORS cấu hình production
- [ ] Header Security (CSP, X-Frame-Options)
- [ ] Xoá mock code còn sót trong `api.ts`
- [ ] Xoá file tạm: `fix-*.js`, `*.txt` logs, `helpers_backup.ts`
- [ ] Nâng cấp GitHub Actions: thêm deploy stage, build Docker image
- [ ] Setup backend unit tests (Jest / Supertest)

### Sprint 9: UAT & Triển khai Chi nhánh (Pilot → Rollout)
> Trạng thái: **LÊN KẾ HOẠCH**

- [ ] Triển khai lên server On-Premise / Private Cloud
- [ ] Cấu hình môi trường UAT, chọn 1-2 CN Pilot
- [ ] Đào tạo cán bộ tín dụng & cấp quản lý
- [ ] Load Testing / Performance Tuning
- [ ] Roll-out toàn hệ thống

---

## 📁 Cấu trúc thư mục hiện tại

```
sla-rbt-app/
├── .github/
│   └── workflows/
│       └── ci.yml                ← GitHub Actions (lint, test, build)
├── public/
│   └── index.html                ← Entry HTML (fonts, meta, favicon)
├── server/                        ← ⭐ BACKEND (Node.js + Express)
│   ├── config/
│   │   └── db.js                 ← MySQL2 connection pool
│   ├── index.js                  ← Server chính (500 LOC, 12 endpoints)
│   ├── init-db.sql               ← Schema + seed data (5 tables)
│   ├── run-init.js               ← Script khởi tạo DB
│   ├── migrate-dept-code.js      ← Migration script dept_code
│   ├── .env                      ← DB credentials (gitignored)
│   └── package.json              ← express, mysql2, cors, dotenv
├── src/
│   ├── components/                ← 12 components (3 có test)
│   │   ├── AppHeader.tsx         ← Navigation bar (NavLink)
│   │   ├── HolidaysConfig.tsx    ← Admin: quản lý ngày lễ
│   │   ├── LoanCardComp.tsx      ← Card hiển thị hồ sơ vay
│   │   ├── LoanDetailPanel.tsx   ← Chi tiết hồ sơ + hành động FORWARD/BACKWARD
│   │   ├── MetricCard.tsx        ← Card số liệu dashboard
│   │   ├── MetricCard.test.tsx   ← ✅ Test
│   │   ├── ProtectedRoute.tsx    ← Route guard (auth + role)
│   │   ├── SLABar.tsx            ← Thanh progress SLA
│   │   ├── SLABar.test.tsx       ← ✅ Test
│   │   ├── SLAConfigPanel.tsx    ← Hiển thị cấu hình SLA
│   │   ├── SLAStepsTable.tsx     ← Bảng các bước SLA
│   │   ├── StatusBadge.tsx       ← Badge trạng thái (Ok/Warning/Exceeded/Pending)
│   │   ├── StatusBadge.test.tsx  ← ✅ Test
│   │   ├── StepCard.tsx          ← Card từng bước xử lý
│   │   └── WorkingHoursConfig.tsx← Admin: cấu hình giờ làm việc
│   ├── pages/                     ← 7 pages (3 có test)
│   │   ├── ConfigTab.tsx         ← Trang cấu hình (ADMIN only)
│   │   ├── Dashboard.tsx         ← Trang tổng quan
│   │   ├── Dashboard.test.tsx    ← ✅ Test
│   │   ├── LoansTab.tsx          ← Danh sách hồ sơ vay
│   │   ├── Login.tsx             ← Trang đăng nhập
│   │   ├── Login.test.tsx        ← ✅ Test
│   │   ├── NotFound.tsx          ← Trang 404
│   │   ├── StaffPerf.tsx         ← Hiệu suất cán bộ (ADMIN only)
│   │   └── UsersTab.tsx          ← Quản lý người dùng CRUD (ADMIN only)
│   ├── hooks/                     ← 4 custom hooks (2 có test)
│   │   ├── useLoans.ts           ← Query: danh sách hồ sơ
│   │   ├── useLoans.test.tsx     ← ✅ Test
│   │   ├── useSLAConfig.ts       ← Query: SLA steps config
│   │   ├── useSLAConfig.test.tsx ← ✅ Test
│   │   ├── useStaffPerf.ts       ← Query: hiệu suất cán bộ
│   │   └── useUsers.ts           ← Query + Mutations: CRUD users
│   ├── context/                   ← 2 React Contexts
│   │   ├── AuthContext.tsx       ← Authentication state
│   │   └── ConfigContext.tsx     ← Business config (giờ làm, lễ)
│   ├── services/
│   │   └── api.ts                ← API layer (6 API groups, USE_MOCK=false)
│   ├── types/
│   │   └── index.ts              ← 13 TS Interfaces/Types
│   ├── utils/
│   │   ├── helpers.ts            ← getSLAStatus, formatHours, hourToTime, formatNumber, calculateBusinessHours
│   │   └── helpers.test.ts       ← ✅ Test (business hours calc)
│   ├── constants/
│   │   └── mockData.ts           ← Mock data fallback
│   ├── App.tsx                    ← Root component (Routes, data loading)
│   ├── App.test.tsx               ← ✅ Smoke test
│   ├── index.tsx                  ← Entry (QueryClient, BrowserRouter, Providers)
│   └── index.css                  ← Tailwind directives + base styles
├── sonar-project.properties       ← SonarQube config
├── tailwind.config.js             ← BIDV color palette + fonts
├── tsconfig.json                  ← TypeScript config
├── postcss.config.js
├── .prettierrc
├── .prettierignore
├── .eslintignore
└── package.json                   ← React 19 + TS + Query + Router + Axios
```

---

## 📊 Thống kê dự án

| Metric | Value |
|---|---|
| **Frontend** | |
| Tổng files source (src/) | ~35 files |
| Components | 12 (+ 3 test files) |
| Pages | 7 (+ 3 test files) |
| Custom Hooks | 4 (+ 2 test files) |
| Contexts | 2 |
| Services | 1 (api.ts — 260 LOC) |
| Types / Interfaces | 13 |
| Utils | 2 (helpers.ts + test) |
| Test files (tổng) | 10 |
| **Backend** | |
| Server code | 1 file (index.js — 500 LOC) |
| API Endpoints | 12 |
| Database tables | 5 |
| SLA Steps | 10 bước |
| **Dependencies (Frontend)** | |
| Runtime | React 19, ReactDOM, Router 6, React Query 5, Axios |
| DevDependencies | TypeScript 5, Tailwind 3, PostCSS, Prettier, ESLint |
| **Dependencies (Backend)** | |
| Runtime | Express 5, MySQL2, CORS, dotenv |
| **Tooling** | |
| CI/CD | GitHub Actions (ci.yml) |
| Code Quality | SonarQube (sonar-project.properties) |
| Formatter | Prettier |
| Linter | ESLint + eslint-config-prettier |

---

## 🏗️ Architecture Overview

```
                      ┌──────────────────────────────┐
                      │          MySQL DB             │
                      │  users │ sla_steps │ loans    │
                      │  loan_progress │ config       │
                      └─────────────┬────────────────┘
                                    │
                      ┌─────────────▼────────────────┐
                      │   Node.js / Express Server    │
                      │   (port 5000)                 │
                      │   12 REST API Endpoints       │
                      └─────────────┬────────────────┘
                                    │ HTTP (proxy)
┌───────────────────────────────────▼─────────────────────────────┐
│                     React App (port 3000)                        │
│                                                                  │
│  index.tsx                                                       │
│  └─ QueryClientProvider → BrowserRouter → AuthProvider           │
│     └─ ConfigProvider → App.tsx                                  │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │
│  │  Routes   │  │  Hooks   │  │ Contexts  │  │   Services    │  │
│  │ (Pages)   │  │ useLoans │  │ Auth      │  │   api.ts      │  │
│  │ Dashboard │◄─┤ useSLA   │  │ Config    │  │ (axios→5000)  │  │
│  │ Loans     │  │ useStaff │  └─────┬─────┘  └───────┬───────┘  │
│  │ Staff     │  │ useUsers │        │                │          │
│  │ Users     │  └────┬─────┘        │                │          │
│  │ Config    │       │        ┌─────▼──────┐         │          │
│  │ Login     │ ┌─────▼────┐   │   Utils    │         │          │
│  └─────┬─────┘ │Components│   │ helpers.ts │         │          │
│        │       │ 12 UI    │   │ formatNum  │         │          │
│        └───────┤ elements │   │ bizHours   │         │          │
│                └──────────┘   └────────────┘         │          │
│                                                      │          │
│  ┌──────────────┐  ┌──────────────┐                  │          │
│  │  Types (13)  │  │  Constants   │◄─────────────────┘          │
│  │  index.ts    │  │  mockData.ts │  (fallback only)            │
│  └──────────────┘  └──────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 Ghi chú & Quyết định

| Ngày | Nội dung |
|---|---|
| 2026-03-03 | Refactor xong cấu trúc thư mục từ App.js monolith → modular |
| 2026-03-03 | ✅ **Sprint 1**: Chuyển đổi hoàn toàn sang Tailwind CSS + BIDV light theme |
| 2026-03-03 | ✅ **Sprint 2**: Tích hợp `react-router-dom`, tạo 404 page |
| 2026-03-03 | ✅ **Sprint 3**: Tích hợp React Query + Mock API, Authentication, Role-based access |
| 2026-03-03 | ✅ **Sprint 3.5**: Admin config UI (WorkingHours, Holidays), `calculateBusinessHours()` |
| 2026-03-04 | ✅ **Sprint 4**: Sửa các file index.html, Code smells, Formatting issues. |
| 2026-03-04 | ✅ **Sprint 5**: Chuyển đổi toàn bộ Project sang TypeScript. |
| 2026-03-04 | ✅ **Sprint 6**: Viết Unit test, Component test, Page test. Cấu hình SonarQube. |
| 2026-03-04 | Bắt đầu **Sprint 7**: Setup Node.js + MySQL backend. |
| 2026-03-09 | Fix SLA hour precision (`hourToTime`), number formatting (`formatNumber` vi-VN). |
| 2026-03-09 | Fix loan status logic: dynamic 10 SLA steps, FORWARD/BACKWARD actions. |
| 2026-03-09 | Fix department code format → 3-digit (001, 002, ...). |
| 2026-03-09 | Fix UsersTab JSX errors, thêm CRUD quản lý người dùng hoàn chỉnh. |
| 2026-03-10 | Tab Hiệu suất: hiển thị tất cả cán bộ kể cả chưa có dữ liệu hồ sơ. |
| 2026-03-10 | ✅ **Sprint 7 HOÀN TẤT**. Cập nhật `command.md` toàn diện. |
