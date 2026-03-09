const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/pages/Dashboard.tsx');
let content = fs.readFileSync(p, 'utf8');

// 1. Add formatHours import
content = content.replace("import { hourToTime, formatNumber } from '../utils/helpers';", "import { hourToTime, formatNumber, formatHours } from '../utils/helpers';");

// 2. Fix hourToTime usage in banner
content = content.replace("{String(Math.floor(config.startHour)).padStart(2, '0')}:00 →{' '}\n              {String(Math.floor(config.endHour)).padStart(2, '0')}:00", "{hourToTime(config.startHour)} → {hourToTime(config.endHour)}");
content = content.replace("{Math.floor(config.lunchBreak.start)}:00 → {Math.floor(config.lunchBreak.end)}:00", "{hourToTime(config.lunchBreak.start)} → {hourToTime(config.lunchBreak.end)}");

// 3. Fix workHoursPerDay display in banner
content = content.replace("{workHoursPerDay}h</span>/ngày", "{formatHours(workHoursPerDay)}</span>/ngày");

// 4. Fix workHoursPerDay in MetricCard
content = content.replace("value={`${workHoursPerDay}h`}", "value={formatHours(workHoursPerDay)}");

fs.writeFileSync(p, content, 'utf8');
console.log('Dashboard fixed directly via script');
