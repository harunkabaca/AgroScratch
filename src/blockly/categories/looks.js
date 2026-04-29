import * as Blockly from 'blockly';

/* ── GÖRÜNÜM (Mor) ──────────────────────────────────── */

// 1. Söyle (Say)
Blockly.Blocks['looks_say'] = {
  init() {
    this.jsonInit({
      type: 'looks_say',
      message0: Blockly.Msg['BLOCK_SAY'],
      args0: [{ type: 'input_value', name: 'MESSAGE', check: 'String' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#9333ea',
    });
  },
};

// 2. Süreli Söyle (Say for secs)
Blockly.Blocks['looks_sayforsecs'] = {
  init() {
    this.jsonInit({
      type: 'looks_sayforsecs',
      message0: Blockly.Msg['BLOCK_SAY_FOR_SECS'],
      args0: [
        { type: 'input_value', name: 'MESSAGE', check: 'String' },
        { type: 'input_value', name: 'SECS', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#9333ea',
    });
  },
};

// 3. Alet Değiştir (Switch Tool)
Blockly.Blocks['looks_switchtool'] = {
  init() {
    const options = [
      [Blockly.Msg['TOOL_NONE'] || 'None', 'NONE'],
      [Blockly.Msg['TOOL_WATER'] || 'Water', 'WATERING_NOZZLE'],
      [Blockly.Msg['TOOL_SEEDER'] || 'Seeder', 'SEEDER'],
      [Blockly.Msg['TOOL_WEEDER'] || 'Weeder', 'WEEDER'],
      [Blockly.Msg['TOOL_CAMERA'] || 'Camera', 'CAMERA'],
    ];

    this.jsonInit({
      type: 'looks_switchtool',
      message0: Blockly.Msg['BLOCK_SWITCH_TOOL'],
      args0: [
        {
          type: 'field_dropdown',
          name: 'TOOL',
          options: options,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#9333ea',
    });
  },
};
