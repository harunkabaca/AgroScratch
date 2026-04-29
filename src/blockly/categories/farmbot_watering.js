import * as Blockly from 'blockly';

/* ── SULAMA BLOKLARI (Mavi) ──────────────────────────── */

// 1. Sulamayı Aç
Blockly.Blocks['farmbot_water_on'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water_on',
      message0: Blockly.Msg['BLOCK_WATER_ON'] || '💧 sulamayı aç',
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Sulama valfini açar',
    });
  },
};

// 2. Sulamayı Kapat
Blockly.Blocks['farmbot_water_off'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water_off',
      message0: Blockly.Msg['BLOCK_WATER_OFF'] || '🚫 sulamayı kapat',
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Sulama valfini kapatır',
    });
  },
};

// 3. Belirli Süre Sula
Blockly.Blocks['farmbot_water_for'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water_for',
      message0: Blockly.Msg['BLOCK_WATER_FOR'] || '💧 %1 saniye sula',
      args0: [{ type: 'input_value', name: 'SECS', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Belirtilen süre boyunca sulamayı yapar',
    });
  },
};

// 4. Su Miktarını Ayarla (mL)
Blockly.Blocks['farmbot_set_water_flow'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_set_water_flow',
      message0: Blockly.Msg['BLOCK_SET_WATER_FLOW'] || '💧 su akış hızını %1 mL/s yap',
      args0: [{ type: 'input_value', name: 'FLOW', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Su akış hızını ayarlar',
    });
  },
};

// 5. Damlatma Sulama
Blockly.Blocks['farmbot_drip_irrigate'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_drip_irrigate',
      message0: Blockly.Msg['BLOCK_DRIP_IRRIGATE'] || '🌧 damlatma sulama: %1 mL',
      args0: [{ type: 'input_value', name: 'AMOUNT', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Belirli miktarda damlatma sulama yapar',
    });
  },
};

// 6. Alan Sula (Dikdörtgen bölge)
Blockly.Blocks['farmbot_water_area'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water_area',
      message0: Blockly.Msg['BLOCK_WATER_AREA'] || '💦 alanı sula X1:%1 Y1:%2 X2:%3 Y2:%4',
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#2563eb',
      tooltip: 'Belirtilen dikdörtgen alanı sular',
      inputsInline: true,
    });
  },
};
