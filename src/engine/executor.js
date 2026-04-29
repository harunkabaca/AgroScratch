/**
 * AgroScratch — Sıralı Çalıştırma Motoru
 * Blokların sıralı çalıştırılması — her adım Promise tabanlı beklenir.
 */
export class SequentialExecutor {
  constructor(api, onLog, onStepChange) {
    this.api = api;
    this.onLog = onLog || (() => {});
    this.onStepChange = onStepChange || (() => {});
    this._aborted = false;
  }

  /**
   * Üretilen kodu sıralı çalıştırır.
   * @param {string} codeString — generateCode() çıktısı
   */
  async execute(codeString) {
    this._aborted = false;
    this.onLog({ type: 'info', text: '▶ Program başlatıldı' });

    const self = this;
    const robot = {
      async checkAbort() {
        if (self._aborted) throw new Error('ABORTED');
      },
      async moveTo(x, y, z) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `➡ Hareket ediliyor → mutlak X:${x} Y:${y} Z:${z}` });
        self.onStepChange({ action: 'move', x, y, z });
        await self.api.moveTo(x, y, z);
        self.onLog({ type: 'ok', text: `✓ Hareket tamamlandı (${x}, ${y}, ${z})` });
      },
      async moveRelative(dx, dy, dz) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `➡ Göreceli hareket → ΔX:${dx} ΔY:${dy} ΔZ:${dz}` });
        // Calculate new position using api current state if needed, or api can handle it
        await self.api.moveRelative(dx, dy, dz);
        self.onLog({ type: 'ok', text: `✓ Göreceli hareket tamamlandı` });
      },
      async say(message) {
        if (self._aborted) throw new Error('ABORTED');
        if (message) {
          self.onLog({ type: 'info', text: `💬 Robot diyor ki: "${message}"` });
        }
        self.onStepChange({ action: 'say', message });
      },
      async switchTool(tool) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🔧 Alet değiştiriliyor: ${tool}` });
        self.onStepChange({ action: 'switchTool', tool });
        await self.api.wait(1000); // Simulate tool change delay
        self.onLog({ type: 'ok', text: `✓ Alet başarıyla değiştirildi` });
      },
      async waterOn() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '💧 Sulama açılıyor...' });
        self.onStepChange({ action: 'waterOn' });
        await self.api.waterOn();
        self.onLog({ type: 'ok', text: '✓ Sulama başladı' });
      },
      async waterOff() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🚫 Sulama kapatılıyor...' });
        self.onStepChange({ action: 'waterOff' });
        await self.api.waterOff();
        self.onLog({ type: 'ok', text: '✓ Sulama durduruldu' });
      },
      async wait(ms) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `⏱ ${ms} milisaniye bekleniyor...` });
        self.onStepChange({ action: 'wait', ms });
        await self.api.wait(ms);
        self.onLog({ type: 'ok', text: `✓ Bekleme tamamlandı (${ms}ms)` });
      },
      async isTouchingEdge() {
        if (self._aborted) throw new Error('ABORTED');
        const state = await self.api.getState(); // Let's assume API has a getState, or just use current targetPosition
        // We'll mock it for now based on some bounds (0..3000, 0..1500, -500..0)
        return (state.x <= 0 || state.x >= 3000 || state.y <= 0 || state.y >= 1500 || state.z <= -500 || state.z >= 0);
      },
      async getX() {
        if (self._aborted) throw new Error('ABORTED');
        const state = await self.api.getState();
        return state.x;
      },
      async getY() {
        if (self._aborted) throw new Error('ABORTED');
        const state = await self.api.getState();
        return state.y;
      },
      async getZ() {
        if (self._aborted) throw new Error('ABORTED');
        const state = await self.api.getState();
        return state.z;
      },
      async readSensor(sensorType) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🌡 ${sensorType} sensörü okunuyor...` });
        const val = await self.api.readSensor(sensorType);
        self.onLog({ type: 'ok', text: `✓ Sensör değeri: ${val}` });
        return val;
      },
      async playSound(sound, wait) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'info', text: `🔊 Ses çalınıyor: ${sound}` });
        self.onStepChange({ action: 'playSound', sound });
        if (wait) {
          await self.api.wait(1000); // Simulate sound duration
          self.onLog({ type: 'ok', text: `✓ Ses tamamlandı` });
        }
      },
    };

    try {
      // eslint-disable-next-line no-eval
      const fn = eval(codeString);
      await fn(robot);
      if (!this._aborted) {
        this.onLog({ type: 'done', text: '✅ Program başarıyla tamamlandı!' });
      }
    } catch (err) {
      if (err.message === 'ABORTED') {
        this.onLog({ type: 'warn', text: '⛔ Program kullanıcı tarafından durduruldu' });
      } else {
        this.onLog({ type: 'error', text: `❌ Hata oluştu: ${err.message}` });
      }
    }
  }

  abort() {
    this._aborted = true;
  }
}
