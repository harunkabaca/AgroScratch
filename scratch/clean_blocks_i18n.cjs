const fs = require('fs');
const path = require('path');
const dir = 'src/blockly/categories';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.js')) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Remove the || '...' fallback for %{BKY_...}
    // Pattern: '%{BKY_KEY}' || 'fallback'
    content = content.replace(/'%\{BKY_([A-Z0-9_]+)\}'\s*\|\|\s*'[^']+'/g, "'%{BKY_$1}'");
    
    fs.writeFileSync(p, content);
    console.log(`Cleaned ${file}`);
  }
});
