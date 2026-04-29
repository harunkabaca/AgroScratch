import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── GELİŞMİŞ HAREKET JENERATÖRLERİ ─────────────────── */

javascriptGenerator.forBlock['farmbot_goto_plant'] = function(block) {
  const plant = block.getFieldValue('PLANT');
  return `await robot.gotoPlant('${plant}');\n`;
};

javascriptGenerator.forBlock['farmbot_goto_tool_bay'] = function() {
  return `await robot.moveTo(50, 50, 0);\n`;
};

javascriptGenerator.forBlock['farmbot_goto_seed_tray'] = function() {
  return `await robot.moveTo(0, 0, 0);\n`;
};

javascriptGenerator.forBlock['farmbot_goto_water_source'] = function() {
  return `await robot.moveTo(0, 750, 0);\n`;
};

javascriptGenerator.forBlock['farmbot_grid_scan'] = function(block) {
  const spacing = javascriptGenerator.valueToCode(block, 'SPACING', Order.ATOMIC) || '200';
  const body = javascriptGenerator.statementToCode(block, 'DO');
  const varX = javascriptGenerator.nameDB_.getDistinctName('gridX', Blockly.Names.NameType.VARIABLE);
  const varY = javascriptGenerator.nameDB_.getDistinctName('gridY', Blockly.Names.NameType.VARIABLE);
  let code = `for (let ${varX} = 0; ${varX} < 3000; ${varX} += ${spacing}) {\n`;
  code += `  for (let ${varY} = 0; ${varY} < 1500; ${varY} += ${spacing}) {\n`;
  code += `    await robot.checkAbort();\n`;
  code += `    await robot.moveTo(${varX}, ${varY}, 0);\n`;
  code += body;
  code += `  }\n}\n`;
  return code;
};

javascriptGenerator.forBlock['farmbot_park'] = function() {
  return `await robot.moveTo(0, 0, 0);\nawait robot.say('Parked');\n`;
};

javascriptGenerator.forBlock['farmbot_calibrate'] = function(block) {
  const axis = block.getFieldValue('AXIS');
  return `await robot.calibrate('${axis}');\n`;
};

javascriptGenerator.forBlock['farmbot_find_home'] = function(block) {
  const axis = block.getFieldValue('AXIS');
  return `await robot.findHome('${axis}');\n`;
};
