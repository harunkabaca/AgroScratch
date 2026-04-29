import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── SEKANSLAR & OTOMASYON JENERATÖRLERİ ─────────────── */

javascriptGenerator.forBlock['farmbot_run_sequence'] = function(block) {
  const seq = block.getFieldValue('SEQUENCE');
  return `await robot.runSequence('${seq}');\n`;
};

javascriptGenerator.forBlock['farmbot_schedule'] = function(block) {
  const interval = block.getFieldValue('INTERVAL');
  const body = javascriptGenerator.statementToCode(block, 'DO');
  return `// Zamanlı görev: ${interval}\n${body}`;
};

javascriptGenerator.forBlock['farmbot_water_all_plants'] = function() {
  return `await robot.waterAllPlants();\n`;
};

javascriptGenerator.forBlock['farmbot_for_each_plant'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'DO');
  const varPlant = javascriptGenerator.nameDB_.getDistinctName('plant', Blockly.Names.NameType.VARIABLE);
  let code = `const plants = await robot.getAllPlants();\n`;
  code += `for (const ${varPlant} of plants) {\n`;
  code += `  await robot.checkAbort();\n`;
  code += `  await robot.moveTo(${varPlant}.x, ${varPlant}.y, 0);\n`;
  code += body;
  code += `}\n`;
  return code;
};

javascriptGenerator.forBlock['farmbot_generate_report'] = function() {
  return `await robot.generateReport();\n`;
};

javascriptGenerator.forBlock['farmbot_send_notification'] = function(block) {
  const channel = block.getFieldValue('CHANNEL');
  const msg = javascriptGenerator.valueToCode(block, 'MESSAGE', Order.ATOMIC) || "''";
  return `await robot.sendNotification('${channel}', ${msg});\n`;
};

javascriptGenerator.forBlock['farmbot_current_time'] = function(block) {
  const part = block.getFieldValue('PART');
  const map = { HOUR: 'getHours()', MINUTE: 'getMinutes()', DAY: 'getDate()', MONTH: 'getMonth() + 1' };
  return [`(new Date().${map[part]})`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_is_daytime'] = function() {
  return [`(new Date().getHours() >= 6 && new Date().getHours() < 20)`, Order.LOGICAL_AND];
};
