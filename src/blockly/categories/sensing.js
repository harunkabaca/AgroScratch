import * as Blockly from 'blockly';

/* ── ALGILAMA (Açık Mavi) ───────────────────────────── */

// 1. Kenara Değiyor mu?
Blockly.Blocks['sensing_touchingedge'] = {
  init() {
    this.jsonInit({
      type: 'sensing_touchingedge',
      message0: Blockly.Msg['BLOCK_TOUCHING_EDGE'],
      output: 'Boolean',
      colour: '#5cb1d6',
    });
  },
};

// 2. X Konumu
Blockly.Blocks['sensing_xpos'] = {
  init() {
    this.jsonInit({
      type: 'sensing_xpos',
      message0: Blockly.Msg['BLOCK_X_POS'],
      output: 'Number',
      colour: '#5cb1d6',
    });
  },
};

// 3. Y Konumu
Blockly.Blocks['sensing_ypos'] = {
  init() {
    this.jsonInit({
      type: 'sensing_ypos',
      message0: Blockly.Msg['BLOCK_Y_POS'],
      output: 'Number',
      colour: '#5cb1d6',
    });
  },
};

// 4. Z Konumu
Blockly.Blocks['sensing_zpos'] = {
  init() {
    this.jsonInit({
      type: 'sensing_zpos',
      message0: Blockly.Msg['BLOCK_Z_POS'],
      output: 'Number',
      colour: '#5cb1d6',
    });
  },
};

// 5. Sensör Değeri Okuma
Blockly.Blocks['sensing_sensorvalue'] = {
  init() {
    const options = [
      [Blockly.Msg['SENSOR_MOISTURE'] || 'Moisture', 'SOIL_MOISTURE'],
      [Blockly.Msg['SENSOR_LIGHT'] || 'Light', 'LIGHT'],
      [Blockly.Msg['SENSOR_TEMP'] || 'Temp', 'AIR_TEMP'],
    ];

    this.jsonInit({
      type: 'sensing_sensorvalue',
      message0: Blockly.Msg['BLOCK_SENSOR_VAL'],
      args0: [
        {
          type: 'field_dropdown',
          name: 'SENSOR',
          options: options,
        },
      ],
      output: 'Number',
      colour: '#5cb1d6',
    });
  },
};
