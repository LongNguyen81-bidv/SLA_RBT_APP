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
| Tailwind CSS config | ✅ Đã cài | Chưa thực sự sử dụng, 100% inline CSS |
| BIDV Light Theme | ⚠️ Một phần | Config colors OK, chưa áp dụng Tailwind classes |
| Responsive Design | ❌ Chưa làm | Desktop only |
| React Router | ❌ Chưa làm | Dùng useState cho navigation |
| API Integration | ❌ Chưa làm | 100% mock data |
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
| 1 | `ConfigTab.js` | 12 | `color: '#f1f5f9'` (trắng trên nền trắng, residue dark theme) | ❌ Chưa fix |
| 2 | `App.test.js` | 6 | Test tìm "learn react" — sẽ fail | ❌ Chưa fix |
| 3 | `LoanCardComp.js` | 4 | Import trực tiếp `SLA_STEPS` thay vì nhận qua props | ⚠️ Code smell |

---

## 🗺️ Roadmap — Các Sprint tiếp theo

### Sprint 1: Chuyển đổi Tailwind CSS & Fix Bugs ⬅️ TIẾP THEO
> Ưu tiên: 🔴 Cao nhất  
> Dự kiến: 2-3 ngày

- [ ] Fix bug `ConfigTab.js` màu text
- [ ] Fix `App.test.js` (viết lại test cơ bản)
- [ ] Chuyển `StatusBadge.js` sang Tailwind
- [ ] Chuyển `SLABar.js` sang Tailwind
- [ ] Chuyển `MetricCard.js` sang Tailwind
- [ ] Chuyển `StepCard.js` sang Tailwind
- [ ] Chuyển `LoanCardComp.js` sang Tailwind
- [ ] Chuyển `AppHeader.js` sang Tailwind
- [ ] Chuyển `LoanDetailPanel.js` sang Tailwind
- [ ] Chuyển `SLAStepsTable.js` sang Tailwind
- [ ] Chuyển `SLAConfigPanel.js` sang Tailwind
- [ ] Chuyển tất cả Pages sang Tailwind
- [ ] Chuyển `App.js` sang Tailwind
- [ ] Thêm responsive breakpoints (mobile/tablet/desktop)
- [ ] Kiểm tra build: `npm run build`

### Sprint 2: React Router & Navigation
> Ưu tiên: 🟡 Trung bình  
> Dự kiến: 1 ngày

- [ ] Cài `react-router-dom`
- [ ] Tạo routes: `/`, `/loans`, `/loans/:id`, `/staff`, `/config`
- [ ] Chuyển `AppHeader` buttons → `NavLink`
- [ ] Thêm 404 page
- [ ] Test routing

### Sprint 3: API Layer & React Query
> Ưu tiên: 🟡 Trung bình  
> Dự kiến: 2-3 ngày

- [ ] Cài `@tanstack/react-query` + `axios`
- [ ] Tạo `src/services/api.js`
- [ ] Tạo custom hooks: `useLoans`, `useSLAConfig`, `useStaffPerf`
- [ ] Thêm loading/error states vào UI
- [ ] Giữ lại mock data làm fallback

### Sprint 4: TypeScript Migration (Tùy chọn)
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
