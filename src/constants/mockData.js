export const SLA_STEPS = [
  {
    id: 1,
    code: 'S01',
    name: 'Đề xuất tín dụng',
    owner: 'CB QLKH',
    slaHours: 2,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 2,
    code: 'S02',
    name: 'Định giá TSBĐ',
    owner: 'QLKH / Tổ ĐG / QLRR',
    slaHours: 8,
    system: 'Thủ công',
    internal: false,
  },
  {
    id: 3,
    code: 'S03',
    name: 'Lập & Phê duyệt Báo cáo định giá',
    owner: 'Thành viên ĐG + Thẩm quyền',
    slaHours: 1,
    system: 'Thủ công',
    internal: true,
  },
  {
    id: 4,
    code: 'S04',
    name: 'Thẩm định tín dụng',
    owner: 'CB Thẩm định (QLRR)',
    slaHours: 3,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 5,
    code: 'S05',
    name: 'Phê duyệt tín dụng tại Chi nhánh',
    owner: 'Cấp thẩm quyền',
    slaHours: 0.5,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 6,
    code: 'S06',
    name: 'Hoàn thiện HĐ, ký kết, scan & lưu RLOS',
    owner: 'CB QTTD',
    slaHours: 5,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 7,
    code: 'S07',
    name: 'Nhập kho TSBĐ',
    owner: 'CB QTTD',
    slaHours: 0.6,
    system: 'Thủ công',
    internal: true,
  },
  {
    id: 8,
    code: 'S08',
    name: 'Tác nghiệp RLOS (facility, tài khoản, thấu chi)',
    owner: 'CB QTTD',
    slaHours: 0.5,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 9,
    code: 'S09',
    name: 'Kiểm soát phê duyệt & kiểm tra TSBĐ (CLIMS)',
    owner: 'Bộ phận QTTD',
    slaHours: 1,
    system: 'RLOS',
    internal: true,
  },
  {
    id: 10,
    code: 'S10',
    name: 'Đăng ký giao dịch bảo đảm',
    owner: 'CB QTTD',
    slaHours: 4,
    system: 'Thủ công',
    internal: false,
  },
];

export const TOTAL_INTERNAL_HOURS = 13.6;

export const MOCK_LOANS = [
  {
    id: 'HS2024-001',
    customer: 'Nguyễn Văn An',
    amount: '850 triệu',
    type: 'Mua nhà',
    branch: 'CN Hà Nội',
    officer: 'Trần Minh Khoa',
    startTime: Date.now() - 6 * 3600000,
  },
  {
    id: 'HS2024-002',
    customer: 'Lê Thị Bình',
    amount: '1.2 tỷ',
    type: 'Kinh doanh BĐS',
    branch: 'CN HCM',
    officer: 'Phạm Thùy Linh',
    startTime: Date.now() - 14 * 3600000,
  },
  {
    id: 'HS2024-003',
    customer: 'Công ty TNHH Minh Phát',
    amount: '3.5 tỷ',
    type: 'Mở rộng kinh doanh',
    branch: 'CN Đà Nẵng',
    officer: 'Ngô Thanh Hùng',
    startTime: Date.now() - 2 * 3600000,
  },
  {
    id: 'HS2024-004',
    customer: 'Hoàng Văn Cường',
    amount: '500 triệu',
    type: 'Mua xe ô tô',
    branch: 'CN Hà Nội',
    officer: 'Trần Minh Khoa',
    startTime: Date.now() - 20 * 3600000,
  },
];

function generateStepProgress(loanIndex) {
  const patterns = [
    [true, true, true, true, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, false],
    [true, true, false, false, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, true],
  ];
  const times = [
    [1.8, 7.2, 2.5, 0.4, null, null, null, null, null, null],
    [2.1, 9.5, 1.2, 3.8, 0.6, 6.1, 0.7, 0.5, 1.3, 3.8],
    [1.5, 3.1, null, null, null, null, null, null, null, null],
    [1.9, 7.8, 0.9, 2.7, 0.5, 4.8, 0.6, 0.5, 0.9, 4.1],
  ];
  return SLA_STEPS.map((step, i) => ({
    stepId: step.id,
    completed: patterns[loanIndex][i],
    actualHours: times[loanIndex][i],
    startedAt: patterns[loanIndex][i] ? Date.now() - (times[loanIndex][i] || 0) * 3600000 : null,
  }));
}

export const MOCK_PROGRESS = MOCK_LOANS.map((_, i) => generateStepProgress(i));

export const STAFF_PERF = [
  {
    name: 'Trần Minh Khoa',
    role: 'CB QLKH',
    loans: 12,
    avgHours: 1.7,
    exceeded: 1,
    dept: 'Chi nhánh HN',
  },
  {
    name: 'Phạm Thùy Linh',
    role: 'CB QLKH',
    loans: 8,
    avgHours: 2.3,
    exceeded: 2,
    dept: 'Chi nhánh HCM',
  },
  {
    name: 'Ngô Thanh Hùng',
    role: 'CB Thẩm định',
    loans: 15,
    avgHours: 2.8,
    exceeded: 0,
    dept: 'QLRR HN',
  },
  {
    name: 'Bùi Thị Lan',
    role: 'CB Thẩm định',
    loans: 10,
    avgHours: 3.5,
    exceeded: 3,
    dept: 'QLRR HCM',
  },
  {
    name: 'Vũ Quang Minh',
    role: 'CB QTTD',
    loans: 18,
    avgHours: 4.2,
    exceeded: 1,
    dept: 'Chi nhánh HN',
  },
  {
    name: 'Đinh Thị Hoa',
    role: 'CB Định giá',
    loans: 7,
    avgHours: 6.8,
    exceeded: 0,
    dept: 'QLRR ĐN',
  },
];
