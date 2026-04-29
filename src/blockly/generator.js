/**
 * AgroScratch — Code Generator (Transpiler)
 * Blokları async JavaScript fonksiyonlarına çevirir.
 */
import { javascriptGenerator, Order } from 'blockly/javascript';

// ── Scratch-tarzı temel jeneratörler ──
import './generators/control';
import './generators/motion';
import './generators/looks';
import './generators/operators';
import './generators/sensing';
import './generators/sound';

// ── FarmBot özel jeneratörler ──
import './generators/farmbot_watering';
import './generators/farmbot_seeding';
import './generators/farmbot_weeding';
import './generators/farmbot_soil';
import './generators/farmbot_tools';
import './generators/farmbot_camera';
import './generators/farmbot_movement';
import './generators/farmbot_sequences';

/* ── Move ──────────────────────────────────────────── */
javascriptGenerator.forBlock['farmbot_move'] = function (block) {
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const z = block.getFieldValue('Z');
  return `await robot.moveTo(${x}, ${y}, ${z});\n`;
};

/* ── Water ─────────────────────────────────────────── */
javascriptGenerator.forBlock['farmbot_water'] = function (block) {
  const duration = block.getFieldValue('DURATION');
  return `await robot.waterOn();\nawait robot.wait(${duration});\nawait robot.waterOff();\n`;
};

/* ── Wait ──────────────────────────────────────────── */
javascriptGenerator.forBlock['farmbot_wait'] = function (block) {
  const duration = block.getFieldValue('DURATION');
  return `await robot.wait(${duration});\n`;
};

/* ── Loop ──────────────────────────────────────────── */
javascriptGenerator.forBlock['farmbot_loop'] = function (block, generator) {
  const times = block.getFieldValue('TIMES');
  const body = generator.statementToCode(block, 'DO');
  return `for (let i = 0; i < ${times}; i++) {\n${body}}\n`;
};

/* ── If Sensor ─────────────────────────────────────── */
javascriptGenerator.forBlock['farmbot_if_sensor'] = function (block, generator) {
  const threshold = block.getFieldValue('THRESHOLD');
  const body = generator.statementToCode(block, 'DO');
  return `if (await robot.readSensor() < ${threshold}) {\n${body}}\n`;
};

/**
 * Workspace'ten çalıştırılabilir async kod üretir.
 */
export function generateCode(workspace) {
  const raw = javascriptGenerator.workspaceToCode(workspace);
  return `(async function(robot) {\n${raw}})`;
}
