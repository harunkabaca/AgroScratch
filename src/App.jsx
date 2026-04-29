/**
 * AgroScratch — App.jsx
 * Root layout: Toolbar + split (Blockly Editor | Digital Twin) + Console
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import BlocklyEditor from './components/BlocklyEditor';
import DigitalTwin from './components/DigitalTwin';
import ExecutionPanel from './components/ExecutionPanel';
import Toolbar from './components/Toolbar';
import { generateCode } from './blockly/generator';
import { SequentialExecutor } from './engine/executor';
import { useDigitalTwin } from './hooks/useDigitalTwin';
import { translations } from './i18n/translations';

export default function App() {
  const workspaceRef = useRef(null);
  const executorRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('console');
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('dark');
  const t = translations[lang];

  // Panel Boyutları (Yüzde olarak)
  const [leftWidth, setLeftWidth] = useState(55);
  const [topHeight, setTopHeight] = useState(70);
  
  // Yeni Modlar
  const [bigScreenOnRun, setBigScreenOnRun] = useState(false);
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { 
    position, isWatering, isExecuting, setIsExecuting, 
    isLedOn, ledColor, hasSeed, activeTool, plantedSeeds,
    api, resetPosition 
  } = useDigitalTwin();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  /* ── Workspace hazır ─────────────────────────────── */
  const handleWorkspaceReady = useCallback((ws) => {
    workspaceRef.current = ws;
  }, []);

  /* ── Log ekle ────────────────────────────────────── */
  const addLog = useCallback((entry) => {
    setLogs((prev) => [...prev, entry]);
    // Log eklenince konsol sekmesine odaklan
    setActiveTab('console');
  }, []);

  /* ── PLAY ────────────────────────────────────────── */
  const handlePlay = useCallback(async () => {
    if (!workspaceRef.current) return;
    const code = generateCode(workspaceRef.current);
    setGeneratedCode(code);
    setLogs([]);
    setIsExecuting(true);
    setIsPaused(false);
    setActiveTab('console'); // Çalışırken konsolu göster

    // Big Screen on Run aktifse ekranı büyüt
    if (bigScreenOnRun) {
      setLeftWidth(0); // Blockly'yi gizle
      setTopHeight(100); // Digital Twin'i tam ekran yap
    }

    const executor = new SequentialExecutor(api, addLog, (step) => {
      if (step.action === 'highlight' && workspaceRef.current) {
        workspaceRef.current.highlightBlock(step.blockId);
      }
    });
    executorRef.current = executor;

    await executor.execute(code);
    setIsExecuting(false);
    executorRef.current = null;
  }, [api, addLog, setIsExecuting]);

  /* ── STOP ────────────────────────────────────────── */
  const handleStop = useCallback(() => {
    if (executorRef.current) {
      executorRef.current.abort();
    }
    setIsExecuting(false);
    setIsPaused(false);
    // Vurguları temizle
    workspaceRef.current?.highlightBlock(null);
    // Layout'u eski haline getir (opsiyonel ama kullanıcı dostu)
    if (bigScreenOnRun) {
      setLeftWidth(55);
      setTopHeight(70);
    }
  }, [setIsExecuting, bigScreenOnRun]);

  /* ── RESET ───────────────────────────────────────── */
  const handleReset = useCallback(() => {
    handleStop();
    setLogs([]);
    resetPosition();
    setGeneratedCode('');
    setActiveTab('console');
    workspaceRef.current?.highlightBlock(null);
  }, [handleStop, resetPosition]);

  const handlePause = useCallback(() => {
    if (executorRef.current) {
      executorRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const handleResume = useCallback(() => {
    if (executorRef.current) {
      executorRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  /* ── Show Code ───────────────────────────────────── */
  const handleShowCode = useCallback(() => {
    if (!workspaceRef.current) return;
    const code = generateCode(workspaceRef.current);
    setGeneratedCode(code);
    setActiveTab('code');
  }, []);

  // ── Manuel Resizer Logic ────────────────────────
  const isResizingHRef = useRef(false);
  const isResizingVRef = useRef(false);

  const startResizingH = (e) => {
    isResizingHRef.current = true;
    document.addEventListener('mousemove', handleMouseMoveH);
    document.addEventListener('mouseup', stopResizingH);
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMoveH = (e) => {
    if (!isResizingHRef.current) return;
    const percentage = (e.clientX / window.innerWidth) * 100;
    if (percentage > 20 && percentage < 80) setLeftWidth(percentage);
  };

  const stopResizingH = () => {
    isResizingHRef.current = false;
    document.removeEventListener('mousemove', handleMouseMoveH);
    document.removeEventListener('mouseup', stopResizingH);
    document.body.style.cursor = 'default';
  };

  const startResizingV = (e) => {
    isResizingVRef.current = true;
    document.addEventListener('mousemove', handleMouseMoveV);
    document.addEventListener('mouseup', stopResizingV);
    document.body.style.cursor = 'row-resize';
  };

  const handleMouseMoveV = (e) => {
    if (!isResizingVRef.current) return;
    const offsetTop = 64;
    const availableHeight = window.innerHeight - offsetTop - 24;
    const percentage = ((e.clientY - offsetTop) / availableHeight) * 100;
    if (percentage > 20 && percentage < 80) setTopHeight(percentage);
  };

  const stopResizingV = () => {
    isResizingVRef.current = false;
    document.removeEventListener('mousemove', handleMouseMoveV);
    document.removeEventListener('mouseup', stopResizingV);
    document.body.style.cursor = 'default';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ── TOOLBAR ──────────────────────────────────── */}
      <Toolbar
        onPlay={handlePlay}
        onStop={handleStop}
        onReset={handleReset}
        onShowCode={handleShowCode}
        isExecuting={isExecuting}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
        bigScreenOnRun={bigScreenOnRun}
        setBigScreenOnRun={setBigScreenOnRun}
        isInspectMode={isInspectMode}
        setIsInspectMode={setIsInspectMode}
        isPaused={isPaused}
        setIsPaused={(val) => {
          if (val) handlePause(); else handleResume();
        }}
      />

      {/* ── MAIN AREA ────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Sol: Blockly Editor (İnceleme modunda veya Big Screen on Run çalışırken gizli) */}
        {!isInspectMode && leftWidth > 0 && (
          <div style={{ width: `${leftWidth}%`, minWidth: 200, position: 'relative' }}>
            <BlocklyEditor onWorkspaceReady={handleWorkspaceReady} lang={lang} theme={theme} t={t} />
          </div>
        )}

        {/* Resizer Handle (Yatay) - Sadece normal modda */}
        {!isInspectMode && leftWidth > 0 && !isExecuting && (
          <div onMouseDown={startResizingH} className="resize-handle-horizontal" style={{ width: 6, margin: 0, background: 'var(--border)' }} />
        )}

        <div style={{ 
          flex: 1, 
          minWidth: 200, 
          display: 'flex', 
          flexDirection: 'column',
          position: isInspectMode ? 'absolute' : 'relative',
          inset: isInspectMode ? 0 : 'auto',
          zIndex: isInspectMode ? 1000 : 1,
          background: 'var(--bg-primary)'
        }}>
          {/* Digital Twin */}
          <div style={{ 
            height: isInspectMode ? '100%' : `${topHeight}%`, 
            minHeight: 100, 
            padding: isInspectMode ? 0 : 8,
            flex: isInspectMode ? 1 : 'none'
          }}>
            <DigitalTwin 
              position={position} isWatering={isWatering} isLedOn={isLedOn} ledColor={ledColor}
              hasSeed={hasSeed} activeTool={activeTool} plantedSeeds={plantedSeeds} theme={theme} t={t}
            />
            {isInspectMode && (
              <button 
                onClick={() => setIsInspectMode(false)}
                style={{
                  position: 'absolute', top: 20, left: 20, zIndex: 1001,
                  background: '#ef4444', color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: 12, fontWeight: 800, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                ✕ {t.close}
              </button>
            )}
          </div>
          
          {/* Resizer Handle (Dikey) - Sadece normal modda */}
          {!isInspectMode && topHeight < 100 && (
            <div onMouseDown={startResizingV} className="resize-handle-vertical" style={{ height: 6, margin: 0, background: 'var(--border)', cursor: 'row-resize' }} />
          )}
          
          {/* Console */}
          {!isInspectMode && topHeight < 100 && (
            <div style={{ flex: 1, padding: '0 8px 8px 8px', minHeight: 50 }}>
              <ExecutionPanel 
                logs={logs} 
                t={t} 
                generatedCode={generatedCode} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          )}
        </div>
      </div>

      {/* ── STATUS BAR ───────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
        <span>📍 {t.position} — X:{Math.round(position.x)}  Y:{Math.round(position.y)}  Z:{Math.round(position.z)}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: isExecuting ? '#22c55e' : isWatering ? '#38bdf8' : '#475569', boxShadow: isExecuting ? '0 0 8px #22c55e' : 'none' }} />
          {isExecuting ? t.executing : isWatering ? t.watering : t.status}
        </span>
      </div>
    </div>
  );
}
