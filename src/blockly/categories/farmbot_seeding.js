import * as Blockly from 'blockly';

/* ── TOHUM EKME BLOKLARI (Yeşil) ─────────────────────── */

// 1. Tohum Ek
Blockly.Blocks['farmbot_plant_seed'] = {
  init() {
    const options = [
      [Blockly.Msg['SEED_TOMATO'] || '🍅 Domates', 'TOMATO'],
      [Blockly.Msg['SEED_CUCUMBER'] || '🥒 Salatalık', 'CUCUMBER'],
      [Blockly.Msg['SEED_LETTUCE'] || '🥬 Marul', 'LETTUCE'],
      [Blockly.Msg['SEED_CARROT'] || '🥕 Havuç', 'CARROT'],
      [Blockly.Msg['SEED_PEPPER'] || '🌶 Biber', 'PEPPER'],
      [Blockly.Msg['SEED_RADISH'] || '🌱 Turp', 'RADISH'],
      [Blockly.Msg['SEED_SPINACH'] || '🥬 Ispanak', 'SPINACH'],
      [Blockly.Msg['SEED_BEAN'] || '🫘 Fasulye', 'BEAN'],
      [Blockly.Msg['SEED_CORN'] || '🌽 Mısır', 'CORN'],
      [Blockly.Msg['SEED_STRAWBERRY'] || '🍓 Çilek', 'STRAWBERRY'],
    ];
    this.jsonInit({
      type: 'farmbot_plant_seed',
      message0: Blockly.Msg['BLOCK_PLANT_SEED'] || '🌱 %1 tohumu ek',
      args0: [{ type: 'field_dropdown', name: 'SEED', options }],
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Mevcut konuma seçili tohumu eker',
    });
  },
};

// 2. Tohum Derinliği
Blockly.Blocks['farmbot_set_seed_depth'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_set_seed_depth',
      message0: Blockly.Msg['BLOCK_SEED_DEPTH'] || '🌱 ekim derinliğini %1 mm yap',
      args0: [{ type: 'input_value', name: 'DEPTH', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Tohum ekim derinliğini ayarlar',
    });
  },
};

// 3. Satır Halinde Ek
Blockly.Blocks['farmbot_plant_row'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_plant_row',
      message0: Blockly.Msg['BLOCK_PLANT_ROW'] || '🌿 sıra halinde ek: %1 tohum, aralık %2 mm',
      args0: [
        { type: 'input_value', name: 'COUNT', check: 'Number' },
        { type: 'input_value', name: 'SPACING', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Mevcut konumdan başlayarak sıra halinde tohum eker',
      inputsInline: true,
    });
  },
};

// 4. Izgara Ekim
Blockly.Blocks['farmbot_plant_grid'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_plant_grid',
      message0: Blockly.Msg['BLOCK_PLANT_GRID'] || '🌾 ızgara ekim: %1 × %2 aralık %3 mm',
      args0: [
        { type: 'input_value', name: 'ROWS', check: 'Number' },
        { type: 'input_value', name: 'COLS', check: 'Number' },
        { type: 'input_value', name: 'SPACING', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Mevcut konumdan başlayarak ızgara desende ekim yapar',
      inputsInline: true,
    });
  },
};

// 5. Tohum Al (vakum ile)
Blockly.Blocks['farmbot_pickup_seed'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_pickup_seed',
      message0: Blockly.Msg['BLOCK_PICKUP_SEED'] || '🔽 vakumla tohum al',
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Vakum ile tohum tepsisinden bir tohum alır',
    });
  },
};

// 6. Tohum Bırak
Blockly.Blocks['farmbot_drop_seed'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_drop_seed',
      message0: Blockly.Msg['BLOCK_DROP_SEED'] || '🔼 tohumu toprağa bırak',
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Vakumdaki tohumu mevcut konuma bırakır',
    });
  },
};
