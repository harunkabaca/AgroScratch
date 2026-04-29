import * as Blockly from 'blockly';

/* ── HAREKET (Mavi) ─────────────────────────────────── */

// 1. X, Y, Z Konumuna Git
Blockly.Blocks['motion_gotoxyz'] = {
  init() {
    this.jsonInit({
      type: 'motion_gotoxyz',
      message0: Blockly.Msg['BLOCK_MOVE_TO'],
      args0: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
        { type: 'input_value', name: 'Z', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
    });
  },
};

// 2. Başlangıca Git (0,0,0)
Blockly.Blocks['motion_gohome'] = {
  init() {
    this.jsonInit({
      type: 'motion_gohome',
      message0: Blockly.Msg['BLOCK_GO_HOME'],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
    });
  },
};

// 3. X'i Değiştir
Blockly.Blocks['motion_changex'] = {
  init() {
    this.jsonInit({
      type: 'motion_changex',
      message0: Blockly.Msg['BLOCK_CHANGE_X'],
      args0: [
        { type: 'input_value', name: 'DX', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
    });
  },
};

// 4. Y'yi Değiştir
Blockly.Blocks['motion_changey'] = {
  init() {
    this.jsonInit({
      type: 'motion_changey',
      message0: Blockly.Msg['BLOCK_CHANGE_Y'],
      args0: [
        { type: 'input_value', name: 'DY', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
    });
  },
};

// 5. Z'yi Değiştir
Blockly.Blocks['motion_changez'] = {
  init() {
    this.jsonInit({
      type: 'motion_changez',
      message0: Blockly.Msg['BLOCK_CHANGE_Z'],
      args0: [
        { type: 'input_value', name: 'DZ', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
    });
  },
};
