import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── TOPRAK & SENSÖR JENERATÖRLERİ ───────────────────── */

javascriptGenerator.forBlock['farmbot_soil_analysis'] = function() {
  return `await robot.soilAnalysis();\n`;
};

javascriptGenerator.forBlock['farmbot_read_moisture'] = function() {
  return [`(await robot.readSensor('SOIL_MOISTURE'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_read_soil_temp'] = function() {
  return [`(await robot.readSensor('SOIL_TEMP'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_read_ph'] = function() {
  return [`(await robot.readSensor('SOIL_PH'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_read_air_temp'] = function() {
  return [`(await robot.readSensor('AIR_TEMP'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_read_humidity'] = function() {
  return [`(await robot.readSensor('AIR_HUMIDITY'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_read_light'] = function() {
  return [`(await robot.readSensor('LIGHT'))`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_is_soil_wet'] = function() {
  return [`(await robot.readSensor('SOIL_MOISTURE') > 40)`, Order.FUNCTION_CALL];
};
