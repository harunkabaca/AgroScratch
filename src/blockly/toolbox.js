import { translations } from '../i18n/translations';

export const getToolbox = (lang) => {
  const t = translations[lang] || translations.tr;

  return {
    kind: 'categoryToolbox',
    contents: [
      /* ── FARMBOT SULAMA ────────────────────────────── */
      {
        kind: 'category',
        name: t.catWatering || '💧 Sulama',
        colour: '#2563eb',
        cssConfig: { container: 'scratch-cat-watering' },
        contents: [
          { kind: 'block', type: 'farmbot_water_on' },
          { kind: 'block', type: 'farmbot_water_off' },
          { kind: 'block', type: 'farmbot_water_for', inputs: { SECS: { shadow: { type: 'math_number', fields: { NUM: 5 } } } } },
          { kind: 'block', type: 'farmbot_set_water_flow', inputs: { FLOW: { shadow: { type: 'math_number', fields: { NUM: 50 } } } } },
          { kind: 'block', type: 'farmbot_drip_irrigate', inputs: { AMOUNT: { shadow: { type: 'math_number', fields: { NUM: 100 } } } } },
          { kind: 'block', type: 'farmbot_water_area',
            inputs: {
              X1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              Y1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              X2: { shadow: { type: 'math_number', fields: { NUM: 1000 } } },
              Y2: { shadow: { type: 'math_number', fields: { NUM: 500 } } },
            }
          },
        ],
      },
      /* ── FARMBOT TOHUM EKME ────────────────────────── */
      {
        kind: 'category',
        name: t.catSeeding || '🌱 Tohum Ekme',
        colour: '#16a34a',
        cssConfig: { container: 'scratch-cat-seeding' },
        contents: [
          { kind: 'block', type: 'farmbot_plant_seed' },
          { kind: 'block', type: 'farmbot_set_seed_depth', inputs: { DEPTH: { shadow: { type: 'math_number', fields: { NUM: 30 } } } } },
          { kind: 'block', type: 'farmbot_plant_row',
            inputs: {
              COUNT: { shadow: { type: 'math_number', fields: { NUM: 5 } } },
              SPACING: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
            }
          },
          { kind: 'block', type: 'farmbot_plant_grid',
            inputs: {
              ROWS: { shadow: { type: 'math_number', fields: { NUM: 3 } } },
              COLS: { shadow: { type: 'math_number', fields: { NUM: 4 } } },
              SPACING: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
            }
          },
          { kind: 'block', type: 'farmbot_pickup_seed' },
          { kind: 'block', type: 'farmbot_drop_seed' },
        ],
      },
      /* ── FARMBOT OT ALMA ───────────────────────────── */
      {
        kind: 'category',
        name: t.catWeeding || '🌿 Ot Alma',
        colour: '#dc2626',
        cssConfig: { container: 'scratch-cat-weeding' },
        contents: [
          { kind: 'block', type: 'farmbot_detect_weeds' },
          { kind: 'block', type: 'farmbot_remove_weed' },
          { kind: 'block', type: 'farmbot_scan_weeds',
            inputs: {
              X1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              Y1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              X2: { shadow: { type: 'math_number', fields: { NUM: 3000 } } },
              Y2: { shadow: { type: 'math_number', fields: { NUM: 1500 } } },
            }
          },
          { kind: 'block', type: 'farmbot_clear_all_weeds' },
          { kind: 'block', type: 'farmbot_weed_count' },
        ],
      },
      /* ── FARMBOT TOPRAK & SENSÖRLER ────────────────── */
      {
        kind: 'category',
        name: t.catSoil || '🧪 Toprak & Sensörler',
        colour: '#a16207',
        cssConfig: { container: 'scratch-cat-soil' },
        contents: [
          { kind: 'block', type: 'farmbot_soil_analysis' },
          { kind: 'block', type: 'farmbot_read_moisture' },
          { kind: 'block', type: 'farmbot_read_soil_temp' },
          { kind: 'block', type: 'farmbot_read_ph' },
          { kind: 'block', type: 'farmbot_read_air_temp' },
          { kind: 'block', type: 'farmbot_read_humidity' },
          { kind: 'block', type: 'farmbot_read_light' },
          { kind: 'block', type: 'farmbot_is_soil_wet' },
        ],
      },
      /* ── FARMBOT KAMERA ────────────────────────────── */
      {
        kind: 'category',
        name: t.catCamera || '📸 Kamera',
        colour: '#7c3aed',
        cssConfig: { container: 'scratch-cat-camera' },
        contents: [
          { kind: 'block', type: 'farmbot_take_photo' },
          { kind: 'block', type: 'farmbot_detect_plants' },
          { kind: 'block', type: 'farmbot_check_plant_health' },
          { kind: 'block', type: 'farmbot_measure_height' },
          { kind: 'block', type: 'farmbot_scan_garden' },
          { kind: 'block', type: 'farmbot_plant_count' },
        ],
      },
      /* ── FARMBOT ARAÇLAR ───────────────────────────── */
      {
        kind: 'category',
        name: t.catTools || '🔧 Araçlar & Donanım',
        colour: '#64748b',
        cssConfig: { container: 'scratch-cat-tools' },
        contents: [
          { kind: 'block', type: 'farmbot_mount_tool' },
          { kind: 'block', type: 'farmbot_dismount_tool' },
          { kind: 'block', type: 'farmbot_calibrate_tool' },
          { kind: 'block', type: 'farmbot_led_on' },
          { kind: 'block', type: 'farmbot_led_off' },
          { kind: 'block', type: 'farmbot_vacuum_on' },
          { kind: 'block', type: 'farmbot_vacuum_off' },
          { kind: 'block', type: 'farmbot_set_speed', inputs: { SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } } } },
          { kind: 'block', type: 'farmbot_write_pin', inputs: { PIN: { shadow: { type: 'math_number', fields: { NUM: 13 } } } } },
          { kind: 'block', type: 'farmbot_read_pin', inputs: { PIN: { shadow: { type: 'math_number', fields: { NUM: 13 } } } } },
          { kind: 'block', type: 'farmbot_emergency_stop' },
        ],
      },
      { kind: 'sep', gap: 24 },
      /* ── GELİŞMİŞ HAREKET ─────────────────────────── */
      {
        kind: 'category',
        name: t.catFarmMovement || '🚜 Gelişmiş Hareket',
        colour: '#0891b2',
        cssConfig: { container: 'scratch-cat-farmmovement' },
        contents: [
          { kind: 'block', type: 'farmbot_goto_plant' },
          { kind: 'block', type: 'farmbot_goto_tool_bay' },
          { kind: 'block', type: 'farmbot_goto_seed_tray' },
          { kind: 'block', type: 'farmbot_goto_water_source' },
          { kind: 'block', type: 'farmbot_park' },
          { kind: 'block', type: 'farmbot_calibrate' },
          { kind: 'block', type: 'farmbot_find_home' },
          { kind: 'block', type: 'farmbot_grid_scan', inputs: { SPACING: { shadow: { type: 'math_number', fields: { NUM: 200 } } } } },
        ],
      },
      /* ── SEKANSLAR & OTOMASYON ──────────────────────── */
      {
        kind: 'category',
        name: t.catSequences || '📋 Sekanslar',
        colour: '#6366f1',
        cssConfig: { container: 'scratch-cat-sequences' },
        contents: [
          { kind: 'block', type: 'farmbot_run_sequence' },
          { kind: 'block', type: 'farmbot_schedule' },
          { kind: 'block', type: 'farmbot_water_all_plants' },
          { kind: 'block', type: 'farmbot_for_each_plant' },
          { kind: 'block', type: 'farmbot_generate_report' },
          { kind: 'block', type: 'farmbot_send_notification', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Merhaba!' } } } } },
          { kind: 'block', type: 'farmbot_current_time' },
          { kind: 'block', type: 'farmbot_is_daytime' },
        ],
      },
      { kind: 'sep', gap: 32 },
      /* ── SCRATCH-TARZI TEMEL KATEGORİLER ──────────── */
      {
        kind: 'category',
        name: t.catMotion,
        colour: '#4c97ff',
        cssConfig: { container: 'scratch-cat-motion' },
        contents: [
          { 
            kind: 'block', 
            type: 'motion_gotoxyz',
            inputs: {
              X: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
              Y: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
              Z: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            }
          },
          { kind: 'block', type: 'motion_gohome' },
          { 
            kind: 'block', 
            type: 'motion_changex',
            inputs: {
              DX: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            }
          },
          { 
            kind: 'block', 
            type: 'motion_changey',
            inputs: {
              DY: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            }
          },
          { 
            kind: 'block', 
            type: 'motion_changez',
            inputs: {
              DZ: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            }
          },
        ],
      },
      {
        kind: 'category',
        name: t.catLooks,
        colour: '#9966ff',
        cssConfig: { container: 'scratch-cat-looks' },
        contents: [
          { kind: 'block', type: 'looks_say' },
          { kind: 'block', type: 'looks_sayforsecs' },
          { kind: 'block', type: 'looks_switchtool' },
        ],
      },
      {
        kind: 'category',
        name: t.catSound,
        colour: '#cf63cf',
        cssConfig: { container: 'scratch-cat-sound' },
        contents: [
          { kind: 'block', type: 'sound_play' },
        ],
      },
      { kind: 'sep', gap: 32 },
      {
        kind: 'category',
        name: t.catEvents,
        colour: '#ffbf00',
        cssConfig: { container: 'scratch-cat-events' },
        contents: [
          { kind: 'block', type: 'event_whenflagclicked' },
        ],
      },
      {
        kind: 'category',
        name: t.catControl,
        colour: '#ffab19',
        cssConfig: { container: 'scratch-cat-control' },
        contents: [
          { 
            kind: 'block', 
            type: 'control_wait',
            inputs: {
              DURATION: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
            }
          },
          { 
            kind: 'block', 
            type: 'control_repeat',
            inputs: {
              TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
            }
          },
          { kind: 'block', type: 'control_forever' },
          { kind: 'block', type: 'control_if' },
          { kind: 'block', type: 'control_if_else' },
        ],
      },
      {
        kind: 'category',
        name: t.catSensing,
        colour: '#4cbfe6',
        cssConfig: { container: 'scratch-cat-sensing' },
        contents: [
          { kind: 'block', type: 'sensing_touchingedge' },
          { kind: 'block', type: 'sensing_xpos' },
          { kind: 'block', type: 'sensing_ypos' },
          { kind: 'block', type: 'sensing_zpos' },
          { kind: 'block', type: 'sensing_sensorvalue' },
        ],
      },
      {
        kind: 'category',
        name: t.catOperators,
        colour: '#59c059',
        cssConfig: { container: 'scratch-cat-operators' },
        contents: [
          { 
            kind: 'block', 
            type: 'operator_add',
            inputs: {
              NUM1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              NUM2: { shadow: { type: 'math_number', fields: { NUM: '' } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_subtract',
            inputs: {
              NUM1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              NUM2: { shadow: { type: 'math_number', fields: { NUM: '' } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_multiply',
            inputs: {
              NUM1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              NUM2: { shadow: { type: 'math_number', fields: { NUM: '' } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_divide',
            inputs: {
              NUM1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              NUM2: { shadow: { type: 'math_number', fields: { NUM: '' } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_random',
            inputs: {
              FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_gt',
            inputs: {
              VAL1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              VAL2: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_lt',
            inputs: {
              VAL1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              VAL2: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
            }
          },
          { 
            kind: 'block', 
            type: 'operator_equals',
            inputs: {
              VAL1: { shadow: { type: 'math_number', fields: { NUM: '' } } },
              VAL2: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
            }
          },
          { kind: 'block', type: 'operator_and' },
          { kind: 'block', type: 'operator_or' },
          { kind: 'block', type: 'operator_not' },
        ],
      },
      {
        kind: 'category',
        name: t.catVariables,
        colour: '#ff8c1a',
        custom: 'VARIABLE',
        cssConfig: { container: 'scratch-cat-variables' },
      },
    ],
  };
};
