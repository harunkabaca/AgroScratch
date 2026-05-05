import * as Blockly from 'blockly';

/* ── SEKANSLAR & OTOMASYON BLOKLARI (İndigo) ─────────── */

// 1. Sekans Çalıştır
Blockly.Blocks['farmbot_run_sequence'] = {
  init() {
    const seqs = [
      ['%{BKY_SEQ_WATER_ALL}', 'WATER_ALL'],
      ['%{BKY_SEQ_SEED_ALL}', 'SEED_ALL'],
      ['%{BKY_SEQ_WEED_ALL}', 'WEED_ALL'],
      ['%{BKY_SEQ_PHOTO_ALL}', 'PHOTO_ALL'],
      ['%{BKY_SEQ_SOIL_TEST}', 'SOIL_TEST'],
    ];
    this.jsonInit({
      type: 'farmbot_run_sequence',
      message0: '%{BKY_BLOCK_RUN_SEQUENCE}',
      args0: [{ type: 'field_dropdown', name: 'SEQUENCE', options: seqs }],
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Önceden tanımlı bir sekansı çalıştırır',
    });
  },
};

// 2. Zamanlı Görev
Blockly.Blocks['farmbot_schedule'] = {
  init() {
    const intervals = [
      ['%{BKY_INTERVAL_HOURLY}', 'HOURLY'],
      ['%{BKY_INTERVAL_DAILY}', 'DAILY'],
      ['%{BKY_INTERVAL_WEEKLY}', 'WEEKLY'],
    ];
    this.jsonInit({
      type: 'farmbot_schedule',
      message0: '%{BKY_BLOCK_SCHEDULE}',
      args0: [{ type: 'field_dropdown', name: 'INTERVAL', options: intervals }],
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Belirtilen zaman aralığında içindeki blokları çalıştırır',
    });
  },
};

// 3. Tüm Bitkileri Sula
Blockly.Blocks['farmbot_water_all_plants'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water_all_plants',
      message0: '%{BKY_BLOCK_WATER_ALL_PLANTS}',
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Bahçedeki tüm bitkilere sırayla gidip sular',
    });
  },
};

// 4. Her Bitki İçin
Blockly.Blocks['farmbot_for_each_plant'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_for_each_plant',
      message0: '%{BKY_BLOCK_FOR_EACH_PLANT}',
      message1: '  %1',
      args1: [{ type: 'input_statement', name: 'DO' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Bahçedeki her bitkiye sırayla gidip içindeki blokları çalıştırır',
    });
  },
};

// 5. Rapor Oluştur
Blockly.Blocks['farmbot_generate_report'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_generate_report',
      message0: '%{BKY_BLOCK_GENERATE_REPORT}',
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Bahçenin güncel durumu hakkında bir rapor oluşturur',
    });
  },
};

// 6. Bildirim Gönder
Blockly.Blocks['farmbot_send_notification'] = {
  init() {
    const channels = [
      ['%{BKY_NOTIFY_LOG}', 'LOG'],
      ['%{BKY_NOTIFY_EMAIL}', 'EMAIL'],
      ['%{BKY_NOTIFY_TOAST}', 'TOAST'],
    ];
    this.jsonInit({
      type: 'farmbot_send_notification',
      message0: '%{BKY_BLOCK_SEND_NOTIFICATION}',
      args0: [
        { type: 'field_dropdown', name: 'CHANNEL', options: channels },
        { type: 'input_value', name: 'MESSAGE', check: 'String' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#6366f1',
      tooltip: 'Seçilen kanaldan bildirim gönderir',
      inputsInline: true,
    });
  },
};

// 7. Mevcut Zaman
Blockly.Blocks['farmbot_current_time'] = {
  init() {
    const parts = [
      ['%{BKY_TIME_HOUR}', 'HOUR'],
      ['%{BKY_TIME_MINUTE}', 'MINUTE'],
      ['%{BKY_TIME_DAY}', 'DAY'],
      ['%{BKY_TIME_MONTH}', 'MONTH'],
    ];
    this.jsonInit({
      type: 'farmbot_current_time',
      message0: '%{BKY_BLOCK_CURRENT_TIME}',
      args0: [{ type: 'field_dropdown', name: 'PART', options: parts }],
      output: 'Number',
      colour: '#6366f1',
      tooltip: 'Geçerli zaman bilgisini döndürür',
    });
  },
};

// 8. Gün/Gece Kontrolü
Blockly.Blocks['farmbot_is_daytime'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_is_daytime',
      message0: '%{BKY_BLOCK_IS_DAYTIME}',
      output: 'Boolean',
      colour: '#6366f1',
      tooltip: 'Gündüz saatlerinde doğru döndürür',
    });
  },
};
