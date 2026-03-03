# 📋 SLA RBT App — Command & Progress Tracker

> Cập nhật: 2026-03-03  
> Trạng thái: Giai đoạn refactor cấu trúc hoàn tất, chuẩn bị Sprint 1

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

---

## 📊 Trạng thái tổng quan

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Refactor cấu trúc | ✅ Hoàn tất | Tách App.js → components/pages/utils/constants |
| Tailwind CSS config | ✅ Hoàn tất | 100% Tailwind CSS classes |
| BIDV Light Theme | ✅ Hoàn tất | Đã áp dụng toàn bộ app |
| Responsive Design | ✅ Hoàn tất | Áp dụng đầy đủ md: lg: |
| React Router | ✅ Hoàn tất | Sử dụng react-router-dom |
| API Integration | ✅ Hoàn tất | Tích hợp React Query với mock API service |
| TypeScript | ❌ Chưa làm | JavaScript thuần |
| Testing | ❌ Test lỗi | App.test.js tìm "learn react" - sẽ fail |
| CI/CD | ❌ Chưa có | Chưa setup GitHub Actions |
| Prettier/ESLint | ✅ Hoàn tất | Đã cấu hình |
| Google Fonts | ✅ Hoàn tất | Load từ index.html |
| Git + GitHub | ✅ Hoàn tất | Đã push lên repo |

---

## 🐛 Bugs cần fix

| # | File | Dòng | Mô tả | Trạng thái |
|---|---|---|---|---|
| 1 | `ConfigTab.js` | N/A | Lỗi đã được fix trong quá trình refactor (Mất `color: '#f1f5f9'`) | ✅ Đã fix |
| 2 | `App.test.js` | N/A | Lỗi đã được fix, Test Pass | ✅ Đã fix |
| 3 | `LoanCardComp.js` | 4 | Import trực tiếp `SLA_STEPS` thay vì nhận qua props | ⚠️ Code smell |

---

## 🗺️ Roadmap — Các Sprint tiếp theo

### Sprint 1: Chuyển đổi Tailwind CSS & Fix Bugs
> Ưu tiên: 🔴 Cao nhất  
> Dự kiến: 2-3 ngày

- [x] Fix bug `ConfigTab.js` màu text
- [x] Fix `App.test.js` (viết lại test cơ bản)
- [x] Chuyển `StatusBadge.js` sang Tailwind
- [x] Chuyển `SLABar.js` sang Tailwind
- [x] Chuyển `MetricCard.js` sang Tailwind
- [x] Chuyển `StepCard.js` sang Tailwind
- [x] Chuyển `LoanCardComp.js` sang Tailwind
- [x] Chuyển `AppHeader.js` sang Tailwind
- [x] Chuyển `LoanDetailPanel.js` sang Tailwind
- [x] Chuyển `SLAStepsTable.js` sang Tailwind
- [x] Chuyển `SLAConfigPanel.js` sang Tailwind
- [x] Chuyển tất cả Pages sang Tailwind
- [x] Chuyển `App.js` sang Tailwind
- [x] Thêm responsive breakpoints (mobile/tablet/desktop)
- [x] Kiểm tra build: `npm run build`

### Sprint 2: React Router & Navigation
> Ưu tiên: 🟡 Trung bình  
> Dự kiến: 1 ngày

- [x] Cài `react-router-dom`
- [x] Tạo routes: `/`, `/loans`, `/loans/:id`, `/staff`, `/config`
- [x] Chuyển `AppHeader` buttons → `NavLink`
- [x] Thêm 404 page
- [x] Test routing

### Sprint 3: API Layer & React Query
> Ưu tiên: 🟡 Trung bình  
> Dự kiến: 2-3 ngày

- [x] Cài `@tanstack/react-query` + `axios`
- [x] Tạo `src/services/api.js`
- [x] Tạo custom hooks: `useLoans`, `useSLAConfig`, `useStaffPerf`
- [x] Thêm loading/error states vào UI
- [x] Giữ lại mock data làm fallback

### Sprint 4: TypeScript Migration (Tùy chọn) ⬅️ TIẾP THEO
> Ưu tiên: 🟢 Thấp  
> Dự kiến: 2 ngày

- [ ] Tạo `tsconfig.json`
- [ ] Tạo `src/types/index.ts`
- [ ] Rename `.js` → `.tsx` / `.ts`
- [ ] Thêm type annotations

### Sprint 5: Testing & CI/CD
> Ưu tiên: 🟢 Thấp  
> Dự kiến: 1-2 ngày

- [ ] Viết unit tests cho helpers
- [ ] Viết component tests cho StatusBadge, MetricCard
- [ ] Viết integration tests cho Dashboard
- [ ] Setup GitHub Actions CI

---

## 📁 Cấu trúc thư mục hiện tại

```
sla-rbt-app/
├── public/
│   └── index.html          ← Google Fonts loaded here
├── src/
│   ├── components/          ← 9 components
│   │   ├── AppHeader.js
│   │   ├── LoanCardComp.js
│   │   ├── LoanDetailPanel.js
│   │   ├── MetricCard.js
│   │   ├── SLABar.js
│   │   ├── SLAConfigPanel.js
│   │   ├── SLAStepsTable.js
│   │   ├── StatusBadge.js
│   │   └── StepCard.js
│   ├── pages/               ← 4 pages
│   │   ├── ConfigTab.js
│   │   ├── Dashboard.js
│   │   ├── LoansTab.js
│   │   └── StaffPerf.js
│   ├── utils/
│   │   └── helpers.js       ← getSLAStatus, formatHours, getElapsedHours
│   ├── constants/
│   │   └── mockData.js      ← SLA_STEPS, MOCK_LOANS, MOCK_PROGRESS, STAFF_PERF
│   ├── App.js               ← Main app (81 lines)
│   ├── index.js
│   └── index.css            ← Tailwind directives
├── tailwind.config.js       ← BIDV colors configured
├── postcss.config.js
├── package.json
└── .prettierrc
```

---

## 📝 Ghi chú & Quyết định

| Ngày | Nội dung |
|---|---|
| 2026-03-03 | Refactor xong cấu trúc thư mục, setup Tailwind config, chuyển sang light theme |
| 2026-03-03 | Đánh giá chi tiết: Tailwind chưa được sử dụng thực tế, cần chuyển đổi inline CSS |
| 2026-03-03 | ✅ Hoàn thành **Sprint 2**, tích hợp thành công `react-router-dom` cho việc điều hướng và tạo trang `NotFound`. |
| 2026-03-03 | ✅ Hoàn thành **Sprint 1**, rà soát việc chuyển đổi sang Tailwind, fix bug giao diện và test thành công (`npm run test` & `npm run build`). |
| 2026-03-03 | ✅ Hoàn thành **Sprint 3**, tích hợp React Query, tạo API hooks và loading states. |
