import * as Blockly from 'blockly';

/* ── TOPRAK & SENSÖR BLOKLARI (Kahverengi/Amber) ─────── */

// 1. Toprak Analizi
Blockly.Blocks['farmbot_soil_analysis'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_soil_analysis',
      message0: Blockly.Msg['BLOCK_SOIL_ANALYSIS'] || '🧪 toprak analizi yap',
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
      message0: Blockly.Msg['BLOCK_READ_MOISTURE'] || '💧 toprak nemini ölç',
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
      message0: Blockly.Msg['BLOCK_READ_SOIL_TEMP'] || '🌡 toprak sıcaklığını ölç',
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
      message0: Blockly.Msg['BLOCK_READ_PH'] || '🧪 toprak pH değerini ölç',
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
      message0: Blockly.Msg['BLOCK_READ_AIR_TEMP'] || '🌤 hava sıcaklığını ölç',
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
      message0: Blockly.Msg['BLOCK_READ_HUMIDITY'] || '💨 hava nemini ölç',
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
      message0: Blockly.Msg['BLOCK_READ_LIGHT'] || '☀️ ışık seviyesini ölç',
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
      message0: Blockly.Msg['BLOCK_IS_SOIL_WET'] || '💧 toprak yeterince nemli mi?',
      output: 'Boolean',
      colour: '#a16207',
      tooltip: 'Toprak nem seviyesi yeterli ise doğru döndürür',
    });
  },
};
