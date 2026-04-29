import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

/* ── KONTROL JENERATÖRLERİ ──────────────────────────── */

javascriptGenerator.forBlock['control_wait'] = function(block) {
  const seconds = javascriptGenerator.valueToCode(block, 'DURATION', javascriptGenerator.ORDER_ATOMIC) || '1';
  return `await robot.wait(${seconds} * 1000);\n`;
};

javascriptGenerator.forBlock['control_repeat'] = function(block) {
  const repeats = javascriptGenerator.valueToCode(block, 'TIMES', javascriptGenerator.ORDER_ATOMIC) || '10';
  let branch = javascriptGenerator.statementToCode(block, 'DO');
  branch = javascriptGenerator.addLoopTrap(branch, block) || branch;
  
  const loopVar = javascriptGenerator.nameDB_.getDistinctName('count', Blockly.Names.NameType.VARIABLE);
  
  let code = `for (let ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n`;
  code += `  await robot.checkAbort();\n`; 
  code += branch;
  code += `}\n`;
  return code;
};

javascriptGenerator.forBlock['control_forever'] = function(block) {
  let branch = javascriptGenerator.statementToCode(block, 'DO');
  branch = javascriptGenerator.addLoopTrap(branch, block) || branch;
  
  let code = `while (true) {\n`;
  code += `  await robot.checkAbort();\n`; 
  code += branch;
  code += `  await robot.wait(50);\n`; // Yield for engine stability
  code += `}\n`;
  return code;
};

javascriptGenerator.forBlock['control_if'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false';
  let branch = javascriptGenerator.statementToCode(block, 'DO');
  return `if (${condition}) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['control_if_else'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false';
  let branchDo = javascriptGenerator.statementToCode(block, 'DO');
  let branchElse = javascriptGenerator.statementToCode(block, 'ELSE');
  return `if (${condition}) {\n${branchDo}} else {\n${branchElse}}\n`;
};

javascriptGenerator.forBlock['control_wait_until'] = function(block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false';
  return `while (!(${condition})) {\n  await robot.checkAbort();\n  await robot.wait(100);\n}\n`;
};

/* ── OLAYLAR JENERATÖRLERİ ──────────────────────────── */
javascriptGenerator.forBlock['event_whenflagclicked'] = function(block) {
  // Olay bloğu aslında bir yorum veya engine için bir marker olabilir. 
  // Biz şimdilik kod üretmiyoruz çünkü engine zaten blokları sırayla çalıştıracak.
  return `// Başlangıç\n`;
};
