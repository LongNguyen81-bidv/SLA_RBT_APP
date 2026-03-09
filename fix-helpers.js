const fs = require('fs');
const path = require('path');

const helpersAdd = `
export function formatNumber(value: number | string | null | undefined): string | number {
    if (value === null || value === undefined) return '-';
    
    let numVal;
    if (typeof value === 'number') {
        numVal = value;
    } else if (typeof value === 'string') {
        const parsed = Number(value.replace(/,/g, ''));
        if (isNaN(parsed) || value.trim() === '') return value;
        numVal = parsed;
    } else {
        return value;
    }

    // Format with dot as thousands separator and comma as decimal separator
    // vi-VN locale naturally uses dot for thousands and comma for fractions
    return new Intl.NumberFormat('vi-VN', {
      maximumFractionDigits: 2,
    }).format(numVal);
}

export function getElapsedHours`;

const p = path.join(__dirname, 'src/utils/helpers.ts');
let content = fs.readFileSync(p, 'utf8');
content = content.replace('export function getElapsedHours', helpersAdd.trim() + ' ');
fs.writeFileSync(p, content, 'utf8');
console.log('helpers.ts formatNumber patched');
