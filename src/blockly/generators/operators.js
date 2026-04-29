import { javascriptGenerator, Order } from 'blockly/javascript';

/* ── OPERATÖRLER JENERATÖRLERİ ──────────────────────── */

javascriptGenerator.forBlock['operator_add'] = function(block) {
  const num1 = javascriptGenerator.valueToCode(block, 'NUM1', Order.ADDITION) || '0';
  const num2 = javascriptGenerator.valueToCode(block, 'NUM2', Order.ADDITION) || '0';
  return [`(${num1} + ${num2})`, Order.ADDITION];
};

javascriptGenerator.forBlock['operator_subtract'] = function(block) {
  const num1 = javascriptGenerator.valueToCode(block, 'NUM1', Order.SUBTRACTION) || '0';
  const num2 = javascriptGenerator.valueToCode(block, 'NUM2', Order.SUBTRACTION) || '0';
  return [`(${num1} - ${num2})`, Order.SUBTRACTION];
};

javascriptGenerator.forBlock['operator_multiply'] = function(block) {
  const num1 = javascriptGenerator.valueToCode(block, 'NUM1', Order.MULTIPLICATION) || '0';
  const num2 = javascriptGenerator.valueToCode(block, 'NUM2', Order.MULTIPLICATION) || '0';
  return [`(${num1} * ${num2})`, Order.MULTIPLICATION];
};

javascriptGenerator.forBlock['operator_divide'] = function(block) {
  const num1 = javascriptGenerator.valueToCode(block, 'NUM1', Order.DIVISION) || '0';
  const num2 = javascriptGenerator.valueToCode(block, 'NUM2', Order.DIVISION) || '1';
  return [`(${num1} / ${num2})`, Order.DIVISION];
};

javascriptGenerator.forBlock['operator_random'] = function(block) {
  const from = javascriptGenerator.valueToCode(block, 'FROM', Order.NONE) || '1';
  const to = javascriptGenerator.valueToCode(block, 'TO', Order.NONE) || '10';
  const code = `Math.floor(Math.random() * (${to} - ${from} + 1) + ${from})`;
  return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock['operator_gt'] = function(block) {
  const val1 = javascriptGenerator.valueToCode(block, 'VAL1', Order.RELATIONAL) || '0';
  const val2 = javascriptGenerator.valueToCode(block, 'VAL2', Order.RELATIONAL) || '0';
  return [`(${val1} > ${val2})`, Order.RELATIONAL];
};

javascriptGenerator.forBlock['operator_lt'] = function(block) {
  const val1 = javascriptGenerator.valueToCode(block, 'VAL1', Order.RELATIONAL) || '0';
  const val2 = javascriptGenerator.valueToCode(block, 'VAL2', Order.RELATIONAL) || '0';
  return [`(${val1} < ${val2})`, Order.RELATIONAL];
};

javascriptGenerator.forBlock['operator_equals'] = function(block) {
  const val1 = javascriptGenerator.valueToCode(block, 'VAL1', Order.EQUALITY) || '0';
  const val2 = javascriptGenerator.valueToCode(block, 'VAL2', Order.EQUALITY) || '0';
  return [`(${val1} == ${val2})`, Order.EQUALITY];
};

javascriptGenerator.forBlock['operator_and'] = function(block) {
  const bool1 = javascriptGenerator.valueToCode(block, 'BOOL1', Order.LOGICAL_AND) || 'false';
  const bool2 = javascriptGenerator.valueToCode(block, 'BOOL2', Order.LOGICAL_AND) || 'false';
  return [`(${bool1} && ${bool2})`, Order.LOGICAL_AND];
};

javascriptGenerator.forBlock['operator_or'] = function(block) {
  const bool1 = javascriptGenerator.valueToCode(block, 'BOOL1', Order.LOGICAL_OR) || 'false';
  const bool2 = javascriptGenerator.valueToCode(block, 'BOOL2', Order.LOGICAL_OR) || 'false';
  return [`(${bool1} || ${bool2})`, Order.LOGICAL_OR];
};

javascriptGenerator.forBlock['operator_not'] = function(block) {
  const bool = javascriptGenerator.valueToCode(block, 'BOOL', Order.LOGICAL_NOT) || 'false';
  return [`!(${bool})`, Order.LOGICAL_NOT];
};
