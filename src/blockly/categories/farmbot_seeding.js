import * as Blockly from 'blockly';

/* ── TOHUM EKME BLOKLARI (Yeşil) ─────────────────────── */

// 1. Tohum Ek
Blockly.Blocks['farmbot_plant_seed'] = {
  init() {
    const options = [
      ['%{BKY_SEED_TOMATO}', 'TOMATO'],
      ['%{BKY_SEED_CUCUMBER}', 'CUCUMBER'],
      ['%{BKY_SEED_LETTUCE}', 'LETTUCE'],
      ['%{BKY_SEED_CARROT}', 'CARROT'],
      ['%{BKY_SEED_PEPPER}', 'PEPPER'],
      ['%{BKY_SEED_RADISH}', 'RADISH'],
      ['%{BKY_SEED_SPINACH}', 'SPINACH'],
      ['%{BKY_SEED_BEAN}', 'BEAN'],
      ['%{BKY_SEED_CORN}', 'CORN'],
      ['%{BKY_SEED_STRAWBERRY}', 'STRAWBERRY'],
    ];
    this.jsonInit({
      type: 'farmbot_plant_seed',
      message0: '%{BKY_BLOCK_PLANT_SEED}',
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
      message0: '%{BKY_BLOCK_SET_SEED_DEPTH}',
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
      message0: '%{BKY_BLOCK_PLANT_ROW}',
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
      message0: '%{BKY_BLOCK_PLANT_GRID}',
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
      message0: '%{BKY_BLOCK_PICKUP_SEED}',
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
      message0: '%{BKY_BLOCK_DROP_SEED}',
      previousStatement: null,
      nextStatement: null,
      colour: '#16a34a',
      tooltip: 'Vakumdaki tohumu mevcut konuma bırakır',
    });
  },
};
