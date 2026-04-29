/**
 * AgroScratch — Özel Blok Tanımları
 * FarmBot odaklı kapsamlı blok kütüphanesi
 */
import * as Blockly from 'blockly';

// ── Scratch-tarzı temel kategoriler ──
import './categories/events';
import './categories/control';
import './categories/motion';
import './categories/looks';
import './categories/operators';
import './categories/sensing';
import './categories/sound';

// ── FarmBot özel kategoriler ──
import './categories/farmbot_watering';
import './categories/farmbot_seeding';
import './categories/farmbot_weeding';
import './categories/farmbot_soil';
import './categories/farmbot_tools';
import './categories/farmbot_camera';
import './categories/farmbot_movement';
import './categories/farmbot_sequences';

/* ── ESKİ BLOKLAR (geriye uyumluluk) ─────────────────── */

Blockly.Blocks['farmbot_move'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_move',
      message0: '%1  X: %2  Y: %3  Z: %4',
      args0: [
        { type: 'field_image', src: '/icons/arrow-move.svg', width: 28, height: 28, alt: 'Hareket' },
        { type: 'field_number', name: 'X', value: 100, min: 0, max: 3000, precision: 1 },
        { type: 'field_number', name: 'Y', value: 100, min: 0, max: 1500, precision: 1 },
        { type: 'field_number', name: 'Z', value: 0, min: -500, max: 0, precision: 1 },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#f59e0b',
      tooltip: 'Robotu belirtilen X, Y, Z koordinatlarına götürür',
      helpUrl: '',
    });
  },
};

Blockly.Blocks['farmbot_water'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_water',
      message0: '%1  Süre: %2 ms',
      args0: [
        { type: 'field_image', src: '/icons/water-drop.svg', width: 28, height: 28, alt: 'Sulama' },
        { type: 'field_number', name: 'DURATION', value: 2000, min: 100, max: 30000, precision: 100 },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#3b82f6',
      tooltip: 'Sulamayı başlatır, belirtilen süre sonra durdurur',
      helpUrl: '',
    });
  },
};

Blockly.Blocks['farmbot_wait'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_wait',
      message0: '⏱  Bekle: %1 ms',
      args0: [
        { type: 'field_number', name: 'DURATION', value: 1000, min: 100, max: 60000, precision: 100 },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#8b5cf6',
      tooltip: 'Belirtilen süre kadar bekler (milisaniye)',
      helpUrl: '',
    });
  },
};

Blockly.Blocks['farmbot_loop'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_loop',
      message0: '🔁  Tekrarla: %1 kez',
      args0: [
        { type: 'field_number', name: 'TIMES', value: 3, min: 1, max: 100, precision: 1 },
      ],
      message1: '  %1',
      args1: [
        { type: 'input_statement', name: 'DO' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#10b981',
      tooltip: 'İçindeki blokları belirtilen sayıda tekrarlar',
      helpUrl: '',
    });
  },
};

Blockly.Blocks['farmbot_if_sensor'] = {
  init() {
    this.jsonInit({
      type: 'farmbot_if_sensor',
      message0: '🌡  Nem < %1 ise',
      args0: [
        { type: 'field_number', name: 'THRESHOLD', value: 30, min: 0, max: 100, precision: 1 },
      ],
      message1: '  %1',
      args1: [
        { type: 'input_statement', name: 'DO' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#ec4899',
      tooltip: 'Nem sensörü değeri eşikten düşükse içindeki blokları çalıştırır',
      helpUrl: '',
    });
  },
};
