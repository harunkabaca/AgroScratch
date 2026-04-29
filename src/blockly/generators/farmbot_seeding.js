import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── TOHUM EKME JENERATÖRLERİ ────────────────────────── */

javascriptGenerator.forBlock['farmbot_plant_seed'] = function(block) {
  const seed = block.getFieldValue('SEED');
  return `await robot.plantSeed('${seed}');\n`;
};

javascriptGenerator.forBlock['farmbot_set_seed_depth'] = function(block) {
  const depth = javascriptGenerator.valueToCode(block, 'DEPTH', Order.ATOMIC) || '30';
  return `await robot.setSeedDepth(${depth});\n`;
};

javascriptGenerator.forBlock['farmbot_plant_row'] = function(block) {
  const count = javascriptGenerator.valueToCode(block, 'COUNT', Order.ATOMIC) || '5';
  const spacing = javascriptGenerator.valueToCode(block, 'SPACING', Order.ATOMIC) || '200';
  return `await robot.plantRow(${count}, ${spacing});\n`;
};

javascriptGenerator.forBlock['farmbot_plant_grid'] = function(block) {
  const rows = javascriptGenerator.valueToCode(block, 'ROWS', Order.ATOMIC) || '3';
  const cols = javascriptGenerator.valueToCode(block, 'COLS', Order.ATOMIC) || '3';
  const spacing = javascriptGenerator.valueToCode(block, 'SPACING', Order.ATOMIC) || '200';
  return `await robot.plantGrid(${rows}, ${cols}, ${spacing});\n`;
};

javascriptGenerator.forBlock['farmbot_pickup_seed'] = function() {
  return `await robot.pickupSeed();\n`;
};

javascriptGenerator.forBlock['farmbot_drop_seed'] = function() {
  return `await robot.dropSeed();\n`;
};
