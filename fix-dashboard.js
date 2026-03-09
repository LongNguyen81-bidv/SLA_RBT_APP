const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/pages/Dashboard.tsx');
let content = fs.readFileSync(p, 'utf8');
content = content.replace(/import \{ hourToTime \} from '\.\.\/utils\/helpers';/, "import { hourToTime, formatNumber } from '../utils/helpers';");
fs.writeFileSync(p, content, 'utf8');
console.log('Dashboard fixed');
