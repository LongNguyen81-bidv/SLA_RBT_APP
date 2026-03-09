const fs = require('fs');
let f = fs.readFileSync('src/pages/UsersTab.tsx', 'utf8');
f = f.replace('placeholder="VD: PB01"', 'placeholder="VD: 001"');
fs.writeFileSync('src/pages/UsersTab.tsx', f);
console.log('Updated placeholder to 3-digit format');
