import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── KAMERA & FOTOĞRAF JENERATÖRLERİ ────────────────── */

javascriptGenerator.forBlock['farmbot_take_photo'] = function() {
  return `await robot.takePhoto();\n`;
};

javascriptGenerator.forBlock['farmbot_detect_plants'] = function() {
  return `await robot.detectPlants();\n`;
};

javascriptGenerator.forBlock['farmbot_check_plant_health'] = function() {
  return [`(await robot.checkPlantHealth())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_measure_height'] = function() {
  return [`(await robot.measureHeight())`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['farmbot_scan_garden'] = function() {
  return `await robot.scanGarden();\n`;
};

javascriptGenerator.forBlock['farmbot_plant_count'] = function() {
  return [`(await robot.getPlantCount())`, Order.FUNCTION_CALL];
};
