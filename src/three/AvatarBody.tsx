import * as THREE from 'three';
import type { AvatarConfig } from '../types';

interface AvatarBodyProps {
  config: AvatarConfig;
}

function Skin({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.72} metalness={0} />;
}

export function AvatarBody({ config }: AvatarBodyProps) {
  const skin  = config.skinTone;
  const isFem = config.gender === 'female';

  const scaleY    = config.height === 'tall' ? 1.08 : config.height === 'short' ? 0.93 : 1.0;
  const bS        = config.bodyType === 'curvy'    ? 1.13
                  : config.bodyType === 'slim'      ? 0.87
                  : config.bodyType === 'athletic'  ? 1.05 : 1.0;

  const shoulderW = isFem ? 0.19 : 0.23;
  const hipW      = isFem ? 0.22 : 0.18;
  const waistW    = isFem ? 0.14 : 0.17;
  const bustR     = isFem ? 0.048 * bS : 0;

  const armX = shoulderW * bS + 0.09;

  return (
    <group scale={[1, scaleY, 1]}>

      {/* ── TÊTE ── */}
      <mesh position={[0, 1.60, 0]} castShadow>
        <sphereGeometry args={[0.215, 32, 32]} />
        <Skin color={skin} />
      </mesh>
      {/* Mâchoire */}
      <mesh position={[0, 1.455, 0]} castShadow>
        <sphereGeometry args={[0.172, 24, 24]} />
        <Skin color={skin} />
      </mesh>

      {/* ── VISAGE ── */}
      {/* Nez */}
      <mesh position={[0, 1.545, 0.21]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.022, 1.515, 0.222]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.022, 1.515, 0.222]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <Skin color={skin} />
      </mesh>
      {/* Lèvres */}
      <mesh position={[0, 1.474, 0.212]}>
        <sphereGeometry args={[0.020, 8, 8]} />
        <meshStandardMaterial color={skin < '#7' ? '#bf6b5e' : '#7a3428'} roughness={0.55}/>
      </mesh>
      <mesh position={[0, 1.460, 0.215]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={skin < '#7' ? '#bf6b5e' : '#7a3428'} roughness={0.55}/>
      </mesh>
      {/* Yeux */}
      <mesh position={[-0.077, 1.578, 0.198]}>
        <sphereGeometry args={[0.026, 10, 10]} />
        <meshStandardMaterial color="#1C1917" roughness={0.1}/>
      </mesh>
      <mesh position={[0.077, 1.578, 0.198]}>
        <sphereGeometry args={[0.026, 10, 10]} />
        <meshStandardMaterial color="#1C1917" roughness={0.1}/>
      </mesh>
      {/* Reflets */}
      <mesh position={[-0.072, 1.581, 0.210]}>
        <sphereGeometry args={[0.009, 6, 6]} />
        <meshStandardMaterial color="#F5F5F0" emissive="#F5F5F0" emissiveIntensity={0.3}/>
      </mesh>
      <mesh position={[0.082, 1.581, 0.210]}>
        <sphereGeometry args={[0.009, 6, 6]} />
        <meshStandardMaterial color="#F5F5F0" emissive="#F5F5F0" emissiveIntensity={0.3}/>
      </mesh>

      {/* ── COU ── */}
      <mesh position={[0, 1.315, 0]} castShadow>
        <cylinderGeometry args={[0.077, 0.090, 0.17, 16]} />
        <Skin color={skin} />
      </mesh>

      {/* ── TORSE ── */}
      <mesh position={[0, 1.09, 0]} castShadow scale={[bS, 1, bS]}>
        <cylinderGeometry args={[shoulderW * 1.05, waistW + 0.025, 0.24, 20]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0, 0.87, 0]} castShadow scale={[bS, 1, bS]}>
        <cylinderGeometry args={[waistW + 0.025, waistW, 0.24, 20]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0, 0.70, 0]} castShadow scale={[bS, 1, bS]}>
        <cylinderGeometry args={[waistW, waistW + 0.01, 0.14, 20]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0, 0.545, 0]} castShadow scale={[bS, 1, bS]}>
        <cylinderGeometry args={[hipW * 1.04, hipW, 0.20, 20]} />
        <Skin color={skin} />
      </mesh>

      {/* Poitrine féminine */}
      {bustR > 0 && (
        <>
          <mesh position={[-0.088, 1.00, 0.112]} castShadow>
            <sphereGeometry args={[bustR, 12, 12]} />
            <Skin color={skin} />
          </mesh>
          <mesh position={[0.088, 1.00, 0.112]} castShadow>
            <sphereGeometry args={[bustR, 12, 12]} />
            <Skin color={skin} />
          </mesh>
        </>
      )}

      {/* ── BRAS GAUCHE ── */}
      <mesh position={[-armX, 1.11, 0]} castShadow>
        <sphereGeometry args={[0.068, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-armX - 0.042, 0.915, 0]} rotation={[0, 0, 0.20]} castShadow>
        <cylinderGeometry args={[0.060, 0.050, 0.34, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-armX - 0.078, 0.725, 0]} castShadow>
        <sphereGeometry args={[0.050, 10, 10]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-armX - 0.098, 0.560, 0]} rotation={[0, 0, 0.10]} castShadow>
        <cylinderGeometry args={[0.046, 0.037, 0.31, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-armX - 0.112, 0.395, 0]} castShadow>
        <sphereGeometry args={[0.042, 10, 10]} />
        <Skin color={skin} />
      </mesh>

      {/* ── BRAS DROIT ── */}
      <mesh position={[armX, 1.11, 0]} castShadow>
        <sphereGeometry args={[0.068, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[armX + 0.042, 0.915, 0]} rotation={[0, 0, -0.20]} castShadow>
        <cylinderGeometry args={[0.060, 0.050, 0.34, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[armX + 0.078, 0.725, 0]} castShadow>
        <sphereGeometry args={[0.050, 10, 10]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[armX + 0.098, 0.560, 0]} rotation={[0, 0, -0.10]} castShadow>
        <cylinderGeometry args={[0.046, 0.037, 0.31, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[armX + 0.112, 0.395, 0]} castShadow>
        <sphereGeometry args={[0.042, 10, 10]} />
        <Skin color={skin} />
      </mesh>

      {/* ── JAMBE GAUCHE ── */}
      <mesh position={[-0.118, 0.445, 0]} castShadow>
        <sphereGeometry args={[0.085, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.122, 0.235, 0]} castShadow scale={[bS * 0.94, 1, bS * 0.94]}>
        <cylinderGeometry args={[0.086, 0.076, 0.37, 14]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.122, 0.038, 0]} castShadow>
        <sphereGeometry args={[0.074, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.122, -0.188, 0]} castShadow>
        <cylinderGeometry args={[0.064, 0.052, 0.35, 14]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.122, -0.388, 0]} castShadow>
        <sphereGeometry args={[0.050, 10, 10]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[-0.116, -0.418, 0.055]} castShadow>
        <boxGeometry args={[0.100, 0.054, 0.200]} />
        <Skin color={skin} />
      </mesh>

      {/* ── JAMBE DROITE ── */}
      <mesh position={[0.118, 0.445, 0]} castShadow>
        <sphereGeometry args={[0.085, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.122, 0.235, 0]} castShadow scale={[bS * 0.94, 1, bS * 0.94]}>
        <cylinderGeometry args={[0.086, 0.076, 0.37, 14]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.122, 0.038, 0]} castShadow>
        <sphereGeometry args={[0.074, 12, 12]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.122, -0.188, 0]} castShadow>
        <cylinderGeometry args={[0.064, 0.052, 0.35, 14]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.122, -0.388, 0]} castShadow>
        <sphereGeometry args={[0.050, 10, 10]} />
        <Skin color={skin} />
      </mesh>
      <mesh position={[0.116, -0.418, 0.055]} castShadow>
        <boxGeometry args={[0.100, 0.054, 0.200]} />
        <Skin color={skin} />
      </mesh>

    </group>
  );
}
