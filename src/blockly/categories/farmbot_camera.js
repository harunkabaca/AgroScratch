import * as Blockly from 'blockly';

/* ── KAMERA & FOTOĞRAF BLOKLARI (Mor) ────────────────── */

// 1. Fotoğraf Çek
Blockly.Blocks['farmbot_take_photo'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_take_photo',
      message0: '%{BKY_BLOCK_TAKE_PHOTO}',
      previousStatement: null,
      nextStatement: null,
      colour: '#7c3aed',
      tooltip: 'Mevcut konumda kamera ile fotoğraf çeker',
    });
  },
};

// 2. Bitki Tespiti (fotoğraftan)
Blockly.Blocks['farmbot_detect_plants'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_detect_plants',
      message0: '%{BKY_BLOCK_DETECT_PLANTS}',
      previousStatement: null,
      nextStatement: null,
      colour: '#7c3aed',
      tooltip: 'Kamera görüntüsünden bitkileri tespit eder',
    });
  },
};

// 3. Bitki Sağlığı Kontrolü
Blockly.Blocks['farmbot_check_plant_health'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_check_plant_health',
      message0: '%{BKY_BLOCK_CHECK_PLANT_HEALTH}',
      output: 'Number',
      colour: '#7c3aed',
      tooltip: 'Mevcut konumdaki bitkinin sağlık yüzdesini döndürür (0-100)',
    });
  },
};

// 4. Bitki Boyu Ölç
Blockly.Blocks['farmbot_measure_height'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_measure_height',
      message0: '%{BKY_BLOCK_MEASURE_HEIGHT}',
      output: 'Number',
      colour: '#7c3aed',
      tooltip: 'Mevcut konumdaki bitkinin boyunu ölçer (mm)',
    });
  },
};

// 5. Bahçe Haritası Tara
Blockly.Blocks['farmbot_scan_garden'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_scan_garden',
      message0: '%{BKY_BLOCK_SCAN_GARDEN}',
      previousStatement: null,
      nextStatement: null,
      colour: '#7c3aed',
      tooltip: 'Bahçenin tamamını tarayarak bitki haritası oluşturur',
    });
  },
};

// 6. Bitki Sayısı
Blockly.Blocks['farmbot_plant_count'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_plant_count',
      message0: '%{BKY_BLOCK_PLANT_COUNT}',
      output: 'Number',
      colour: '#7c3aed',
      tooltip: 'Bahçedeki toplam bitki sayısını döndürür',
    });
  },
};
