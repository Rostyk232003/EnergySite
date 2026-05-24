// Настроїти перепис для Next.js, щоб віддавати data.json із public
const fs = require('fs');
const path = require('path');

/**
 * Копіює файл data.json у public/analytics/data.json при запуску dev/build
 */
const src = path.join(__dirname, '../src/analytics/data.json');
const destDir = path.join(__dirname, '../public/analytics');
const dest = path.join(destDir, 'data.json');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
fs.copyFileSync(src, dest);
console.log('analytics/data.json скопійовано у public/analytics/data.json');
