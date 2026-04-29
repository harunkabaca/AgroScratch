import { useRef, useEffect, useState, useCallback } from 'react';
import * as Blockly from 'blockly';
import * as TrLocale from 'blockly/msg/tr';
import * as EnLocale from 'blockly/msg/en';
import * as DeLocale from 'blockly/msg/de';
import '../blockly/blocks.js';
import '../blockly/generator.js';
import { getToolbox } from '../blockly/toolbox.js';
import { translations } from '../i18n/translations';
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';

// Plugin kaydı (HMR uyumlu: CSS enjeksiyonu hatası almamak için try-catch)
try {
  registerContinuousToolbox();
} catch (e) {
  if (!e.message.includes('already injected')) {
    console.error('Continuous Toolbox registration error:', e);
  }
}

const LOCALES = { tr: TrLocale, en: EnLocale, de: DeLocale };

const getTheme = (mode) => Blockly.Theme.defineTheme('agro_' + mode, {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: mode === 'dark' ? '#0f172a' : '#f8fafc',
    toolboxBackgroundColour: mode === 'dark' ? '#1e293b' : '#ffffff',
    toolboxForegroundColour: mode === 'dark' ? '#e2e8f0' : '#0f172a',
    flyoutBackgroundColour: mode === 'dark' ? '#1e293b' : '#ffffff',
    flyoutForegroundColour: mode === 'dark' ? '#e2e8f0' : '#0f172a',
    flyoutOpacity: 0.75,
    scrollbarColour: mode === 'dark' ? '#475569' : '#cbd5e1',
    insertionMarkerColour: '#22c55e',
    insertionMarkerOpacity: 0.5,
    scrollbarOpacity: 0.6,
    cursorColour: '#22c55e',
  },
  fontStyle: {
    family: 'Inter, system-ui, sans-serif',
    weight: '600',
    size: 12,
  },
});

export default function BlocklyEditor({ onWorkspaceReady, lang, theme, t }) {
  const containerRef = useRef(null);
  const workspaceRef = useRef(null);
  const [marquee, setMarquee] = useState(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const selectionSet = useRef(new Set());

  // ── Shift Takibi ────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => setIsShiftPressed(e.shiftKey);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKey);
    };
  }, []);

  // ── Dil ─────────────────────────────────────────
  useEffect(() => {
    const locale = LOCALES[lang] || TrLocale;
    Blockly.setLocale(locale);
    const t = translations[lang];
    Object.keys(t).forEach(key => {
      if (key.startsWith('BLOCK_')) Blockly.Msg[key] = t[key];
    });
    if (workspaceRef.current) {
      workspaceRef.current.updateToolbox(getToolbox(lang));
    }
  }, [lang]);

  // ── Tema ────────────────────────────────────────
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.setTheme(getTheme(theme));
    }
  }, [theme]);

  // ── Injection ───────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || workspaceRef.current) return;

    const ws = Blockly.inject(containerRef.current, {
      toolbox: getToolbox(lang),
      theme: getTheme(theme),
      renderer: 'zelos',
      grid: { spacing: 24, length: 3, colour: theme === 'dark' ? '#1e293b' : '#e2e8f0', snap: true },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.85, /* Workspace başlangıç ölçeği biraz daha küçük */
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.1
      },
      trashcan: true,
      move: { scrollbars: true, drag: true, wheel: true },
      sounds: false,
      plugins: {
        toolbox: 'ContinuousToolbox',
        flyoutsVerticalToolbox: 'ContinuousFlyout',
        metricsManager: 'ContinuousMetrics',
      }
    });

    // Flyout (Toolbox'taki bloklar) ölçeğini küçültelim ve KESİN OLARAK KİLİTLEYELİM
    if (ws.getFlyout()) {
      const flyout = ws.getFlyout();
      const flyoutWs = flyout.workspace_;
      
      // Flyout zoom olaylarını yakalayıp sadece kaydırmaya yönlendiriyoruz
      const flyoutSvg = flyout.workspace_.getSvgRoot();
      flyoutSvg.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault(); // Zoom'u engelle
          e.stopPropagation(); 
        }
      }, { capture: true, passive: false });

      // Ölçeği sadece bir kez düzgünce ayarla
      flyoutWs.setScale(0.65);
      
      // Zoom butonlarının flyout'u etkilemesini engellemek için zoom fonksiyonunu kapa
      flyoutWs.zoom = () => {};
    }

    workspaceRef.current = ws;
    if (onWorkspaceReady) onWorkspaceReady(ws);

    const clickHandler = (e) => {
      if (e.type === Blockly.Events.CLICK && !e.blockId) clearSelection();
    };
    ws.addChangeListener(clickHandler);

    const ro = new ResizeObserver(() => Blockly.svgResize(ws));
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      ws.removeChangeListener(clickHandler);
      ws.dispose();
      workspaceRef.current = null;
    };
  }, []);

  const clearSelection = useCallback(() => {
    selectionSet.current.forEach(id => {
      const block = workspaceRef.current?.getBlockById(id);
      if (block?.getSvgRoot()) block.getSvgRoot().classList.remove('block-selected-glow');
    });
    selectionSet.current.clear();
  }, []);

  // ── Marquee Handlers ───────────────────────────
  const handleMouseDown = (e) => {
    if (!isShiftPressed) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMarquee({
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!marquee) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMarquee(prev => ({
      ...prev,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    }));
  };

  const handleMouseUp = () => {
    if (!marquee) return;
    const ws = workspaceRef.current;
    if (!ws) return;

    const x1 = Math.min(marquee.startX, marquee.currentX);
    const y1 = Math.min(marquee.startY, marquee.currentY);
    const x2 = Math.max(marquee.startX, marquee.currentX);
    const y2 = Math.max(marquee.startY, marquee.currentY);
    const containerRect = containerRef.current.getBoundingClientRect();

    clearSelection();
    ws.getAllBlocks(false).forEach(block => {
      const bBox = block.getSvgRoot().getBoundingClientRect();
      const bx = bBox.left - containerRect.left;
      const by = bBox.top - containerRect.top;

      // Bloğun merkezi veya tamamı içindeyse seç
      if (bx >= x1 && bx + bBox.width <= x2 && by >= y1 && by + bBox.height <= y2) {
        selectionSet.current.add(block.id);
        block.getSvgRoot().classList.add('block-selected-glow');
      }
    });
    setMarquee(null);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Blockly Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Marquee Overlay (Sadece Shift basılıyken aktif) */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setMarquee(null)}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: isShiftPressed ? 50 : -1,
          cursor: isShiftPressed ? 'crosshair' : 'default',
          pointerEvents: isShiftPressed ? 'auto' : 'none',
          background: isShiftPressed && !marquee ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
        }}
      >
        {marquee && (
          <div style={{
            position: 'absolute',
            left: Math.min(marquee.startX, marquee.currentX),
            top: Math.min(marquee.startY, marquee.currentY),
            width: Math.abs(marquee.currentX - marquee.startX),
            height: Math.abs(marquee.currentY - marquee.startY),
            border: '2px dashed #22c55e',
            background: 'rgba(34, 197, 94, 0.15)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Shift Bilgi Label */}
      {isShiftPressed && (
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#22c55e',
          color: 'white',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 10,
          fontWeight: 800,
          pointerEvents: 'none',
          zIndex: 60,
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
        }}>
          {t.multiSelectMode}
        </div>
      )}
    </div>
  );
}
