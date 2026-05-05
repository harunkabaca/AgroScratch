import * as Blockly from 'blockly';

/* ── OT ALMA BLOKLARI (Kırmızı/Turuncu) ─────────────── */

// 1. Ot Tespit Et
Blockly.Blocks['farmbot_detect_weeds'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_detect_weeds',
      message0: '%{BKY_BLOCK_DETECT_WEEDS}',
      previousStatement: null,
      nextStatement: null,
      colour: '#dc2626',
      tooltip: 'Kamera ile mevcut konumda ot tespiti yapar',
    });
  },
};

// 2. Ot Al
Blockly.Blocks['farmbot_remove_weed'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_remove_weed',
      message0: '%{BKY_BLOCK_REMOVE_WEED}',
      previousStatement: null,
      nextStatement: null,
      colour: '#dc2626',
      tooltip: 'Mevcut konumdaki otu mekanik olarak söker',
    });
  },
};

// 3. Bölge Ot Tarama
Blockly.Blocks['farmbot_scan_weeds'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_scan_weeds',
      message0: '%{BKY_BLOCK_SCAN_WEEDS}',
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#dc2626',
      tooltip: 'Belirtilen alanda ot taraması yapar',
      inputsInline: true,
    });
  },
};

// 4. Otları Temizle (tespit edilen tüm otlar)
Blockly.Blocks['farmbot_clear_all_weeds'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_clear_all_weeds',
      message0: '%{BKY_BLOCK_CLEAR_ALL_WEEDS}',
      previousStatement: null,
      nextStatement: null,
      colour: '#dc2626',
      tooltip: 'Önceden tespit edilen tüm otları sırayla söker',
    });
  },
};

// 5. Ot Sayısı (value block)
Blockly.Blocks['farmbot_weed_count'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_weed_count',
      message0: '%{BKY_BLOCK_WEED_COUNT}',
      output: 'Number',
      colour: '#dc2626',
      tooltip: 'Son taramada tespit edilen ot sayısını döndürür',
    });
  },
};
