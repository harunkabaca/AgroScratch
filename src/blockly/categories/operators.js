import * as Blockly from 'blockly';

/* ── OPERATÖRLER (Yeşil) ────────────────────────────── */

// 1. Toplama
Blockly.Blocks['operator_add'] = {
  init() {
    this.jsonInit({
      type: 'operator_add',
      message0: '%1 + %2',
      args0: [
        { type: 'input_value', name: 'NUM1', check: 'Number' },
        { type: 'input_value', name: 'NUM2', check: 'Number' },
      ],
      output: 'Number',
      colour: '#22c55e',
      tooltip: 'İki sayıyı toplar',
      inputsInline: true,
    });
  },
};

// 2. Çıkarma
Blockly.Blocks['operator_subtract'] = {
  init() {
    this.jsonInit({
      type: 'operator_subtract',
      message0: '%1 - %2',
      args0: [
        { type: 'input_value', name: 'NUM1', check: 'Number' },
        { type: 'input_value', name: 'NUM2', check: 'Number' },
      ],
      output: 'Number',
      colour: '#22c55e',
      tooltip: 'İlk sayıdan ikinciyi çıkarır',
      inputsInline: true,
    });
  },
};

// 3. Çarpma
Blockly.Blocks['operator_multiply'] = {
  init() {
    this.jsonInit({
      type: 'operator_multiply',
      message0: '%1 × %2',
      args0: [
        { type: 'input_value', name: 'NUM1', check: 'Number' },
        { type: 'input_value', name: 'NUM2', check: 'Number' },
      ],
      output: 'Number',
      colour: '#22c55e',
      tooltip: 'İki sayıyı çarpar',
      inputsInline: true,
    });
  },
};

// 4. Bölme
Blockly.Blocks['operator_divide'] = {
  init() {
    this.jsonInit({
      type: 'operator_divide',
      message0: '%1 / %2',
      args0: [
        { type: 'input_value', name: 'NUM1', check: 'Number' },
        { type: 'input_value', name: 'NUM2', check: 'Number' },
      ],
      output: 'Number',
      colour: '#22c55e',
      tooltip: 'İlk sayıyı ikinciye böler',
      inputsInline: true,
    });
  },
};

// 5. Rastgele Sayı
Blockly.Blocks['operator_random'] = {
  init() {
    this.jsonInit({
      type: 'operator_random',
      message0: '%1 ile %2 arasında rastgele sayı',
      args0: [
        { type: 'input_value', name: 'FROM', check: 'Number' },
        { type: 'input_value', name: 'TO', check: 'Number' },
      ],
      output: 'Number',
      colour: '#22c55e',
      tooltip: 'Belirtilen aralıkta rastgele bir tam sayı seçer',
      inputsInline: true,
    });
  },
};

// 6. Büyüktür (>)
Blockly.Blocks['operator_gt'] = {
  init() {
    this.jsonInit({
      type: 'operator_gt',
      message0: '%1 > %2',
      args0: [
        { type: 'input_value', name: 'VAL1' },
        { type: 'input_value', name: 'VAL2' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'İlk değer ikinciden büyükse doğru (true) döner',
      inputsInline: true,
    });
  },
};

// 7. Küçüktür (<)
Blockly.Blocks['operator_lt'] = {
  init() {
    this.jsonInit({
      type: 'operator_lt',
      message0: '%1 < %2',
      args0: [
        { type: 'input_value', name: 'VAL1' },
        { type: 'input_value', name: 'VAL2' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'İlk değer ikinciden küçükse doğru (true) döner',
      inputsInline: true,
    });
  },
};

// 8. Eşittir (=)
Blockly.Blocks['operator_equals'] = {
  init() {
    this.jsonInit({
      type: 'operator_equals',
      message0: '%1 = %2',
      args0: [
        { type: 'input_value', name: 'VAL1' },
        { type: 'input_value', name: 'VAL2' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'İki değer eşitse doğru (true) döner',
      inputsInline: true,
    });
  },
};

// 9. Ve (And)
Blockly.Blocks['operator_and'] = {
  init() {
    this.jsonInit({
      type: 'operator_and',
      message0: '%1 ve %2',
      args0: [
        { type: 'input_value', name: 'BOOL1', check: 'Boolean' },
        { type: 'input_value', name: 'BOOL2', check: 'Boolean' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'Her iki koşul da doğruysa doğru (true) döner',
      inputsInline: true,
    });
  },
};

// 10. Veya (Or)
Blockly.Blocks['operator_or'] = {
  init() {
    this.jsonInit({
      type: 'operator_or',
      message0: '%1 veya %2',
      args0: [
        { type: 'input_value', name: 'BOOL1', check: 'Boolean' },
        { type: 'input_value', name: 'BOOL2', check: 'Boolean' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'Koşullardan en az biri doğruysa doğru (true) döner',
      inputsInline: true,
    });
  },
};

// 11. Değil (Not)
Blockly.Blocks['operator_not'] = {
  init() {
    this.jsonInit({
      type: 'operator_not',
      message0: 'değil %1',
      args0: [
        { type: 'input_value', name: 'BOOL', check: 'Boolean' },
      ],
      output: 'Boolean',
      colour: '#22c55e',
      tooltip: 'Koşulu tersine çevirir',
    });
  },
};
