import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── OT ALMA JENERATÖRLERİ ───────────────────────────── */

javascriptGenerator.forBlock['farmbot_detect_weeds'] = function() {
  return `await robot.detectWeeds();\n`;
};

javascriptGenerator.forBlock['farmbot_remove_weed'] = function() {
  return `await robot.removeWeed();\n`;
};

javascriptGenerator.forBlock['farmbot_scan_weeds'] = function(block) {
  const x1 = javascriptGenerator.valueToCode(block, 'X1', Order.ATOMIC) || '0';
  const y1 = javascriptGenerator.valueToCode(block, 'Y1', Order.ATOMIC) || '0';
  const x2 = javascriptGenerator.valueToCode(block, 'X2', Order.ATOMIC) || '3000';
  const y2 = javascriptGenerator.valueToCode(block, 'Y2', Order.ATOMIC) || '1500';
  return `await robot.scanWeeds(${x1}, ${y1}, ${x2}, ${y2});\n`;
};

javascriptGenerator.forBlock['farmbot_clear_all_weeds'] = function() {
  return `await robot.clearAllWeeds();\n`;
};

javascriptGenerator.forBlock['farmbot_weed_count'] = function() {
  return [`(await robot.getWeedCount())`, Order.FUNCTION_CALL];
};
