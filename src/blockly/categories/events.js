import * as Blockly from 'blockly';

/* ── OLAYLAR (Sarı) ─────────────────────────────────── */
// Başlangıç bloğu (Yeşil bayrağa tıklandığında)
Blockly.Blocks['event_whenflagclicked'] = {
  init() {
    this.jsonInit({
      type: 'event_whenflagclicked',
      message0: '▶ %1 tıklandığında',
      args0: [
        { type: 'field_image', src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIyYzU1ZSI+PHBhdGggZD0iTTUgM3YxOGgydjEwSDRWM2gxeiIvPjxwYXRoIGQ9Ik03IDNsMTQgNi0xNCA2eiIvPjwvc3ZnPg==', width: 20, height: 20, alt: 'Başlat' }
      ],
      nextStatement: null,
      colour: '#f59e0b', // Scratch Olaylar rengi (Sarımtırak Turuncu)
      tooltip: 'Program bu bloğun altından başlar',
    });
  },
};
