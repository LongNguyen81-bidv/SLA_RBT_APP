import type {
    SLAStep,
    User,
    Loan,
    StepProgress,
    StaffPerf
}
from '../types';

export const SLA_STEPS: SLAStep[] = [
    {
        id: 1,
        code: 'S01',
        name: 'Khởi tạo & Tiếp nhận hồ sơ',
        owner: 'QHKH',
        slaHours: 2,
        system: 'RLOS',
        internal: true
    },
    {
        id: 2,
        code: 'S02',
        name: 'Định giá Tài sản bảo đảm',
        owner: 'Định giá TS',
        slaHours: 8,
        system: 'Thủ công',
        internal: false
    },
    {
        id: 3,
        code: 'S03',
        name: 'Thẩm định tín dụng',
        owner: 'Thẩm định',
        slaHours: 4,
        system: 'RLOS',
        internal: true
    },
    {
        id: 4,
        code: 'S04',
        name: 'Phê duyệt tín dụng',
        owner: 'Phê duyệt',
        slaHours: 2,
        system: 'RLOS',
        internal: true
    }, {
        id: 5,
        code: 'S05',
        name: 'Hỗ trợ tín dụng (Giải ngân)',
        owner: 'HTTD',
        slaHours: 5,
        system: 'RLOS',
        internal: true
    },
];

export const TOTAL_INTERNAL_HOURS: number = 13;

export const USERS: User[] = [
    {
        id: 'u1',
        username: 'admin',
        password: '1',
        name: 'Nguyễn Quản Lý (Admin)',
        role: 'ADMIN',
        dept: 'QLNB'
    },
    {
        id: 'u2',
        username: 'qhkh',
        password: '1',
        name: 'Trần Minh Khoa',
        role: 'USER',
        dept: 'QHKH'
    },
    {
        id: 'u3',
        username: 'dinhgia',
        password: '1',
        name: 'Đinh Thị Hoa',
        role: 'USER',
        dept: 'Định giá TS'
    },
    {
        id: 'u4',
        username: 'thamdinh',
        password: '1',
        name: 'Bùi Thị Lan',
        role: 'USER',
        dept: 'Thẩm định'
    }, {
        id: 'u5',
        username: 'pheduyet',
        password: '1',
        name: 'Phạm Sếp',
        role: 'USER',
        dept: 'Phê duyệt'
    }, {
        id: 'u6',
        username: 'httd',
        password: '1',
        name: 'Vũ Quang Minh',
        role: 'USER',
        dept: 'HTTD'
    },
];

export const MOCK_LOANS: Loan[] = [
    {
        id: 'HS2024-001',
        customer: 'Nguyễn Văn An',
        amount: '850 triệu',
        type: 'Mua nhà',
        deptCode: '001',
        officer: 'Trần Minh Khoa',
        startTime: Date.now() - 4 * 3600000,
        currentStepId: 2, // Đang ở định giá
        assignedDept: 'Định giá TS'
    }, {
        id: 'HS2024-002',
        customer: 'Lê Thị Bình',
        amount: '1.2 tỷ',
        type: 'Kinh doanh BĐS',
        deptCode: '002',
        officer: 'Trần Minh Khoa', // Cho QHKH
        startTime: Date.now() - 1 * 3600000,
        currentStepId: 1, // Đang ở QHKH
        assignedDept: 'QHKH'
    }, {
        id: 'HS2024-003',
        customer: 'Công ty TNHH Minh Phát',
        amount: '3.5 tỷ',
        type: 'Mở rộng kinh doanh',
        deptCode: '003',
        officer: 'Ngô Thanh Hùng',
        startTime: Date.now() - 15 * 3600000,
        currentStepId: 4, // Đang ở Phê duyệt
        assignedDept: 'Phê duyệt'
    }, {
        id: 'HS2024-004',
        customer: 'Hoàng Văn Cường',
        amount: '500 triệu',
        type: 'Mua xe ô tô',
        deptCode: '001',
        officer: 'Trần Minh Khoa',
        startTime: Date.now() - 25 * 3600000,
        currentStepId: 5, // Đang ở HTTD
        assignedDept: 'HTTD'
    },
];

// Khởi tạo Progress ban đầu tương ứng với currentStepId
function generateInitialProgress(loan : Loan): StepProgress[] {
    return SLA_STEPS.map((step) => {
        let completed = false;
        let actualHours: number | null = null;
        let startedAt: number | null = null;

        if (loan.currentStepId !== null && step.id < loan.currentStepId) {
            completed = true;
            actualHours = step.slaHours - Math.random() * 0.5; // Random hours
            startedAt = loan.startTime + step.id * 3600000;
        } else if (step.id === loan.currentStepId) {
            startedAt = Date.now() - Math.random() * step.slaHours * 1000000; // Random startedAt
        }

        return {stepId: step.id, completed, actualHours, startedAt};
    });
}

export const MOCK_PROGRESS: StepProgress[][] = MOCK_LOANS.map((loan) => generateInitialProgress(loan));

export const STAFF_PERF: StaffPerf[] = [
    {
        staffCode: 'NV001',
        name: 'Trần Minh Khoa',
        role: 'CB QLKH',
        loans: 12,
        avgHours: 1.7,
        exceeded: 1,
        dept: 'Chi nhánh HN',
        deptCode: '001'
    },
    {
        staffCode: 'NV002',
        name: 'Phạm Thùy Linh',
        role: 'CB QLKH',
        loans: 8,
        avgHours: 2.3,
        exceeded: 2,
        dept: 'Chi nhánh HCM',
        deptCode: '002'
    },
    {
        staffCode: 'NV003',
        name: 'Bùi Thị Lan',
        role: 'CB Thẩm định',
        loans: 15,
        avgHours: 2.8,
        exceeded: 0,
        dept: 'QLRR HN',
        deptCode: '003'
    },
    {
        staffCode: 'NV004',
        name: 'Vũ Quang Minh',
        role: 'CB HTTD',
        loans: 10,
        avgHours: 3.5,
        exceeded: 3,
        dept: 'QLRR HCM',
        deptCode: '004'
    }, {
        staffCode: 'NV005',
        name: 'Đinh Thị Hoa',
        role: 'CB Định giá',
        loans: 7,
        avgHours: 6.8,
        exceeded: 0,
        dept: 'QLRR ĐN',
        deptCode: '005'
    },
];
