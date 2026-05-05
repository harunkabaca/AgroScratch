const fs = require('fs');
const path = require('path');
const translationsFile = 'src/i18n/translations.js';
const categoriesDir = 'src/blockly/categories';

// Load translations
let translationsContent = fs.readFileSync(translationsFile, 'utf8');
// Extract all keys like BLOCK_... or TOOL_... or SENSOR_...
const transKeys = new Set([...translationsContent.matchAll(/[A-Z0-9_]{4,}/g)].map(m => m[0]));

fs.readdirSync(categoriesDir).forEach(file => {
  if (file.endsWith('.js')) {
    const p = path.join(categoriesDir, file);
    const content = fs.readFileSync(p, 'utf8');
    const matches = content.matchAll(/BKY_([A-Z0-9_]+)/g);
    for (const match of matches) {
      const key = match[1];
      if (!transKeys.has(key)) {
        console.warn(`MISSING KEY: ${key} in ${file}`);
      }
    }
  }
});
