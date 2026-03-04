# 📋 SLA RBT App — Command & Progress Tracker

> Cập nhật: 2026-03-04  
> Trạng thái: Hoàn tất Sprint 1–5, đang chuẩn bị Sprint 6 (Testing & CI/CD)

---

## 🔧 Các lệnh thường dùng

```bash
# Khởi chạy development server
npm start

# Build production
npm run build

# Chạy tests
npm test

# Format code
npm run format

# Kiểm tra format
npm run format:check

# Lint code
npm run lint

# Lint + auto fix
npm run lint:fix
```

### Tài khoản đăng nhập Demo (Mock)

| Username | Password | Role | Phòng ban |
|---|---|---|---|
| `admin` | `1` | ADMIN | QLNB |
| `qhkh` | `1` | USER | QHKH |
| `dinhgia` | `1` | USER | Định giá TS |
| `thamdinh` | `1` | USER | Thẩm định |
| `pheduyet` | `1` | USER | Phê duyệt |
| `httd` | `1` | USER | HTTD |

---

## 📊 Trạng thái tổng quan

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Refactor cấu trúc | ✅ Hoàn tất | 7 thư mục: components, pages, hooks, context, services, utils, constants |
| Tailwind CSS | ✅ Hoàn tất | 100% Tailwind CSS, đã xoá hết inline CSS |
| BIDV Light Theme | ✅ Hoàn tất | Bảng màu tuỳ chỉnh: `bidv-green`, `bidv-gold`, `surface-*` |
| Responsive Design | ✅ Hoàn tất | Breakpoints: `sm:`, `md:`, `lg:` |
| React Router | ✅ Hoàn tất | 7 routes (incl. `/login`, `/loans/:id`, `*` → 404) |
| Authentication | ✅ Hoàn tất | AuthContext + Login page + ProtectedRoute |
| Role-Based Access | ✅ Hoàn tất | ADMIN-only: `/staff`, `/config` |
| API Layer (Mock) | ✅ Hoàn tất | React Query + Mock API service (`USE_MOCK = true`) |
| Config Management | ✅ Hoàn tất | ConfigContext: giờ làm việc, nghỉ lễ, lunch break |
| Business Hours Calc | ✅ Hoàn tất | `calculateBusinessHours()` với ngày lễ, giờ nghỉ trưa |
| Prettier + ESLint | ✅ Hoàn tất | `.prettierrc` + `eslint-config-prettier` configured |
| Git + GitHub | ✅ Hoàn tất | Đã push lên repo |
| Google Fonts | ✅ Hoàn tất | Đã thêm `<link>` Google Fonts (Be Vietnam Pro, IBM Plex Mono) |
| TypeScript | ✅ Hoàn tất | 100% codebase đã chuyển sang TypeScript |
| Testing | ⚠️ Cơ bản | 2 test files: `App.test.js` (smoke) + `helpers.test.js` (4 tests) |
| CI/CD | ❌ Chưa có | Chưa setup GitHub Actions |

---

## 🐛 Issues & Code Smells hiện tại

| # | File | Mô tả | Mức độ |
|---|---|---|---|
| 1 | `mockData.ts` | SLA_STEPS chỉ có 5 bước (mock), thực tế quy trình BIDV có 10 bước | 🟢 Known |
| 2 | `api.ts` | `USE_MOCK = true` hardcode, chưa có real API endpoint | 🟢 Known |
| 3 | Testing | Thiếu Unit tests cho các components chính và custom hooks | � Trung bình |
| 4 | CI/CD | Chưa setup GitHub Actions pipeline cho Lint & Test trước khi merge | � Trung bình |

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
- [x] Tạo `src/services/api.js` (authApi, loansApi, configApi, staffApi)
- [x] Custom hooks: `useLoans`, `useSLAConfig`, `useStaffPerf`
- [x] Loading/Error states
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
- [x] Định nghĩa Types/Interfaces: `Loan`, `SLAConfig`, `StaffPerf`, `User`
- [x] Fix các lỗi Type check của TypeScript (`any`, implicit types)
- [x] Cập nhật command và cấu trúc testing tương thích TypeScript
- [x] Xác nhận npm test và npm run build hoạt động trơn tru với TS

### Sprint 6: Testing & CI/CD
> Trạng thái: **CHUẨN BỊ**

- [ ] Unit tests: Các helpers và hooks (`useLoans`, `useSLAConfig`)
- [ ] Component tests: `StatusBadge`, `MetricCard`, `SLABar`
- [ ] Page tests: `Dashboard`, `Login`
- [ ] Setup GitHub Actions CI (lint → test → build)

### Sprint 7: Backend Integration (Khi có API thật)
> Ưu tiên: 🟢 Thấp  
> Dự kiến: Phụ thuộc backend

- [ ] Đổi `USE_MOCK = false` trong `api.js`
- [ ] Cấu hình `REACT_APP_API_URL` environment variable
- [ ] Thay thế mock auth bằng JWT/OAuth thực tế
- [ ] Kết nối Supabase hoặc REST API backend
- [ ] Realtime updates (WebSocket / Supabase Realtime)

---

## 📁 Cấu trúc thư mục hiện tại

