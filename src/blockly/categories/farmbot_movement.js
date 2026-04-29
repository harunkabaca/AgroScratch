import * as Blockly from 'blockly';

/* ── GELİŞMİŞ HAREKET BLOKLARI (Cyan/Teal) ──────────── */

// 1. Bitkiye Git (isimle)
Blockly.Blocks['farmbot_goto_plant'] = {
  init() {
    const options = [
      [Blockly.Msg['SEED_TOMATO'] || '🍅 Domates', 'TOMATO'],
      [Blockly.Msg['SEED_CUCUMBER'] || '🥒 Salatalık', 'CUCUMBER'],
      [Blockly.Msg['SEED_LETTUCE'] || '🥬 Marul', 'LETTUCE'],
      [Blockly.Msg['SEED_CARROT'] || '🥕 Havuç', 'CARROT'],
      [Blockly.Msg['SEED_PEPPER'] || '🌶 Biber', 'PEPPER'],
    ];
    this.jsonInit({
      type: 'farmbot_goto_plant',
      message0: Blockly.Msg['BLOCK_GOTO_PLANT'] || '🌱 %1 bitkisine git',
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
      message0: Blockly.Msg['BLOCK_GOTO_TOOL_BAY'] || '🔧 alet yuvasına git',
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
      message0: Blockly.Msg['BLOCK_GOTO_SEED_TRAY'] || '🌱 tohum tepsisine git',
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
      message0: Blockly.Msg['BLOCK_GOTO_WATER'] || '💧 su kaynağına git',
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
      message0: Blockly.Msg['BLOCK_GRID_SCAN'] || '🔲 ızgara tarama: aralık %1 mm',
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
      message0: Blockly.Msg['BLOCK_PARK'] || '🅿️ park pozisyonuna git',
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
      [Blockly.Msg['AXIS_ALL'] || 'Tüm Eksenler', 'ALL'],
      ['X', 'X'],
      ['Y', 'Y'],
      ['Z', 'Z'],
    ];
    this.jsonInit({
      type: 'farmbot_calibrate',
      message0: Blockly.Msg['BLOCK_CALIBRATE'] || '🎯 %1 kalibre et',
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
      [Blockly.Msg['AXIS_ALL'] || 'Tüm Eksenler', 'ALL'],
      ['X', 'X'],
      ['Y', 'Y'],
      ['Z', 'Z'],
    ];
    this.jsonInit({
      type: 'farmbot_find_home',
      message0: Blockly.Msg['BLOCK_FIND_HOME'] || '🏠 %1 başlangıcı bul',
      args0: [{ type: 'field_dropdown', name: 'AXIS', options: axis }],
      previousStatement: null,
      nextStatement: null,
      colour: '#0891b2',
      tooltip: 'Seçilen eksenin sınır anahtarlarını kullanarak başlangıç konumunu bulur',
    });
  },
};
