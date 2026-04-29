import * as Blockly from 'blockly';

/* ── SEKANSLAR & OTOMASYON BLOKLARI (İndigo) ─────────── */

// 1. Sekans Çalıştır
Blockly.Blocks['farmbot_run_sequence'] = {
  init() {
    const seqs = [
      [Blockly.Msg['SEQ_WATER_ALL'] || '💧 Hepsini Sula', 'WATER_ALL'],
      [Blockly.Msg['SEQ_SEED_ALL'] || '🌱 Hepsine Tohum Ek', 'SEED_ALL'],
      [Blockly.Msg['SEQ_WEED_ALL'] || '🌿 Hepsini Ot Temizle', 'WEED_ALL'],
      [Blockly.Msg['SEQ_PHOTO_ALL'] || '📸 Hepsini Fotoğrafla', 'PHOTO_ALL'],
      [Blockly.Msg['SEQ_SOIL_TEST'] || '🧪 Toprak Testi', 'SOIL_TEST'],
    ];
    this.jsonInit({
      type: 'farmbot_run_sequence',
      message0: Blockly.Msg['BLOCK_RUN_SEQUENCE'] || '▶ %1 sekansını çalıştır',
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
      [Blockly.Msg['INTERVAL_HOURLY'] || '⏰ Her Saat', 'HOURLY'],
      [Blockly.Msg['INTERVAL_DAILY'] || '📅 Her Gün', 'DAILY'],
      [Blockly.Msg['INTERVAL_WEEKLY'] || '📅 Her Hafta', 'WEEKLY'],
    ];
    this.jsonInit({
      type: 'farmbot_schedule',
      message0: Blockly.Msg['BLOCK_SCHEDULE'] || '📅 %1 çalıştır:',
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
      message0: Blockly.Msg['BLOCK_WATER_ALL_PLANTS'] || '💦 tüm bitkileri sula',
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
      message0: Blockly.Msg['BLOCK_FOR_EACH_PLANT'] || '🌿 her bitki için:',
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
      message0: Blockly.Msg['BLOCK_GENERATE_REPORT'] || '📊 bahçe raporu oluştur',
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
      [Blockly.Msg['NOTIFY_LOG'] || '📋 Konsol', 'LOG'],
      [Blockly.Msg['NOTIFY_EMAIL'] || '📧 E-posta', 'EMAIL'],
      [Blockly.Msg['NOTIFY_TOAST'] || '🔔 Bildirim', 'TOAST'],
    ];
    this.jsonInit({
      type: 'farmbot_send_notification',
      message0: Blockly.Msg['BLOCK_SEND_NOTIFICATION'] || '📢 %1 ile mesaj gönder: %2',
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
      [Blockly.Msg['TIME_HOUR'] || '⏰ Saat', 'HOUR'],
      [Blockly.Msg['TIME_MINUTE'] || '⏰ Dakika', 'MINUTE'],
      [Blockly.Msg['TIME_DAY'] || '📅 Gün', 'DAY'],
      [Blockly.Msg['TIME_MONTH'] || '📅 Ay', 'MONTH'],
    ];
    this.jsonInit({
      type: 'farmbot_current_time',
      message0: Blockly.Msg['BLOCK_CURRENT_TIME'] || '🕐 mevcut %1',
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
      message0: Blockly.Msg['BLOCK_IS_DAYTIME'] || '☀️ gündüz mü?',
      output: 'Boolean',
      colour: '#6366f1',
      tooltip: 'Gündüz saatlerinde doğru döndürür',
    });
  },
};
