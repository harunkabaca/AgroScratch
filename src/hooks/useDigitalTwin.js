/**
 * AgroScratch — useDigitalTwin Hook
 * Mock API: Simülatör state yönetimi + robot komut arayüzü
 */
import { useState, useRef, useCallback } from 'react';

const MOVE_DURATION = 1200; // ms — hareket animasyon süresi

export function useDigitalTwin() {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isWatering, setIsWatering] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [sensorValue, setSensorValue] = useState(25); // mock nem sensörü
  
  const latestPosition = useRef({ x: 0, y: 0, z: 0 });
  const abortRef = useRef(false);

  const api = {
    moveTo: (x, y, z) => {
      return new Promise((resolve) => {
        setTargetPosition({ x, y, z });
        // Animasyonlu hareket — MOVE_DURATION sonra tamamlanır
        const start = { ...latestPosition.current };
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const t = Math.min(elapsed / MOVE_DURATION, 1);
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad

          const newPos = {
            x: start.x + (x - start.x) * eased,
            y: start.y + (y - start.y) * eased,
            z: start.z + (z - start.z) * eased,
          };
          
          setPosition(newPos);
          latestPosition.current = newPos;

          if (t < 1) {
            requestAnimationFrame(animate);
          } else {
            const finalPos = { x, y, z };
            setPosition(finalPos);
            latestPosition.current = finalPos;
            resolve();
          }
        };
        requestAnimationFrame(animate);
      });
    },
    
    moveRelative: (dx, dy, dz) => {
      const curr = latestPosition.current;
      return api.moveTo(curr.x + dx, curr.y + dy, curr.z + dz);
    },

    waterOn: async () => {
      setIsWatering(true);
    },

    waterOff: async () => {
      setIsWatering(false);
    },

    wait: (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    readSensor: async (sensorType) => {
      // Mock: random değer 10-50 arası
      const val = Math.floor(Math.random() * 40) + 10;
      setSensorValue(val);
      return val;
    },

    getState: async () => {
      return latestPosition.current;
    },
  };

  const resetPosition = useCallback(() => {
    const origin = { x: 0, y: 0, z: 0 };
    setPosition(origin);
    setTargetPosition(origin);
    latestPosition.current = origin;
    setIsWatering(false);
    setIsExecuting(false);
  }, []);

  return {
    position,
    targetPosition,
    isWatering,
    isExecuting,
    setIsExecuting,
    sensorValue,
    api,
    resetPosition,
  };
}
