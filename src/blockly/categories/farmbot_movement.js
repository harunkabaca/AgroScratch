import * as Blockly from 'blockly';

/* ── GELİŞMİŞ HAREKET BLOKLARI (Cyan/Teal) ──────────── */

// 1. Bitkiye Git (isimle)
Blockly.Blocks['farmbot_goto_plant'] = {
  init() {
    const options = [
      ['%{BKY_SEED_TOMATO}', 'TOMATO'],
      ['%{BKY_SEED_CUCUMBER}', 'CUCUMBER'],
      ['%{BKY_SEED_LETTUCE}', 'LETTUCE'],
      ['%{BKY_SEED_CARROT}', 'CARROT'],
      ['%{BKY_SEED_PEPPER}', 'PEPPER'],
    ];
    this.jsonInit({
      type: 'farmbot_goto_plant',
      message0: '%{BKY_BLOCK_GOTO_PLANT}',
      args0: [{ type: 'field_dropdown', name: 'PLANT', options }],
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Seçilen bitkinin konumuna gider',
    });
  },
};

// 2. Alet Yuvasına Git
Blockly.Blocks['farmbot_goto_tool_bay'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_goto_tool_bay',
      message0: '%{BKY_BLOCK_GOTO_TOOL_BAY}',
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Alet takma/çıkarma noktasına hareket eder',
    });
  },
};

// 3. Tohum Tepsisine Git
Blockly.Blocks['farmbot_goto_seed_tray'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_goto_seed_tray',
      message0: '%{BKY_BLOCK_GOTO_SEED_TRAY}',
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Tohum tepsisi konumuna gider',
    });
  },
};

// 4. Su Kaynağına Git
Blockly.Blocks['farmbot_goto_water_source'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_goto_water_source',
      message0: '%{BKY_BLOCK_GOTO_WATER_SOURCE}',
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Su kaynağı konumuna gider',
    });
  },
};

// 5. Izgara Tarama
Blockly.Blocks['farmbot_grid_scan'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_grid_scan',
      message0: '%{BKY_BLOCK_GRID_SCAN}',
      args0: [{ type: 'input_value', name: 'SPACING', check: 'Number' }],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Bahçeyi ızgara halinde tarar ve her noktada içindeki blokları çalıştırır',
    });
  },
};

// 6. Park Pozisyonu
Blockly.Blocks['farmbot_park'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_park',
      message0: '%{BKY_BLOCK_PARK}',
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'FarmBot\'u güvenli park konumuna götürür',
    });
  },
};

// 7. Kalibrasyon Çalıştır
Blockly.Blocks['farmbot_calibrate'] = {
  init() {
    const axis = [
      ['%{BKY_AXIS_ALL}', 'ALL'],
      ['X', 'X'],
      ['Y', 'Y'],
      ['Z', 'Z'],
    ];
    this.jsonInit({
      type: 'farmbot_calibrate',
      message0: '%{BKY_BLOCK_CALIBRATE}',
      args0: [{ type: 'field_dropdown', name: 'AXIS', options: axis }],
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Seçilen ekseni kalibre eder',
    });
  },
};

// 8. Sınır Bul (Find Home)
Blockly.Blocks['farmbot_find_home'] = {
  init() {
    const axis = [
      ['%{BKY_AXIS_ALL}', 'ALL'],
      ['X', 'X'],
      ['Y', 'Y'],
      ['Z', 'Z'],
    ];
    this.jsonInit({
      type: 'farmbot_find_home',
      message0: '%{BKY_BLOCK_FIND_HOME}',
      args0: [{ type: 'field_dropdown', name: 'AXIS', options: axis }],
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Seçilen eksenin sınır anahtarlarını kullanarak başlangıç konumunu bulur',
    });
  },
};
