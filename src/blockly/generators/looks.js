import { javascriptGenerator } from 'blockly/javascript';

/* ── GÖRÜNÜM JENERATÖRLERİ ──────────────────────────── */

javascriptGenerator.forBlock['looks_say'] = function(block) {
  const msg = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE) || "''";
  return `await robot.say(${msg});\n`;
};

javascriptGenerator.forBlock['looks_sayforsecs'] = function(block) {
  const msg = javascriptGenerator.valueToCode(block, 'MESSAGE', javascriptGenerator.ORDER_NONE) || "''";
  const secs = javascriptGenerator.valueToCode(block, 'SECS', javascriptGenerator.ORDER_NONE) || '1';
  return `await robot.say(${msg});\nawait robot.wait(${secs} * 1000);\nawait robot.say('');\n`;
};

javascriptGenerator.forBlock['looks_switchtool'] = function(block) {
  const tool = block.getFieldValue('TOOL');
  return `await robot.switchTool('${tool}');\n`;
};
