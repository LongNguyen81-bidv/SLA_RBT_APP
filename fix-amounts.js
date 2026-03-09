const fs = require('fs');

function formatFile(filePath, importTarget, importReplacement, amountTarget, amountReplacement) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(importTarget, importReplacement);
    content = content.replace(amountTarget, amountReplacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
}

// 1. LoanDetailPanel.tsx
formatFile('src/components/LoanDetailPanel.tsx', `import { formatHours, getElapsedHours } from '../utils/helpers';`, `import { formatHours, getElapsedHours, formatNumber } from '../utils/helpers';`, `{loan.id}· {loan.type}· {loan.amount}· {loan.branch}{' '}`, `{loan.id}· {loan.type}· {formatNumber(loan.amount)}· {loan.branch}{' '}`);

// 2. LoanCardComp.tsx
formatFile('src/components/LoanCardComp.tsx', `import { getSLAStatus, formatHours, getElapsedHours } from '../utils/helpers';`, `import { getSLAStatus, formatHours, getElapsedHours, formatNumber } from '../utils/helpers';`, `{loan.type}· {loan.amount}{' '}`, `{loan.type}· {formatNumber(loan.amount)}{' '}`);
