import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── SULAMA JENERATÖRLERİ ─────────────────────────────── */

javascriptGenerator.forBlock['farmbot_water_on'] = function() {
  return `await robot.waterOn();\n`;
};

javascriptGenerator.forBlock['farmbot_water_off'] = function() {
  return `await robot.waterOff();\n`;
};

javascriptGenerator.forBlock['farmbot_water_for'] = function(block) {
  const secs = javascriptGenerator.valueToCode(block, 'SECS', Order.ATOMIC) || '5';
  return `await robot.waterOn();\nawait robot.wait(${secs} * 1000);\nawait robot.waterOff();\n`;
};

javascriptGenerator.forBlock['farmbot_set_water_flow'] = function(block) {
  const flow = javascriptGenerator.valueToCode(block, 'FLOW', Order.ATOMIC) || '50';
  return `await robot.setWaterFlow(${flow});\n`;
};

javascriptGenerator.forBlock['farmbot_drip_irrigate'] = function(block) {
  const amount = javascriptGenerator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '100';
  return `await robot.dripIrrigate(${amount});\n`;
};

javascriptGenerator.forBlock['farmbot_water_area'] = function(block) {
  const x1 = javascriptGenerator.valueToCode(block, 'X1', Order.ATOMIC) || '0';
  const y1 = javascriptGenerator.valueToCode(block, 'Y1', Order.ATOMIC) || '0';
  const x2 = javascriptGenerator.valueToCode(block, 'X2', Order.ATOMIC) || '1000';
  const y2 = javascriptGenerator.valueToCode(block, 'Y2', Order.ATOMIC) || '500';
  return `await robot.waterArea(${x1}, ${y1}, ${x2}, ${y2});\n`;
};
