# 📋 SLA RBT App — Command & Progress Tracker

> Cập nhật: 2026-03-04  
> Trạng thái: Hoàn tất Sprint 1–3, đang chuẩn bị Sprint 4–5

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
| Google Fonts | ⚠️ Chưa load | `index.html` thiếu `<link>` Google Fonts (Be Vietnam Pro, IBM Plex Mono) |
| TypeScript | ❌ Chưa làm | Đang sử dụng JavaScript thuần |
| Testing | ⚠️ Cơ bản | 2 test files: `App.test.js` (smoke) + `helpers.test.js` (4 tests) |
| CI/CD | ❌ Chưa có | Chưa setup GitHub Actions |

---

## 🐛 Issues & Code Smells hiện tại

| # | File | Mô tả | Mức độ |
|---|---|---|---|
| 1 | `index.html` | File bị minified 1 dòng, thiếu `<link>` Google Fonts → font fallback | 🟡 Trung bình |
| 2 | `index.html` | Thiếu `<meta viewport>`, `<meta description>`, favicon → SEO & responsive kém | 🟡 Trung bình |
| 3 | `LoanCardComp.js` | Import trực tiếp `SLA_STEPS` thay vì nhận qua props | 🟢 Code smell |
| 4 | `App.test.js` | Thiếu wrap `AuthProvider` + `ConfigProvider` → test sẽ fail nếu refactor | 🟡 Trung bình |
| 5 | `mockData.js` | SLA_STEPS chỉ có 5 bước (mock), thực tế quy trình BIDV có 10 bước | 🟢 Known |
| 6 | `api.js` | `USE_MOCK = true` hardcode, chưa có real API endpoint | 🟢 Known |
| 7 | `helpers.js` | `getElapsedHours()` đọc config từ `localStorage` trực tiếp thay vì qua Context | 🟢 Code smell |
| 8 | Formatter | Một số file có formatting không nhất quán (dấu `;`, spacing) | 🟢 Nhẹ |

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

### Sprint 4: Fix Issues & Polish ⬅️ TIẾP THEO
> Ưu tiên: 🔴 Cao  
> Dự kiến: 1 ngày

- [ ] Fix `index.html`: thêm Google Fonts link, viewport meta, favicon
- [ ] Fix `App.test.js`: wrap với `AuthProvider` + `ConfigProvider`
- [ ] Chạy `npm run format` để đồng bộ formatting
- [ ] Fix code smell `LoanCardComp.js` (nhận `SLA_STEPS` qua props)
- [ ] Fix `getElapsedHours` đọc config qua Context thay vì localStorage

### Sprint 5: TypeScript Migration (Tuỳ chọn)
> Ưu tiên: 🟡 Trung bình  
> Dự kiến: 2-3 ngày

- [ ] Tạo `tsconfig.json`
- [ ] Tạo `src/types/index.ts` (Loan, SLAStep, StaffPerf, User, etc.)
- [ ] Rename `.js` → `.tsx` / `.ts`
- [ ] Thêm type annotations cho props, hooks, API responses

### Sprint 6: Testing & CI/CD
> Ưu tiên: 🟢 Thấp  
> Dự kiến: 2-3 ngày

- [ ] Unit tests: `getSLAStatus`, `formatHours`, `getElapsedHours`
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
│   └── index.html              ← Entry HTML (cần fix: fonts, meta)
├── src/
│   ├── components/              ← 12 components
│   │   ├── AppHeader.js         ← Navigation bar (NavLink)
│   │   ├── HolidaysConfig.js    ← Admin: quản lý ngày lễ
│   │   ├── LoanCardComp.js      ← Card hiển thị hồ sơ vay
│   │   ├── LoanDetailPanel.js   ← Chi tiết hồ sơ + hành động
│   │   ├── MetricCard.js        ← Card số liệu dashboard
│   │   ├── ProtectedRoute.js    ← Route guard (auth + role)
│   │   ├── SLABar.js            ← Thanh progress SLA
│   │   ├── SLAConfigPanel.js    ← Hiển thị cấu hình SLA
│   │   ├── SLAStepsTable.js     ← Bảng các bước SLA
│   │   ├── StatusBadge.js       ← Badge trạng thái (Ok/Warning/Exceeded)
│   │   ├── StepCard.js          ← Card từng bước xử lý
│   │   └── WorkingHoursConfig.js← Admin: cấu hình giờ làm việc
│   ├── pages/                   ← 6 pages
│   │   ├── ConfigTab.js         ← Trang cấu hình (ADMIN only)
│   │   ├── Dashboard.js         ← Trang tổng quan
│   │   ├── LoansTab.js          ← Danh sách hồ sơ vay
│   │   ├── Login.js             ← Trang đăng nhập
│   │   ├── NotFound.js          ← Trang 404
│   │   └── StaffPerf.js         ← Hiệu suất cán bộ (ADMIN only)
│   ├── hooks/                   ← 3 custom hooks (React Query)
│   │   ├── useLoans.js
│   │   ├── useSLAConfig.js
│   │   └── useStaffPerf.js
│   ├── context/                 ← 2 React Contexts
│   │   ├── AuthContext.js       ← Authentication state
│   │   └── ConfigContext.js     ← Business config (giờ làm, lễ)
│   ├── services/
│   │   └── api.js               ← API layer (mock/real toggle)
│   ├── utils/
│   │   ├── helpers.js           ← getSLAStatus, formatHours, calculateBusinessHours
│   │   └── helpers.test.js      ← Unit tests
│   ├── constants/
│   │   └── mockData.js          ← Mock data (SLA_STEPS, LOANS, USERS, STAFF)
│   ├── App.js                   ← Root component (138 lines)
│   ├── App.test.js              ← Smoke test
│   ├── index.js                 ← Entry point (QueryClient, BrowserRouter, Providers)
│   └── index.css                ← Tailwind directives + base styles
├── tailwind.config.js           ← BIDV color palette + fonts
├── postcss.config.js
├── .prettierrc
├── .prettierignore
└── package.json                 ← React 19 + React Query + Router + Axios
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

| Ngày | Nội dung |
|---|---|
| 2026-03-03 | Refactor xong cấu trúc thư mục từ App.js monolith → modular |
| 2026-03-03 | ✅ **Sprint 1**: Chuyển đổi hoàn toàn sang Tailwind CSS + BIDV light theme |
| 2026-03-03 | ✅ **Sprint 2**: Tích hợp `react-router-dom`, tạo 404 page |
| 2026-03-03 | ✅ **Sprint 3**: Tích hợp React Query + Mock API, Authentication, Role-based access |
| 2026-03-03 | ✅ **Sprint 3.5**: Admin config UI (WorkingHours, Holidays), `calculateBusinessHours()` |
| 2026-03-04 | 📋 Đánh giá toàn diện lại dự án, cập nhật command.md |
