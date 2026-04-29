import * as Blockly from 'blockly';

/* ── SES (Pembe) ────────────────────────────────────── */

// 1. Ses Çal ve Bekle
Blockly.Blocks['sound_play_until_done'] = {
  init() {
    this.jsonInit({
      type: 'sound_play_until_done',
      message0: '🔊 %1 sesini bitene kadar çal',
      args0: [
        {
          type: 'field_dropdown',
          name: 'SOUND',
          options: [
            ['Bip (Normal)', 'BEEP'],
            ['Uyarı (Hata)', 'ERROR'],
            ['Başarı (Tamamlandı)', 'SUCCESS'],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#d946ef', // Scratch Ses rengi
      tooltip: 'Seçili sesi çalar ve bitene kadar programı bekletir',
    });
  },
};

// 2. Sesi Başlat
Blockly.Blocks['sound_start'] = {
  init() {
    this.jsonInit({
      type: 'sound_start',
      message0: '🔊 %1 sesini başlat',
      args0: [
        {
          type: 'field_dropdown',
          name: 'SOUND',
          options: [
            ['Bip (Normal)', 'BEEP'],
            ['Uyarı (Hata)', 'ERROR'],
            ['Başarı (Tamamlandı)', 'SUCCESS'],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#d946ef',
      tooltip: 'Seçili sesi başlatır ve program beklemeye geçmeden devam eder',
    });
  },
};
