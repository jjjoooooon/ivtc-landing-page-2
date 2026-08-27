const fs = require('fs');
const html = fs.readFileSync('.next/server/app/about.html', 'utf8');
console.log('Reema:', html.includes('Reema'));
console.log('staff-heading:', html.includes('staff-heading'));
console.log('Total length:', html.length);
