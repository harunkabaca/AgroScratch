import * as Blockly from 'blockly';

/* ── ARAÇLAR & DONANIM BLOKLARI (Gri/Çelik) ──────────── */

// 1. Alet Tak
Blockly.Blocks['farmbot_mount_tool'] = {
  init() {
    const options = [
      ['%{BKY_TOOL_WATER}', 'WATERING_NOZZLE'],
      ['%{BKY_TOOL_SEEDER}', 'SEEDER'],
      ['%{BKY_TOOL_WEEDER}', 'WEEDER'],
      ['%{BKY_TOOL_CAMERA}', 'CAMERA'],
      ['%{BKY_TOOL_SOIL_SENSOR}', 'SOIL_SENSOR'],
      ['%{BKY_TOOL_ROTARY}', 'ROTARY'],
    ];
    this.jsonInit({
      type: 'farmbot_mount_tool',
      message0: '%{BKY_BLOCK_MOUNT_TOOL}',
      args0: [{ type: 'field_dropdown', name: 'TOOL', options }],
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Seçili aleti FarmBot kafasına takar',
    });
  },
};

// 2. Alet Çıkar
Blockly.Blocks['farmbot_dismount_tool'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_dismount_tool',
      message0: '%{BKY_BLOCK_DISMOUNT_TOOL}',
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Takılı aleti alet yuvasına geri koyar',
    });
  },
};

// 3. Alet Kalibre Et
Blockly.Blocks['farmbot_calibrate_tool'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_calibrate_tool',
      message0: '%{BKY_BLOCK_CALIBRATE_TOOL}',
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Takılı aletin kalibrasyonunu yapar',
    });
  },
};

// 4. LED Aç
Blockly.Blocks['farmbot_led_on'] = {
  init() {
    const colors = [
      ['%{BKY_LED_WHITE}', 'WHITE'],
      ['%{BKY_LED_RED}', 'RED'],
      ['%{BKY_LED_GREEN}', 'GREEN'],
      ['%{BKY_LED_BLUE}', 'BLUE'],
    ];
    this.jsonInit({
      type: 'farmbot_led_on',
      message0: '%{BKY_BLOCK_LED_ON}',
      args0: [{ type: 'field_dropdown', name: 'COLOR', options: colors }],
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'FarmBot LED ışığını belirtilen renkte açar',
    });
  },
};

// 5. LED Kapat
Blockly.Blocks['farmbot_led_off'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_led_off',
      message0: '%{BKY_BLOCK_LED_OFF}',
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'FarmBot LED ışığını kapatır',
    });
  },
};

// 6. Vakum Aç
Blockly.Blocks['farmbot_vacuum_on'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_vacuum_on',
      message0: '%{BKY_BLOCK_VACUUM_ON}',
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Tohum ekim vakumunu çalıştırır',
    });
  },
};

// 7. Vakum Kapat
Blockly.Blocks['farmbot_vacuum_off'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_vacuum_off',
      message0: '%{BKY_BLOCK_VACUUM_OFF}',
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Tohum ekim vakumunu durdurur',
    });
  },
};

// 8. Motor Hızı Ayarla
Blockly.Blocks['farmbot_set_speed'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_set_speed',
      message0: '%{BKY_BLOCK_SET_SPEED}',
      args0: [{ type: 'input_value', name: 'SPEED', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Motor hareket hızını ayarlar (1-100%)',
    });
  },
};

// 9. Acil Durdur
Blockly.Blocks['farmbot_emergency_stop'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_emergency_stop',
      message0: '%{BKY_BLOCK_EMERGENCY_STOP}',
      previousStatement: null,
      colour: '#dc2626',
      tooltip: 'FarmBot\'u acil olarak durdurur — programı sonlandırır',
    });
  },
};

// 10. Pin Yaz (dijital)
Blockly.Blocks['farmbot_write_pin'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_write_pin',
      message0: '%{BKY_BLOCK_WRITE_PIN}',
      args0: [
        { type: 'input_value', name: 'PIN', check: 'Number' },
        {
          type: 'field_dropdown', name: 'VALUE',
          options: [
            ['%{BKY_PIN_HIGH}', '1'],
            ['%{BKY_PIN_LOW}', '0'],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#64748b',
      tooltip: 'Dijital pin değerini ayarlar',
      inputsInline: true,
    });
  },
};

// 11. Pin Oku
Blockly.Blocks['farmbot_read_pin'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_pin',
      message0: '%{BKY_BLOCK_READ_PIN}',
      args0: [{ type: 'input_value', name: 'PIN', check: 'Number' }],
      output: 'Number',
      colour: '#64748b',
      tooltip: 'Dijital pin değerini okur',
    });
  },
};
