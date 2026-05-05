import * as Blockly from 'blockly';

/* ── TOPRAK & SENSÖR BLOKLARI (Kahverengi/Amber) ─────── */

// 1. Toprak Analizi
Blockly.Blocks['farmbot_soil_analysis'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_soil_analysis',
      message0: '%{BKY_BLOCK_SOIL_ANALYSIS}',
      previousStatement: null,
      nextStatement: null,
      colour: '#a16207',
      tooltip: 'Mevcut konumda toprak analizi yapar (nem, pH, sıcaklık)',
    });
  },
};

// 2. Nem Sensörü Oku
Blockly.Blocks['farmbot_read_moisture'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_moisture',
      message0: '%{BKY_BLOCK_READ_MOISTURE}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Mevcut konumda toprak nem seviyesini okur (0-100)',
    });
  },
};

// 3. Toprak Sıcaklığı Oku
Blockly.Blocks['farmbot_read_soil_temp'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_soil_temp',
      message0: '%{BKY_BLOCK_READ_SOIL_TEMP}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Mevcut konumda toprak sıcaklığını okur (°C)',
    });
  },
};

// 4. Toprak pH Oku
Blockly.Blocks['farmbot_read_ph'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_ph',
      message0: '%{BKY_BLOCK_READ_PH}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Mevcut konumda toprak pH seviyesini okur (0-14)',
    });
  },
};

// 5. Hava Sıcaklığı
Blockly.Blocks['farmbot_read_air_temp'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_air_temp',
      message0: '%{BKY_BLOCK_READ_AIR_TEMP}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Hava sıcaklığı sensöründen değer okur (°C)',
    });
  },
};

// 6. Hava Nemi
Blockly.Blocks['farmbot_read_humidity'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_humidity',
      message0: '%{BKY_BLOCK_READ_HUMIDITY}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Hava nem seviyesini okur (%)',
    });
  },
};

// 7. Işık Seviyesi
Blockly.Blocks['farmbot_read_light'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_read_light',
      message0: '%{BKY_BLOCK_READ_LIGHT}',
      output: 'Number',
      colour: '#a16207',
      tooltip: 'Güneş ışığı yoğunluğunu okur (lux)',
    });
  },
};

// 8. Nem yeterli mi? (boolean)
Blockly.Blocks['farmbot_is_soil_wet'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_is_soil_wet',
      message0: '%{BKY_BLOCK_IS_SOIL_WET}',
      output: 'Boolean',
      colour: '#a16207',
      tooltip: 'Toprak nem seviyesi yeterli ise doğru döndürür',
    });
  },
};
