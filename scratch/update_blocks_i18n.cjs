const fs = require('fs');
const path = require('path');
const dir = 'src/blockly/categories';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.js')) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    // Blockly.Msg['KEY'] -> '%{BKY_KEY}'
    content = content.replace(/Blockly\.Msg\['([^']+)'\]/g, "'%{BKY_$1}'");
    // Also handle Blockly.Msg.KEY if any
    content = content.replace(/Blockly\.Msg\.([A-Z0-9_]+)/g, "'%{BKY_$1}'");
    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
  }
});
