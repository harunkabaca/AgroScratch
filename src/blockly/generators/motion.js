import { javascriptGenerator } from 'blockly/javascript';

/* ── HAREKET JENERATÖRLERİ ──────────────────────────── */

javascriptGenerator.forBlock['motion_gotoxyz'] = function(block) {
  const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_NONE) || '0';
  const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_NONE) || '0';
  const z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_NONE) || '0';
  return `await robot.moveTo(${x}, ${y}, ${z});\n`;
};

javascriptGenerator.forBlock['motion_gohome'] = function(block) {
  return `await robot.moveTo(0, 0, 0);\n`;
};

javascriptGenerator.forBlock['motion_changex'] = function(block) {
  const dx = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_NONE) || '0';
  return `await robot.moveRelative(${dx}, 0, 0);\n`;
};

javascriptGenerator.forBlock['motion_changey'] = function(block) {
  const dy = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_NONE) || '0';
  return `await robot.moveRelative(0, ${dy}, 0);\n`;
};

javascriptGenerator.forBlock['motion_changez'] = function(block) {
  const dz = javascriptGenerator.valueToCode(block, 'DZ', javascriptGenerator.ORDER_NONE) || '0';
  return `await robot.moveRelative(0, 0, ${dz});\n`;
};
