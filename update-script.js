const fs = require('fs');
const path = require('path');

const applyReplace = (file, search, replace) => {
    const p = path.join(__dirname, 'src', file);
    const content = fs.readFileSync(p, 'utf8');
    fs.writeFileSync(p, content.replace(search, replace), 'utf8');
};

// 1. helpers.ts
const helpersAdd = `
export function formatNumber(value: number | string | null | undefined): string | number {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
        return value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
    }
    if (typeof value === 'string') {
        const num = Number(value);
        if (!isNaN(num) && value.trim() !== '') {
            return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
        }
        return value;
    }
    return value;
}

export function getElapsedHours`;
applyReplace('utils/helpers.ts', 'export function getElapsedHours', helpersAdd.trim() + ' ');

// 2. MetricCard.tsx
applyReplace('components/MetricCard.tsx', "import React from 'react';", "import React from 'react';\nimport { formatNumber } from '../utils/helpers';");
applyReplace('components/MetricCard.tsx', "leading-none\"> {value} </div>", "leading-none\"> {formatNumber(value)} </div>");

// 3. LoansTab.tsx
applyReplace('pages/LoansTab.tsx', "import type { Loan, StepProgress, SLAStep } from '../types';", "import { formatNumber } from '../utils/helpers';\nimport type { Loan, StepProgress, SLAStep } from '../types';");
applyReplace('pages/LoansTab.tsx', "HỒ SƠ ({loans.length})", "HỒ SƠ ({formatNumber(loans.length)})");

// 4. Dashboard.tsx
applyReplace('pages/Dashboard.tsx', "import { hourToTime } from '../utils/helpers';", "import { hourToTime, formatNumber } from '../utils/helpers';");
applyReplace('pages/Dashboard.tsx', "lúc {new Date().toLocaleTimeString('vi-VN')}· {loans.length}", "lúc {new Date().toLocaleTimeString('vi-VN')}· {formatNumber(loans.length)}");
applyReplace('pages/Dashboard.tsx', "sub={`trong tổng số ${loans.length} hồ sơ`}", "sub={`trong tổng số ${formatNumber(loans.length)} hồ sơ`}");

// 5. StaffPerf.tsx
applyReplace('pages/StaffPerf.tsx', "import type { StaffPerf as StaffPerfType, SLAStatus } from '../types';", "import { formatNumber } from '../utils/helpers';\nimport type { StaffPerf as StaffPerfType, SLAStatus } from '../types';");
applyReplace('pages/StaffPerf.tsx', "{s.loans}", "{formatNumber(s.loans)}");
applyReplace('pages/StaffPerf.tsx', "{s.exceeded}\n                        bước", "{formatNumber(s.exceeded)}\n                        bước");

console.log('Update complete');
