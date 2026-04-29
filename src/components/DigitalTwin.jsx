/**
 * AgroScratch — Digital Twin 3D Scene
 * Three.js ile basit FarmBot raised bed + gantry visualizer
 */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';

/* ── Ölçek: 1 birim = 100mm ────────────────────────── */
const SCALE = 0.01;
const BED_W = 30;  // 3000mm
const BED_D = 15;  // 1500mm
const BED_H = 0.4;

/* ── Raised Bed ────────────────────────────────────── */
function RaisedBed() {
  return (
    <group position={[BED_W / 2, 0, BED_D / 2]}>
      {/* Toprak */}
      <mesh position={[0, BED_H / 2, 0]}>
        <boxGeometry args={[BED_W, BED_H, BED_D]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      {/* Çim üstü */}
      <mesh position={[0, BED_H + 0.01, 0]}>
        <boxGeometry args={[BED_W, 0.02, BED_D]} />
        <meshStandardMaterial color="#2d5016" roughness={0.8} />
      </mesh>
      {/* Ahşap kenarlar */}
      {[
        [0, BED_H / 2, BED_D / 2 + 0.15, BED_W + 0.3, BED_H, 0.3],
        [0, BED_H / 2, -BED_D / 2 - 0.15, BED_W + 0.3, BED_H, 0.3],
        [BED_W / 2 + 0.15, BED_H / 2, 0, 0.3, BED_H, BED_D],
        [-BED_W / 2 - 0.15, BED_H / 2, 0, 0.3, BED_H, BED_D],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#8B6914" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Gantry Robot ──────────────────────────────────── */
function GantryRobot({ position, isWatering }) {
  const groupRef = useRef();
  const waterRef = useRef();
  const targetPos = useMemo(() => ({
    x: position.x * SCALE,
    y: position.z * SCALE + BED_H + 0.5, // Z fiziksel → Y 3D
    z: position.y * SCALE,                // Y fiziksel → Z 3D
  }), [position]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetPos.x, delta * 3);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetPos.y, delta * 3);
    g.position.z = THREE.MathUtils.lerp(g.position.z, targetPos.z, delta * 3);

    // Su animasyonu
    if (waterRef.current) {
      waterRef.current.visible = isWatering;
      if (isWatering) {
        waterRef.current.scale.y = 0.5 + Math.sin(Date.now() * 0.005) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, BED_H + 0.5, 0]}>
      {/* X-axis rail */}
      <mesh position={[BED_W / 2, 0, 0]}>
        <boxGeometry args={[BED_W, 0.15, 0.15]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Gantry head */}
      <mesh>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#22c55e" metalness={0.6} roughness={0.3} emissive="#22c55e" emissiveIntensity={0.15} />
      </mesh>
      {/* Tool mount */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Su efekti */}
      <mesh ref={waterRef} position={[0, -0.7, 0]} visible={false}>
        <cylinderGeometry args={[0.03, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>
      {/* Glow halkası */}
      <pointLight color="#22c55e" intensity={2} distance={3} />
    </group>
  );
}

/* ── Koordinat Label ───────────────────────────────── */
function CoordLabel({ position }) {
  return (
    <Html position={[BED_W / 2, BED_H + 2.5, BED_D / 2]} center>
      <div style={{
        color: '#22c55e', fontFamily: 'Inter, monospace', fontWeight: 800,
        fontSize: 13, background: 'rgba(10,15,26,0.8)', padding: '6px 14px',
        borderRadius: 8, border: '1px solid #1e293b', whiteSpace: 'nowrap',
        backdropFilter: 'blur(4px)',
      }}>
        X:{Math.round(position.x)} &nbsp; Y:{Math.round(position.y)} &nbsp; Z:{Math.round(position.z)}
      </div>
    </Html>
  );
}

/* ── Main Scene ────────────────────────────────────── */
export default function DigitalTwin({ position, isWatering, theme }) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#070d1a' : '#f1f5f9';
  const gridColor = isDark ? '#1e293b' : '#cbd5e1';
  const sectionColor = isDark ? '#334155' : '#94a3b8';

  return (
    <div style={{ width: '100%', height: '100%', background: bgColor, borderRadius: '16px', overflow: 'hidden', transition: 'background 0.3s' }}>
      <Canvas
        camera={{ position: [20, 12, 20], fov: 50 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor(bgColor)}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.7} />
        <directionalLight position={[15, 20, 10]} intensity={isDark ? 1.2 : 0.8} castShadow />
        <directionalLight position={[-10, 15, -10]} intensity={isDark ? 0.3 : 0.5} color={isDark ? "#8888ff" : "#ffffff"} />

        <RaisedBed />
        <GantryRobot position={position} isWatering={isWatering} />
        <CoordLabel position={position} />

        {/* Zemin grid */}
        <Grid
          args={[50, 50]}
          position={[BED_W / 2, -0.01, BED_D / 2] - 0.01}
          cellSize={1}
          cellThickness={0.5}
          cellColor={gridColor}
          sectionSize={5}
          sectionThickness={1}
          sectionColor={sectionColor}
          fadeDistance={40}
          infiniteGrid
        />

        <OrbitControls
          makeDefault
          minDistance={5}
          maxDistance={50}
          target={[BED_W / 2, 1, BED_D / 2]}
          enableDamping
          dampingFactor={0.05}
        />
        <fog attach="fog" args={[bgColor, 30, 60]} />
      </Canvas>
    </div>
  );
}
