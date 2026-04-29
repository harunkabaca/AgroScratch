/**
 * AgroScratch — Sıralı Çalıştırma Motoru
 * Blokların sıralı çalıştırılması — her adım Promise tabanlı beklenir.
 * FarmBot komutlarının tam simülasyonu.
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

    // ── Mock state ────────────────────────────────
    let _waterFlow = 50;
    let _seedDepth = 30;
    let _speed = 100;
    let _weedCount = 0;
    let _plantCount = 0;
    const _plants = [
      { x: 200, y: 200, type: 'TOMATO' },
      { x: 600, y: 200, type: 'CUCUMBER' },
      { x: 1000, y: 400, type: 'LETTUCE' },
      { x: 400, y: 600, type: 'PEPPER' },
      { x: 800, y: 800, type: 'CARROT' },
    ];

    const robot = {
      // ── Temel ────────────────────────────────────
      async checkAbort() {
        if (self._aborted) throw new Error('ABORTED');
      },
      async moveTo(x, y, z) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `➡ Hareket → X:${x} Y:${y} Z:${z}` });
        self.onStepChange({ action: 'move', x, y, z });
        await self.api.moveTo(x, y, z);
        self.onLog({ type: 'ok', text: `✓ Hareket tamamlandı (${x}, ${y}, ${z})` });
      },
      async moveRelative(dx, dy, dz) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `➡ Göreceli hareket → ΔX:${dx} ΔY:${dy} ΔZ:${dz}` });
        await self.api.moveRelative(dx, dy, dz);
        self.onLog({ type: 'ok', text: `✓ Göreceli hareket tamamlandı` });
      },
      async say(message) {
        if (self._aborted) throw new Error('ABORTED');
        if (message) {
          self.onLog({ type: 'info', text: `💬 Robot: "${message}"` });
        }
        self.onStepChange({ action: 'say', message });
      },
      async switchTool(tool) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🔧 Alet değiştiriliyor: ${tool}` });
        self.onStepChange({ action: 'switchTool', tool });
        await self.api.wait(1000);
        self.onLog({ type: 'ok', text: `✓ Alet değiştirildi` });
      },
      async wait(ms) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `⏱ ${ms}ms bekleniyor...` });
        self.onStepChange({ action: 'wait', ms });
        await self.api.wait(ms);
        self.onLog({ type: 'ok', text: `✓ Bekleme tamamlandı (${ms}ms)` });
      },

      // ── Sulama ───────────────────────────────────
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
      async setWaterFlow(flow) {
        if (self._aborted) throw new Error('ABORTED');
        _waterFlow = flow;
        self.onLog({ type: 'cmd', text: `💧 Su akış hızı → ${flow} mL/s` });
        await self.api.wait(300);
        self.onLog({ type: 'ok', text: `✓ Akış hızı ayarlandı: ${flow} mL/s` });
      },
      async dripIrrigate(amount) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🌧 Damlatma sulama → ${amount} mL` });
        self.onStepChange({ action: 'waterOn' });
        await self.api.waterOn();
        await self.api.wait(Math.round(amount / _waterFlow * 1000));
        await self.api.waterOff();
        self.onStepChange({ action: 'waterOff' });
        self.onLog({ type: 'ok', text: `✓ ${amount} mL damlatma sulama tamamlandı` });
      },
      async waterArea(x1, y1, x2, y2) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `💦 Alan sulama → (${x1},${y1}) - (${x2},${y2})` });
        const step = 200;
        for (let x = x1; x <= x2; x += step) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.moveTo(x, y1, 0);
          self.onStepChange({ action: 'waterOn' });
          await self.api.waterOn();
          await self.api.moveTo(x, y2, 0);
          await self.api.waterOff();
          self.onStepChange({ action: 'waterOff' });
        }
        self.onLog({ type: 'ok', text: '✓ Alan sulama tamamlandı' });
      },

      // ── Tohum Ekme ──────────────────────────────
      async plantSeed(seedType) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🌱 Tohum ekiliyor: ${seedType}` });
        self.onStepChange({ action: 'plantSeed', seedType });
        await self.api.wait(1500);
        _plantCount++;
        self.onLog({ type: 'ok', text: `✓ ${seedType} tohumu ekildi` });
      },
      async setSeedDepth(depth) {
        if (self._aborted) throw new Error('ABORTED');
        _seedDepth = depth;
        self.onLog({ type: 'cmd', text: `🌱 Ekim derinliği → ${depth}mm` });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: `✓ Derinlik ayarlandı: ${depth}mm` });
      },
      async plantRow(count, spacing) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🌿 Sıra ekim: ${count} tohum, ${spacing}mm aralık` });
        const state = await self.api.getState();
        for (let i = 0; i < count; i++) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.moveTo(state.x + i * spacing, state.y, -_seedDepth);
          self.onStepChange({ action: 'plantSeed', seedType: 'DEFAULT' });
          await self.api.wait(500);
          await self.api.moveTo(state.x + i * spacing, state.y, 0);
          _plantCount++;
        }
        self.onLog({ type: 'ok', text: `✓ ${count} tohum sıra halinde ekildi` });
      },
      async plantGrid(rows, cols, spacing) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🌾 Izgara ekim: ${rows}×${cols}, ${spacing}mm` });
        const state = await self.api.getState();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (self._aborted) throw new Error('ABORTED');
            await self.api.moveTo(state.x + c * spacing, state.y + r * spacing, -_seedDepth);
            self.onStepChange({ action: 'plantSeed', seedType: 'DEFAULT' });
            await self.api.wait(400);
            await self.api.moveTo(state.x + c * spacing, state.y + r * spacing, 0);
            _plantCount++;
          }
        }
        self.onLog({ type: 'ok', text: `✓ ${rows * cols} tohum ızgara halinde ekildi` });
      },
      async pickupSeed() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔽 Vakumla tohum alınıyor...' });
        self.onStepChange({ action: 'vacuumOn' });
        await self.api.wait(800);
        self.onLog({ type: 'ok', text: '✓ Tohum vakumla alındı' });
      },
      async dropSeed() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔼 Tohum bırakılıyor...' });
        self.onStepChange({ action: 'vacuumOff' });
        await self.api.wait(500);
        _plantCount++;
        self.onLog({ type: 'ok', text: '✓ Tohum toprağa bırakıldı' });
      },

      // ── Ot Alma ─────────────────────────────────
      async detectWeeds() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔍 Ot tespiti yapılıyor...' });
        await self.api.wait(1200);
        _weedCount = Math.floor(Math.random() * 5) + 1;
        self.onLog({ type: 'ok', text: `✓ ${_weedCount} ot tespit edildi` });
      },
      async removeWeed() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🌿 Ot söküllüyor...' });
        self.onStepChange({ action: 'removeWeed' });
        await self.api.wait(1500);
        if (_weedCount > 0) _weedCount--;
        self.onLog({ type: 'ok', text: '✓ Ot söküldü' });
      },
      async scanWeeds(x1, y1, x2, y2) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🔎 Ot taraması → (${x1},${y1}) - (${x2},${y2})` });
        const step = 300;
        for (let x = x1; x <= x2; x += step) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.moveTo(x, (y1 + y2) / 2, 0);
          await self.api.wait(200);
        }
        _weedCount = Math.floor(Math.random() * 8) + 2;
        self.onLog({ type: 'ok', text: `✓ Tarama tamamlandı: ${_weedCount} ot bulundu` });
      },
      async clearAllWeeds() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🧹 ${_weedCount} ot temizleniyor...` });
        for (let i = _weedCount; i > 0; i--) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.wait(800);
          self.onLog({ type: 'info', text: `  🌿 Ot ${_weedCount - i + 1}/${_weedCount} söküldü` });
        }
        _weedCount = 0;
        self.onLog({ type: 'ok', text: '✓ Tüm otlar temizlendi' });
      },
      async getWeedCount() {
        return _weedCount;
      },

      // ── Sensörler ───────────────────────────────
      async readSensor(sensorType) {
        if (self._aborted) throw new Error('ABORTED');
        const ranges = {
          SOIL_MOISTURE: [15, 85],
          SOIL_TEMP: [12, 32],
          SOIL_PH: [4.5, 8.5],
          AIR_TEMP: [5, 40],
          AIR_HUMIDITY: [20, 90],
          LIGHT: [100, 90000],
        };
        const [min, max] = ranges[sensorType] || [10, 50];
        const val = sensorType === 'SOIL_PH'
          ? Math.round((Math.random() * (max - min) + min) * 10) / 10
          : Math.floor(Math.random() * (max - min) + min);
        self.onLog({ type: 'cmd', text: `🌡 ${sensorType} okunuyor...` });
        await self.api.wait(400);
        self.onLog({ type: 'ok', text: `✓ ${sensorType} = ${val}` });
        return val;
      },
      async soilAnalysis() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🧪 Toprak analizi yapılıyor...' });
        await self.api.wait(2000);
        const moisture = Math.floor(Math.random() * 70 + 15);
        const temp = Math.floor(Math.random() * 20 + 12);
        const ph = Math.round((Math.random() * 4 + 4.5) * 10) / 10;
        self.onLog({ type: 'ok', text: `✓ Analiz tamamlandı — Nem: ${moisture}%, Sıcaklık: ${temp}°C, pH: ${ph}` });
      },

      // ── Konum Okuma ─────────────────────────────
      async isTouchingEdge() {
        if (self._aborted) throw new Error('ABORTED');
        const state = await self.api.getState();
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

      // ── Araçlar & Donanım ──────────────────────
      async mountTool(tool) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🔧 ${tool} aleti takılıyor...` });
        self.onStepChange({ action: 'mountTool', tool });
        await self.api.wait(1500);
        self.onLog({ type: 'ok', text: `✓ ${tool} aleti takıldı` });
      },
      async dismountTool() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔧 Alet çıkarılıyor...' });
        self.onStepChange({ action: 'dismountTool' });
        await self.api.wait(1500);
        self.onLog({ type: 'ok', text: '✓ Alet yerine konuldu' });
      },
      async calibrateTool() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🎯 Alet kalibre ediliyor...' });
        await self.api.wait(2000);
        self.onLog({ type: 'ok', text: '✓ Kalibrasyon tamamlandı' });
      },
      async ledOn(color) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `💡 ${color} LED açılıyor...` });
        self.onStepChange({ action: 'ledOn', color });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: `✓ ${color} LED açık` });
      },
      async ledOff() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '💡 LED kapatılıyor...' });
        self.onStepChange({ action: 'ledOff' });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: '✓ LED kapalı' });
      },
      async vacuumOn() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔽 Vakum açılıyor...' });
        self.onStepChange({ action: 'vacuumOn' });
        await self.api.wait(300);
        self.onLog({ type: 'ok', text: '✓ Vakum çalışıyor' });
      },
      async vacuumOff() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🔼 Vakum kapatılıyor...' });
        self.onStepChange({ action: 'vacuumOff' });
        await self.api.wait(300);
        self.onLog({ type: 'ok', text: '✓ Vakum durduruldu' });
      },
      async setSpeed(speed) {
        if (self._aborted) throw new Error('ABORTED');
        _speed = Math.max(1, Math.min(100, speed));
        self.onLog({ type: 'cmd', text: `⚡ Motor hızı → ${_speed}%` });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: `✓ Hız ayarlandı: ${_speed}%` });
      },
      async emergencyStop() {
        self.onLog({ type: 'warn', text: '🛑 ACİL DURDURMA!' });
        self._aborted = true;
        self.onStepChange({ action: 'emergencyStop' });
        throw new Error('ABORTED');
      },
      async writePin(pin, value) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🔌 Pin ${pin} → ${value === 1 ? 'AÇIK' : 'KAPALI'}` });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: `✓ Pin ${pin} = ${value}` });
      },
      async readPin(pin) {
        if (self._aborted) throw new Error('ABORTED');
        const val = Math.round(Math.random());
        self.onLog({ type: 'cmd', text: `🔌 Pin ${pin} okunuyor...` });
        await self.api.wait(200);
        self.onLog({ type: 'ok', text: `✓ Pin ${pin} = ${val}` });
        return val;
      },

      // ── Kamera ──────────────────────────────────
      async takePhoto() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '📸 Fotoğraf çekiliyor...' });
        self.onStepChange({ action: 'takePhoto' });
        await self.api.wait(1000);
        self.onLog({ type: 'ok', text: '✓ Fotoğraf kaydedildi' });
      },
      async detectPlants() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🌱 Bitkiler tespit ediliyor...' });
        await self.api.wait(1500);
        _plantCount = _plants.length;
        self.onLog({ type: 'ok', text: `✓ ${_plantCount} bitki tespit edildi` });
      },
      async checkPlantHealth() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🏥 Bitki sağlığı kontrol ediliyor...' });
        await self.api.wait(1200);
        const health = Math.floor(Math.random() * 40 + 60);
        self.onLog({ type: 'ok', text: `✓ Bitki sağlığı: ${health}%` });
        return health;
      },
      async measureHeight() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '📏 Bitki boyu ölçülüyor...' });
        await self.api.wait(800);
        const height = Math.floor(Math.random() * 300 + 20);
        self.onLog({ type: 'ok', text: `✓ Bitki boyu: ${height}mm` });
        return height;
      },
      async scanGarden() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '🗺 Bahçe taranıyor...' });
        // Simulate scanning across garden
        for (let x = 0; x <= 2400; x += 600) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.moveTo(x, 750, 0);
          await self.api.wait(300);
        }
        self.onLog({ type: 'ok', text: '✓ Bahçe taraması tamamlandı — harita güncellendi' });
      },
      async getPlantCount() {
        return _plants.length;
      },

      // ── Gelişmiş Hareket ────────────────────────
      async gotoPlant(plantType) {
        if (self._aborted) throw new Error('ABORTED');
        const plant = _plants.find(p => p.type === plantType) || { x: 500, y: 500 };
        self.onLog({ type: 'cmd', text: `🌱 ${plantType} bitkisine gidiliyor...` });
        await self.api.moveTo(plant.x, plant.y, 0);
        self.onLog({ type: 'ok', text: `✓ ${plantType} konumuna ulaşıldı (${plant.x}, ${plant.y})` });
      },
      async calibrate(axis) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🎯 ${axis} ekseni kalibre ediliyor...` });
        await self.api.wait(3000);
        self.onLog({ type: 'ok', text: `✓ ${axis} kalibrasyonu tamamlandı` });
      },
      async findHome(axis) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `🏠 ${axis} başlangıcı aranıyor...` });
        await self.api.moveTo(0, 0, 0);
        await self.api.wait(1000);
        self.onLog({ type: 'ok', text: `✓ ${axis} başlangıç konumu bulundu` });
      },

      // ── Sekanslar & Otomasyon ───────────────────
      async runSequence(seqName) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `▶ ${seqName} sekansı çalıştırılıyor...` });
        await self.api.wait(2000);
        self.onLog({ type: 'ok', text: `✓ ${seqName} sekansı tamamlandı` });
      },
      async waterAllPlants() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: `💦 ${_plants.length} bitki sulanıyor...` });
        for (const plant of _plants) {
          if (self._aborted) throw new Error('ABORTED');
          await self.api.moveTo(plant.x, plant.y, 0);
          self.onStepChange({ action: 'waterOn' });
          await self.api.waterOn();
          await self.api.wait(800);
          await self.api.waterOff();
          self.onStepChange({ action: 'waterOff' });
        }
        self.onLog({ type: 'ok', text: '✓ Tüm bitkiler sulandı' });
      },
      async getAllPlants() {
        return _plants;
      },
      async generateReport() {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'cmd', text: '📊 Rapor oluşturuluyor...' });
        await self.api.wait(1500);
        self.onLog({ type: 'ok', text: `✓ Rapor: ${_plants.length} bitki, ${_weedCount} ot, hız ${_speed}%` });
      },
      async sendNotification(channel, message) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'info', text: `📢 [${channel}] ${message}` });
        await self.api.wait(300);
      },

      // ── Ses ─────────────────────────────────────
      async playSound(sound, wait) {
        if (self._aborted) throw new Error('ABORTED');
        self.onLog({ type: 'info', text: `🔊 Ses: ${sound}` });
        self.onStepChange({ action: 'playSound', sound });
        if (wait) {
          await self.api.wait(1000);
          self.onLog({ type: 'ok', text: '✓ Ses tamamlandı' });
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
        this.onLog({ type: 'warn', text: '⛔ Program durduruldu' });
      } else {
        this.onLog({ type: 'error', text: `❌ Hata: ${err.message}` });
      }
    }
  }

  abort() {
    this._aborted = true;
  }
}
