import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── ARAÇLAR & DONANIM JENERATÖRLERİ ─────────────────── */

javascriptGenerator.forBlock['farmbot_mount_tool'] = function(block) {
  const tool = block.getFieldValue('TOOL');
  return `await robot.mountTool('${tool}');\n`;
};

javascriptGenerator.forBlock['farmbot_dismount_tool'] = function() {
  return `await robot.dismountTool();\n`;
};

javascriptGenerator.forBlock['farmbot_calibrate_tool'] = function() {
  return `await robot.calibrateTool();\n`;
};

javascriptGenerator.forBlock['farmbot_led_on'] = function(block) {
  const color = block.getFieldValue('COLOR');
  return `await robot.ledOn('${color}');\n`;
};

javascriptGenerator.forBlock['farmbot_led_off'] = function() {
  return `await robot.ledOff();\n`;
};

javascriptGenerator.forBlock['farmbot_vacuum_on'] = function() {
  return `await robot.vacuumOn();\n`;
};

javascriptGenerator.forBlock['farmbot_vacuum_off'] = function() {
  return `await robot.vacuumOff();\n`;
};

javascriptGenerator.forBlock['farmbot_set_speed'] = function(block) {
  const speed = javascriptGenerator.valueToCode(block, 'SPEED', Order.ATOMIC) || '100';
  return `await robot.setSpeed(${speed});\n`;
};

javascriptGenerator.forBlock['farmbot_emergency_stop'] = function() {
  return `await robot.emergencyStop();\n`;
};

javascriptGenerator.forBlock['farmbot_write_pin'] = function(block) {
  const pin = javascriptGenerator.valueToCode(block, 'PIN', Order.ATOMIC) || '0';
  const value = block.getFieldValue('VALUE');
  return `await robot.writePin(${pin}, ${value});\n`;
};

javascriptGenerator.forBlock['farmbot_read_pin'] = function(block) {
  const pin = javascriptGenerator.valueToCode(block, 'PIN', Order.ATOMIC) || '0';
  return [`(await robot.readPin(${pin}))`, Order.FUNCTION_CALL];
};
