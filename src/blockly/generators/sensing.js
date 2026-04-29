import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── ALGILAMA JENERATÖRLERİ ─────────────────────────── */

javascriptGenerator.forBlock['sensing_touchingedge'] = function(block) {
  // Farmbot'un max yatağı: X:3000, Y:1500, Z:0
  // Sınırları check etmek için API çağrısı yapıyoruz
  return [`(await robot.isTouchingEdge())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['sensing_xpos'] = function(block) {
  return [`(await robot.getX())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['sensing_ypos'] = function(block) {
  return [`(await robot.getY())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['sensing_zpos'] = function(block) {
  return [`(await robot.getZ())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['sensing_sensorvalue'] = function(block) {
  const sensorType = block.getFieldValue('SENSOR');
  return [`(await robot.readSensor('${sensorType}'))`, Order.FUNCTION_CALL];
};
