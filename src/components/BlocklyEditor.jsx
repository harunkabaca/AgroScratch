import { useRef, useEffect, useState, useMemo } from 'react';
import * as Blockly from 'blockly';
import * as TrLocale from 'blockly/msg/tr';
import * as EnLocale from 'blockly/msg/en';
import * as DeLocale from 'blockly/msg/de';
import '../blockly/blocks.js';
import '../blockly/generator.js';
import { getToolbox } from '../blockly/toolbox.js';
import { translations } from '../i18n/translations';

const LOCALES = { tr: TrLocale, en: EnLocale, de: DeLocale };

const getTheme = (mode) => Blockly.Theme.defineTheme('agro_' + mode, {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: mode === 'dark' ? '#0f172a' : '#f8fafc',
    toolboxBackgroundColour: mode === 'dark' ? '#1e293b' : '#ffffff',
    toolboxForegroundColour: mode === 'dark' ? '#e2e8f0' : '#0f172a',
    flyoutBackgroundColour: mode === 'dark' ? '#1e293b' : '#ffffff',
    flyoutForegroundColour: mode === 'dark' ? '#e2e8f0' : '#0f172a',
    flyoutOpacity: 0.95,
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

export default function BlocklyEditor({ onWorkspaceReady, lang, theme }) {
  const containerRef = useRef(null);
  const workspaceRef = useRef(null);
  const [marquee, setMarquee] = useState(null);
  const selectionSet = useRef(new Set());

  // Dil değişince Blockly mesajlarını güncelle
  useEffect(() => {
    const locale = LOCALES[lang] || TrLocale;
    Blockly.setLocale(locale);

    // Bizim çevirileri Blockly.Msg içine enjekte et
    const t = translations[lang];
    Object.keys(t).forEach(key => {
      if (key.startsWith('BLOCK_')) {
        Blockly.Msg[key] = t[key];
      }
    });

    // Toolbox'ı yeniden yükle
    if (workspaceRef.current) {
      workspaceRef.current.updateToolbox(getToolbox(lang));
    }
  }, [lang]);

  // Tema değişince Blockly temasını güncelle
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.setTheme(getTheme(theme));
    }
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current || workspaceRef.current) return;

    const ws = Blockly.inject(containerRef.current, {
      toolbox: getToolbox(lang),
      theme: getTheme(theme),
      renderer: 'zelos',
      grid: { spacing: 24, length: 3, colour: theme === 'dark' ? '#1e293b' : '#e2e8f0', snap: true },
      zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 2, minScale: 0.4, scaleSpeed: 1.1 },
      trashcan: true,
      move: { scrollbars: true, drag: true, wheel: true },
      sounds: false,
    });

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

  const clearSelection = () => {
    selectionSet.current.forEach(id => {
      const block = workspaceRef.current?.getBlockById(id);
      if (block?.getSvgRoot()) block.getSvgRoot().classList.remove('block-selected-glow');
    });
    selectionSet.current.clear();
  };

  const handleMouseDown = (e) => {
    if (!e.shiftKey || !workspaceRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMarquee({
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    });
    e.preventDefault();
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
      if (bx >= x1 && bx + bBox.width <= x2 && by >= y1 && by + bBox.height <= y2) {
        selectionSet.current.add(block.id);
        block.getSvgRoot().classList.add('block-selected-glow');
      }
    });
    setMarquee(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setMarquee(null)}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {marquee && (
        <div style={{
          position: 'absolute',
          left: Math.min(marquee.startX, marquee.currentX),
          top: Math.min(marquee.startY, marquee.currentY),
          width: Math.abs(marquee.currentX - marquee.startX),
          height: Math.abs(marquee.currentY - marquee.startY),
          border: '2px dashed #22c55e',
          background: 'rgba(34, 197, 94, 0.1)',
          pointerEvents: 'none',
          zIndex: 1000,
        }} />
      )}
    </div>
  );
}
