import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment as DreiEnv, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentProps {
  darkMode: boolean;
}

export function Environment({ darkMode }: EnvironmentProps) {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={darkMode ? 0.35 : 0.55} color={darkMode ? '#8080a0' : '#ffffff'} />

      {/* Key light — warm front-top */}
      <directionalLight
        position={[2.5, 4.5, 3]}
        intensity={darkMode ? 1.1 : 1.4}
        color={darkMode ? '#c8b090' : '#fff8f0'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={4}
        shadow-camera-bottom={-2}
      />

      {/* Fill light — cool left side */}
      <directionalLight
        position={[-3, 2, 1]}
        intensity={darkMode ? 0.35 : 0.5}
        color={darkMode ? '#6080c0' : '#d0e0ff'}
      />

      {/* Rim light — back highlight */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={darkMode ? 0.5 : 0.4}
        color={darkMode ? '#C9A84C' : '#ffe8b0'}
      />

      {/* Floor / pedestal */}
      <Floor darkMode={darkMode} />

      {/* Contact shadow for grounding */}
      <ContactShadows
        position={[0, -0.415, 0]}
        opacity={darkMode ? 0.6 : 0.4}
        scale={2.5}
        blur={2.2}
        far={1.5}
        color={darkMode ? '#000000' : '#3a2200'}
      />

      {/* Environment preset for IBL reflections */}
      <DreiEnv preset="studio" background={false} />
    </>
  );
}

function Floor({ darkMode }: { darkMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, -0.42, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.2, 48]} />
      <meshStandardMaterial
        color={darkMode ? '#1a1812' : '#f5f0e8'}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  );
}
