/**
 * AgroScratch — Digital Twin 3D Scene
 * Three.js ile basit FarmBot raised bed + gantry visualizer
 */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Ölçek: 1 birim = 100mm ────────────────────────── */
const SCALE = 0.01;
const BED_W = 30;  // 3000mm
const BED_D = 15;  // 1500mm
const BED_H = 1.0; // Yatağı yükselttik (1000mm eşdeğeri görsel ölçek)

/* ── Bahçe Yatağı (Raised Bed) ───────────────────────── */
function RaisedBed({ theme }) {
  const isDark = theme === 'dark';
  const woodColor = '#5d4037';
  const soilColor = '#3e2723';
  
  return (
    <group>
      {/* Toprak katmanı */}
      <mesh position={[BED_W / 2, BED_H / 2, BED_D / 2]} receiveShadow>
        <boxGeometry args={[BED_W, BED_H - 0.05, BED_D]} />
        <meshStandardMaterial color={soilColor} roughness={1} />
      </mesh>

      {/* Tarla üzerindeki ızgara (Grid) */}
      <Grid
        args={[BED_W, BED_D]}
        position={[BED_W / 2, BED_H - 0.02, BED_D / 2]}
        cellSize={1}
        cellThickness={0.5}
        cellColor={isDark ? '#444' : '#888'}
        sectionSize={5}
        sectionThickness={1}
        sectionColor={isDark ? '#666' : '#bbb'}
        fadeDistance={40}
        infiniteGrid={false}
      />

      {/* Ahşap çerçeveler (Daha Yüksek Planklar) */}
      {/* Yan Kenarlar (X) */}
      <mesh position={[BED_W / 2, BED_H / 2, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[BED_W + 0.4, BED_H + 0.4, 0.2]} />
        <meshStandardMaterial color={woodColor} roughness={0.9} />
      </mesh>
      <mesh position={[BED_W / 2, BED_H / 2, BED_D + 0.1]} castShadow receiveShadow>
        <boxGeometry args={[BED_W + 0.4, BED_H + 0.4, 0.2]} />
        <meshStandardMaterial color={woodColor} roughness={0.9} />
      </mesh>
      
      {/* Yan Kenarlar (Z) */}
      <mesh position={[-0.1, BED_H / 2, BED_D / 2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, BED_H + 0.4, BED_D]} />
        <meshStandardMaterial color={woodColor} roughness={0.9} />
      </mesh>
      <mesh position={[BED_W + 0.1, BED_H / 2, BED_D / 2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, BED_H + 0.4, BED_D]} />
        <meshStandardMaterial color={woodColor} roughness={0.9} />
      </mesh>

      {/* Metal Köşe Direkleri */}
      {[ [0, 0], [BED_W, 0], [0, BED_D], [BED_W, BED_D] ].map(([x, z], i) => (
        <mesh key={i} position={[x, BED_H / 2, z]}>
          <boxGeometry args={[0.25, BED_H + 0.6, 0.25]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Çevre (Çimen ve Zemin) ─────────────────────────── */
function Environment({ isDark }) {
  const grassColor = isDark ? '#112211' : '#4d8c3f';
  return (
    <group>
      {/* Geniş Çimen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[BED_W / 2, -0.05, BED_D / 2]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color={grassColor} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

/* ── Koordinat Label ───────────────────────────────── */
function CoordLabel({ position }) {
  return (
    <Html position={[position.x * SCALE, position.z * SCALE + BED_H + 2.5, position.y * SCALE]} center distanceFactor={15}>
      <div style={{
        background: 'rgba(10, 15, 26, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        padding: '6px 12px',
        borderRadius: '12px',
        color: '#22c55e',
        fontSize: '11px',
        fontWeight: '800',
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        gap: '8px',
        fontFamily: "'Fira Code', monospace"
      }}>
        <span style={{ color: '#4ade80' }}>X:{Math.round(position.x)}</span>
        <span style={{ color: '#4ade80' }}>Y:{Math.round(position.y)}</span>
        <span style={{ color: '#4ade80' }}>Z:{Math.round(position.z)}</span>
      </div>
    </Html>
  );
}

/* ── Ekilen Tohumlar ───────────────────────────────── */
function PlantedSeeds({ seeds }) {
  const plantIcons = {
    TOMATO: '🍅',
    LETTUCE: '🥬',
    CARROT: '🥕',
    DEFAULT: '🌱'
  };

  return (
    <group>
      {seeds.map((seed, i) => (
        <group key={i} position={[seed.x * SCALE, BED_H + 0.1, seed.y * SCALE]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.15, 16]} />
            <meshStandardMaterial color="#4ade80" transparent opacity={0.3} />
          </mesh>
          <Html center distanceFactor={10} position={[0, 0.4, 0]}>
            <div style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              {plantIcons[seed.plantType] || plantIcons.DEFAULT}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

/* ── Gantry Robot ──────────────────────────────────── */
function GantryRobot({ position, isWatering, isLedOn, ledColor, hasSeed, activeTool }) {
  const groupRef = useRef();
  const waterRef = useRef();
  
  const targetPos = useMemo(() => ({
    x: position.x * SCALE,
    y: position.z * SCALE + BED_H + 0.5, // Z fiziksel → Y 3D
    z: position.y * SCALE,                // Y fiziksel → Z 3D
  }), [position]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos.x, delta * 5);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPos.y, delta * 5);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos.z, delta * 5);
    }
    if (waterRef.current) {
      waterRef.current.visible = isWatering;
      if (isWatering) {
        waterRef.current.rotation.y += delta * 10;
        waterRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.2;
      }
    }
  });

  const toolColors = {
    SEEDER: '#16a34a',
    WATERER: '#2563eb',
    WEEDER: '#dc2626',
    CAMERA: '#7c3aed',
    NONE: '#64748b'
  };

  return (
    <group ref={groupRef}>
      {/* Z Ekseni (Gantry Column) */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[0.2, 10, 0.2]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Y Ekseni (Crossbar) */}
      <mesh position={[0, 0, -BED_D / 2 + position.y * SCALE / 2]}>
        <boxGeometry args={[0.3, 0.3, BED_D]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* X Ekseni Rayı */}
      <mesh position={[BED_W / 2, 0, 0]}>
        <boxGeometry args={[BED_W, 0.15, 0.15]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gantry head */}
      <mesh>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#22c55e" metalness={0.6} roughness={0.3} emissive="#22c55e" emissiveIntensity={0.15} />
      </mesh>

      {/* LED Glow Efekti */}
      {isLedOn && (
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={ledColor.toLowerCase()} 
            emissive={ledColor.toLowerCase()} 
            emissiveIntensity={2} 
          />
          <pointLight color={ledColor.toLowerCase()} intensity={5} distance={5} />
        </mesh>
      )}

      {/* Tool mount / Aktif Alet */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.4, 8]} />
        <meshStandardMaterial 
          color={toolColors[activeTool] || toolColors.NONE} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* Su efekti */}
      <mesh ref={waterRef} position={[0, -0.6, 0]} visible={false}>
        <cylinderGeometry args={[0.02, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Ekilecek Tohum (Eğer tutuluyorsa) */}
      {hasSeed && (
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
      )}
    </group>
  );
}

export default function DigitalTwin({ position, isWatering, isLedOn, ledColor, hasSeed, activeTool, plantedSeeds, theme, t }) {
  const controlsRef = useRef();
  const isDark = theme === 'dark';
  
  // Atmosferik Renkler
  const bgColor = isDark ? '#020617' : '#bae6fd'; 
  
  const focusOnRobot = () => {
    if (!controlsRef.current) return;
    const targetX = position.x * SCALE;
    const targetY = position.z * SCALE + BED_H + 0.5;
    const targetZ = position.y * SCALE;
    controlsRef.current.target.set(targetX, targetY, targetZ);
    controlsRef.current.update();
    const camera = controlsRef.current.object;
    camera.position.set(targetX + 4, targetY + 3, targetZ + 4);
    controlsRef.current.update();
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: bgColor, borderRadius: '16px', overflow: 'hidden', transition: 'background 1s' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', gap: 8 }}>
        <button
          onClick={focusOnRobot}
          style={{
            background: 'rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: '#22c55e',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          🔍 {t.focusOnRobot}
        </button>
      </div>

      <Canvas
        camera={{ position: [30, 20, 30], fov: 40 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: false, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.5 : 1.0,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <color attach="background" args={[bgColor]} />
        
        {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        
        <ambientLight intensity={isDark ? 1.2 : 0.8} color={isDark ? '#7777ff' : '#ffffff'} />
        
        <hemisphereLight 
          intensity={isDark ? 0.8 : 0.6} 
          color={isDark ? "#5555ff" : "#ffffff"} 
          groundColor={isDark ? "#222" : "#2d5a27"} 
        />
        
        <directionalLight 
          position={isDark ? [-40, 40, -40] : [40, 50, 20]} 
          intensity={isDark ? 3.0 : 2.5} 
          color={isDark ? '#bbccff' : '#fff9e6'}
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />

        <pointLight position={[15, 12, 7.5]} intensity={isDark ? 3.5 : 2.0} distance={100} color={isDark ? '#8888ff' : '#ffffff'} />
        
        <spotLight 
          position={[position.x * SCALE, 15, position.y * SCALE]} 
          target-position={[position.x * SCALE, 0, position.y * SCALE]}
          intensity={isDark ? 5 : 0} 
          angle={0.4} 
          penumbra={1} 
          color="#ffffff" 
        />

        <Environment isDark={isDark} />
        <RaisedBed theme={theme} />
        <PlantedSeeds seeds={plantedSeeds || []} />
        
        <GantryRobot 
          position={position} 
          isWatering={isWatering} 
          isLedOn={isLedOn} 
          ledColor={ledColor} 
          hasSeed={hasSeed} 
          activeTool={activeTool} 
        />
        
        <CoordLabel position={position} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          minDistance={1}
          maxDistance={120}
          target={[BED_W / 2, 1, BED_D / 2]}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
