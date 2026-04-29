import { javascriptGenerator } from 'blockly/javascript';

/* ── SES JENERATÖRLERİ ──────────────────────────────── */

javascriptGenerator.forBlock['sound_play_until_done'] = function(block) {
  const sound = block.getFieldValue('SOUND');
  return `await robot.playSound('${sound}', true);\n`;
};

javascriptGenerator.forBlock['sound_start'] = function(block) {
  const sound = block.getFieldValue('SOUND');
  return `robot.playSound('${sound}', false);\n`; // await yok, devam eder
};
