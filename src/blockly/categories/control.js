import * as Blockly from 'blockly';

/* ── KONTROL (Turuncu) ──────────────────────────────── */

// 1. Bekle (Saniye bazlı)
Blockly.Blocks['control_wait'] = {
  init() {
    this.jsonInit({
      type: 'control_wait',
      message0: Blockly.Msg['BLOCK_WAIT'],
      args0: [{ type: 'input_value', name: 'DURATION', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#f97316',
    });
  },
};

// 2. X Kez Tekrarla
Blockly.Blocks['control_repeat'] = {
  init() {
    this.jsonInit({
      type: 'control_repeat',
      message0: Blockly.Msg['BLOCK_REPEAT'],
      args0: [{ type: 'input_value', name: 'TIMES', check: 'Number' }],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#f97316',
    });
  },
};

// 3. Sürekli Tekrarla
Blockly.Blocks['control_forever'] = {
  init() {
    this.jsonInit({
      type: 'control_forever',
      message0: Blockly.Msg['BLOCK_FOREVER'],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      colour: '#f97316',
    });
  },
};

// 4. Eğer ... ise
Blockly.Blocks['control_if'] = {
  init() {
    this.jsonInit({
      type: 'control_if',
      message0: Blockly.Msg['BLOCK_IF'],
      args0: [{ type: 'input_value', name: 'CONDITION', check: 'Boolean' }],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#f97316',
    });
  },
};

// 5. Eğer ... ise ... değilse
Blockly.Blocks['control_if_else'] = {
  init() {
    this.jsonInit({
      type: 'control_if_else',
      message0: Blockly.Msg['BLOCK_IF_ELSE'],
      args0: [{ type: 'input_value', name: 'CONDITION', check: 'Boolean' }],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      message2: Blockly.Msg['BLOCK_ELSE'],
      message3: '  %1',
      args3: [{ type: 'input_statement', name: 'ELSE' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#f97316',
    });
  },
};

// 6. ... olana kadar bekle
Blockly.Blocks['control_wait_until'] = {
  init() {
    this.jsonInit({
      type: 'control_wait_until',
      message0: Blockly.Msg['BLOCK_WAIT_UNTIL'],
      args0: [{ type: 'input_value', name: 'CONDITION', check: 'Boolean' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#f97316',
    });
  },
};
