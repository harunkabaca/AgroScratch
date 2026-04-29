import * as Blockly from 'blockly';

/* ── ARAÇLAR & DONANIM BLOKLARI (Gri/Çelik) ──────────── */

// 1. Alet Tak
Blockly.Blocks['farmbot_mount_tool'] = {
  init() {
    const options = [
      [Blockly.Msg['TOOL_WATER'] || '💧 Sulama Ucu', 'WATERING_NOZZLE'],
      [Blockly.Msg['TOOL_SEEDER'] || '🌱 Tohum Ucu', 'SEEDER'],
      [Blockly.Msg['TOOL_WEEDER'] || '🌿 Ot Alma Ucu', 'WEEDER'],
      [Blockly.Msg['TOOL_CAMERA'] || '📷 Kamera', 'CAMERA'],
      [Blockly.Msg['TOOL_SOIL_SENSOR'] || '🧪 Toprak Sensörü', 'SOIL_SENSOR'],
      [Blockly.Msg['TOOL_ROTARY'] || '🔄 Döner Alet', 'ROTARY'],
    ];
    this.jsonInit({
      type: 'farmbot_mount_tool',
      message0: Blockly.Msg['BLOCK_MOUNT_TOOL'] || '🔧 %1 aletini tak',
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
      message0: Blockly.Msg['BLOCK_DISMOUNT_TOOL'] || '🔧 aleti çıkar ve yerine koy',
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
      message0: Blockly.Msg['BLOCK_CALIBRATE_TOOL'] || '🎯 mevcut aleti kalibre et',
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
      [Blockly.Msg['LED_WHITE'] || '⬜ Beyaz', 'WHITE'],
      [Blockly.Msg['LED_RED'] || '🟥 Kırmızı', 'RED'],
      [Blockly.Msg['LED_GREEN'] || '🟩 Yeşil', 'GREEN'],
      [Blockly.Msg['LED_BLUE'] || '🟦 Mavi', 'BLUE'],
    ];
    this.jsonInit({
      type: 'farmbot_led_on',
      message0: Blockly.Msg['BLOCK_LED_ON'] || '💡 %1 LED aç',
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
      message0: Blockly.Msg['BLOCK_LED_OFF'] || '💡 LED kapat',
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
      message0: Blockly.Msg['BLOCK_VACUUM_ON'] || '🔽 vakumu aç',
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
      message0: Blockly.Msg['BLOCK_VACUUM_OFF'] || '🔼 vakumu kapat',
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
      message0: Blockly.Msg['BLOCK_SET_SPEED'] || '⚡ hareket hızını %1 %% yap',
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
      message0: Blockly.Msg['BLOCK_EMERGENCY_STOP'] || '🛑 acil durdur',
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
      message0: Blockly.Msg['BLOCK_WRITE_PIN'] || '🔌 pin %1 → %2',
      args0: [
        { type: 'input_value', name: 'PIN', check: 'Number' },
        {
          type: 'field_dropdown', name: 'VALUE',
          options: [
            [Blockly.Msg['PIN_HIGH'] || 'AÇIK (1)', '1'],
            [Blockly.Msg['PIN_LOW'] || 'KAPALI (0)', '0'],
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
      message0: Blockly.Msg['BLOCK_READ_PIN'] || '🔌 pin %1 değerini oku',
      args0: [{ type: 'input_value', name: 'PIN', check: 'Number' }],
      output: 'Number',
      colour: '#64748b',
      tooltip: 'Dijital pin değerini okur',
    });
  },
};