```
sla-rbt-app/
├── public/
│   └── index.html              ← Entry HTML (đã chuẩn hoá fonts, meta)
├── src/
│   ├── components/              ← 12 components
│   │   ├── AppHeader.tsx        ← Navigation bar (NavLink)
│   │   ├── HolidaysConfig.tsx   ← Admin: quản lý ngày lễ
│   │   ├── LoanCardComp.tsx     ← Card hiển thị hồ sơ vay
│   │   ├── LoanDetailPanel.tsx  ← Chi tiết hồ sơ + hành động
│   │   ├── MetricCard.tsx       ← Card số liệu dashboard
│   │   ├── ProtectedRoute.tsx   ← Route guard (auth + role)
│   │   ├── SLABar.tsx           ← Thanh progress SLA
│   │   ├── SLAConfigPanel.tsx   ← Hiển thị cấu hình SLA
│   │   ├── SLAStepsTable.tsx    ← Bảng các bước SLA
│   │   ├── StatusBadge.tsx      ← Badge trạng thái (Ok/Warning/Exceeded)
│   │   ├── StepCard.tsx         ← Card từng bước xử lý
│   │   └── WorkingHoursConfig.tsx← Admin: cấu hình giờ làm việc
│   ├── pages/                   ← 6 pages
│   │   ├── ConfigTab.tsx        ← Trang cấu hình (ADMIN only)
│   │   ├── Dashboard.tsx        ← Trang tổng quan
│   │   ├── LoansTab.tsx         ← Danh sách hồ sơ vay
│   │   ├── Login.tsx            ← Trang đăng nhập
│   │   ├── NotFound.tsx         ← Trang 404
│   │   └── StaffPerf.tsx        ← Hiệu suất cán bộ (ADMIN only)
│   ├── hooks/                   ← 3 custom hooks (React Query)
│   │   ├── useLoans.ts
│   │   ├── useSLAConfig.ts
│   │   └── useStaffPerf.ts
│   ├── context/                 ← 2 React Contexts
│   │   ├── AuthContext.tsx      ← Authentication state
│   │   └── ConfigContext.tsx    ← Business config (giờ làm, lễ)
│   ├── services/
│   │   └── api.ts               ← API layer (mock/real toggle)
│   ├── types/
│   │   └── index.ts             ← Định nghĩa TS Interfaces
│   ├── utils/
│   │   ├── helpers.ts           ← getSLAStatus, formatHours, calculateBusinessHours
│   │   └── helpers.test.ts      ← Unit tests
│   ├── constants/
│   │   └── mockData.ts          ← Mock data (SLA_STEPS, LOANS, USERS, STAFF)
│   ├── App.tsx                  ← Root component
│   ├── App.test.tsx             ← Smoke test
│   ├── index.tsx                ← Entry point (QueryClient, BrowserRouter, Providers)
│   └── index.css                ← Tailwind directives + base styles
├── tailwind.config.js           ← BIDV color palette + fonts
├── tsconfig.json                ← Cấu hình biên dịch TypeScript
├── postcss.config.js
├── .prettierrc
├── .prettierignore
└── package.json                 ← React + TS + Query + Router + Axios
```

---

## 📊 Thống kê dự án

| Metric | Value |
|---|---|
| Tổng files source (src/) | ~24 files |
| Components | 12 |
| Pages | 6 |
| Custom Hooks | 3 |
| Contexts | 2 |
| Services | 1 |
| Utils | 2 (helpers + test) |
| Test files | 2 |
| Dependencies | 7 (React, ReactDOM, Router, Query, Axios, Testing Lib, Web Vitals) |
| DevDependencies | 4 (Tailwind, PostCSS, Autoprefixer, Prettier) |
| Framework | Create React App (react-scripts 5.0.1) |
| React version | 19.2.4 |

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                   index.js                        │
│  QueryClientProvider → BrowserRouter → AuthProvider│
│                  → ConfigProvider → App            │
└────────────────────────┬─────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌─────▼─────┐  ┌──────▼──────┐
    │  Routes  │    │  Hooks    │  │  Contexts   │
    │ (Pages)  │    │ useLoans  │  │ AuthContext  │
    │ Dashboard│    │ useSLA    │  │ ConfigContext│
    │ Loans    │◄───┤ useStaff  │  └──────┬──────┘
    │ Staff    │    └─────┬─────┘         │
    │ Config   │          │               │
    │ Login    │    ┌─────▼─────┐         │
    └─────┬────┘    │  Services │         │
          │         │  api.js   │         │
    ┌─────▼────┐    │ (mock/    │   ┌─────▼──────┐
    │Components│    │  real)    │   │   Utils     │
    │ 12 UI    │    └───────────┘   │ helpers.js  │
    │ elements │                    │ businessHrs │
    └──────────┘                    └────────────┘
```

---

## 📝 Ghi chú & Quyết định

| วัน/Ngày | Nội dung |
|---|---|
| 2026-03-03 | Refactor xong cấu trúc thư mục từ App.js monolith → modular |
| 2026-03-03 | ✅ **Sprint 1**: Chuyển đổi hoàn toàn sang Tailwind CSS + BIDV light theme |
| 2026-03-03 | ✅ **Sprint 2**: Tích hợp `react-router-dom`, tạo 404 page |
| 2026-03-03 | ✅ **Sprint 3**: Tích hợp React Query + Mock API, Authentication, Role-based access |
| 2026-03-03 | ✅ **Sprint 3.5**: Admin config UI (WorkingHours, Holidays), `calculateBusinessHours()` |
| 2026-03-04 | ✅ **Sprint 4**: Sửa các file index.html, Code smells, Formatting issues. |
| 2026-03-04 | ✅ **Sprint 5**: Chuyển đổi toàn bộ Project sang TypeScript. |
| 2026-03-04 | Cập nhật `command.md` định hướng cho Sprint 6 (Testing & CI/CD). |
