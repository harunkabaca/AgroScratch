import { translations } from '../i18n/translations';

export const getToolbox = (lang) => {
  const t = translations[lang] || translations.tr;

  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: t.catMotion,
        colour: '#4c97ff',
        cssConfig: { container: 'scratch-cat-motion' },
        contents: [
          { kind: 'block', type: 'motion_gotoxyz' },
          { kind: 'block', type: 'motion_gohome' },
          { kind: 'block', type: 'motion_changex' },
          { kind: 'block', type: 'motion_changey' },
          { kind: 'block', type: 'motion_changez' },
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
          { kind: 'block', type: 'control_wait' },
          { kind: 'block', type: 'control_repeat' },
          { kind: 'block', type: 'control_forever' },
          { kind: 'block', type: 'control_if' },
          { kind: 'block', type: 'control_ifelse' },
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
          { kind: 'block', type: 'operator_add' },
          { kind: 'block', type: 'operator_subtract' },
          { kind: 'block', type: 'operator_multiply' },
          { kind: 'block', type: 'operator_divide' },
          { kind: 'block', type: 'operator_random' },
          { kind: 'block', type: 'operator_gt' },
          { kind: 'block', type: 'operator_lt' },
          { kind: 'block', type: 'operator_equals' },
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
