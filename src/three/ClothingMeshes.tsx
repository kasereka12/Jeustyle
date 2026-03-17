import * as THREE from 'three';
import { useMemo } from 'react';
import { textureManager } from '../data/patterns';
import type { ItemStyling } from '../types';

interface MeshProps {
  styling?: ItemStyling;
}

function useTex(styling?: ItemStyling) {
  return useMemo(() => {
    if (!styling?.patternId) return null;
    return textureManager.generate(styling.patternId, styling.color);
  }, [styling?.patternId, styling?.color]);
}

function clothMat(tex: THREE.CanvasTexture | null, fallback = '#C9A84C', roughness = 0.65) {
  return tex
    ? <meshStandardMaterial map={tex} roughness={roughness} metalness={0.05} />
    : <meshStandardMaterial color={fallback} roughness={roughness} metalness={0.05} />;
}

// ── Lathe profile helper ──────────────────────────────────────────────────────
function lathe(pts: [number, number][], segs = 32) {
  return new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), segs);
}

// ── HAIR ─────────────────────────────────────────────────────────────────────

export function AfroHair({ styling }: MeshProps) {
  const tex = useTex(styling);
  return (
    <mesh position={[0, 1.55, 0]} castShadow>
      <sphereGeometry args={[0.30, 24, 24]} />
      {clothMat(tex, styling?.color ?? '#1C1917')}
    </mesh>
  );
}

export function TressesHair({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#3B1A08';
  return (
    <group position={[0, 1.55, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.23, 20, 20]} />
        {clothMat(tex, col)}
      </mesh>
      {[-0.12, 0, 0.12].map((x, i) => (
        <mesh key={i} position={[x, -0.45, 0]} castShadow>
          <cylinderGeometry args={[0.022, 0.010, 0.60, 8]} />
          {clothMat(null, col)}
        </mesh>
      ))}
      {[-0.08, 0.08].map((x, i) => (
        <mesh key={i} position={[x, -0.60, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.008, 0.40, 8]} />
          {clothMat(null, col)}
        </mesh>
      ))}
    </group>
  );
}

export function GeleHair({ styling }: MeshProps) {
  const tex = useTex(styling);
  return (
    <group position={[0, 1.55, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.22, 0.18, 20]} />
        {clothMat(tex, styling?.color ?? '#DAA520')}
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.20, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {clothMat(tex, styling?.color ?? '#DAA520')}
      </mesh>
    </group>
  );
}

export function LocksHair({ styling }: MeshProps) {
  const col = styling?.color ?? '#3B1A08';
  const positions: [number, number, number, number][] = [
    [-0.14, 1.72, 0.06, 0.8], [0.14, 1.72, 0.06, 0.8],
    [-0.20, 1.65, 0, 0.7], [0.20, 1.65, 0, 0.7],
    [-0.1, 1.68, -0.12, 0.75], [0.1, 1.68, -0.12, 0.75],
    [0, 1.75, 0, 0.9],
  ];
  return (
    <group>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color={col} roughness={0.9} />
      </mesh>
      {positions.map(([x, y, z, len], i) => (
        <mesh key={i} position={[x, y - len / 2, z]} castShadow>
          <cylinderGeometry args={[0.018, 0.012, len, 6]} />
          <meshStandardMaterial color={col} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function KufiHat({ styling }: MeshProps) {
  const tex = useTex(styling);
  return (
    <mesh position={[0, 1.72, 0]} castShadow>
      <cylinderGeometry args={[0.195, 0.21, 0.13, 20]} />
      {clothMat(tex, styling?.color ?? '#1C1917')}
    </mesh>
  );
}

export function TurbanHair({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#C9A84C';
  return (
    <group position={[0, 1.58, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.20, 0.06, 10, 24]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0, 0.06, 0]} castShadow>
        <sphereGeometry args={[0.19, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

// ── TOPS ─────────────────────────────────────────────────────────────────────

export function DashikiTop({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#CC5500';
  const geo = useMemo(() => lathe([
    [0.12, 0.55], [0.20, 0.45], [0.22, 0.25], [0.21, 0.0], [0.19, -0.20],
  ]), []);
  return (
    <group position={[0, 0.75, 0]}>
      <mesh geometry={geo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      {/* Short sleeves */}
      <mesh position={[-0.30, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.065, 0.18, 12]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.30, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.065, 0.18, 12]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

export function CropAnkaraTop({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#7C3AED';
  const geo = useMemo(() => lathe([
    [0.10, 0.30], [0.19, 0.20], [0.21, 0.0], [0.20, -0.10],
  ]), []);
  return (
    <group position={[0, 0.90, 0]}>
      <mesh geometry={geo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[-0.26, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.05, 0.12, 10]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.26, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.05, 0.12, 10]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

export function ChemiseWaxTop({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#0F766E';
  const geo = useMemo(() => lathe([
    [0.09, 0.55], [0.19, 0.45], [0.21, 0.20], [0.20, -0.20],
  ]), []);
  return (
    <group position={[0, 0.72, 0]}>
      <mesh geometry={geo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      {/* Long sleeves */}
      <mesh position={[-0.37, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.065, 0.05, 0.38, 12]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.37, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.065, 0.05, 0.38, 12]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

// ── BOTTOMS ──────────────────────────────────────────────────────────────────

export function PagneSkirt({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#0F766E';
  const geo = useMemo(() => lathe([
    [0.20, 0.0], [0.24, -0.15], [0.26, -0.35], [0.27, -0.55], [0.26, -0.70],
  ]), []);
  return (
    <mesh position={[0, 0.38, 0]} geometry={geo} castShadow>
      {clothMat(tex, col)}
    </mesh>
  );
}

export function JupeLongue({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#EC4899';
  const geo = useMemo(() => lathe([
    [0.20, 0.02], [0.23, -0.10], [0.25, -0.30], [0.28, -0.55], [0.30, -0.75],
    [0.31, -0.90],
  ]), []);
  return (
    <mesh position={[0, 0.38, 0]} geometry={geo} castShadow>
      {clothMat(tex, col)}
    </mesh>
  );
}

export function PantalonTailleur({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#1E1B4B';
  return (
    <group position={[0, 0.35, 0]}>
      {/* Waistband */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.06, 20]} />
        {clothMat(tex, col)}
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.10, -0.38, 0]} castShadow>
        <cylinderGeometry args={[0.10, 0.09, 0.65, 14]} />
        {clothMat(tex, col)}
      </mesh>
      {/* Right leg */}
      <mesh position={[0.10, -0.38, 0]} castShadow>
        <cylinderGeometry args={[0.10, 0.09, 0.65, 14]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

// ── FULL OUTFITS ─────────────────────────────────────────────────────────────

export function BoubouGrand({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#DAA520';
  const bodyGeo = useMemo(() => lathe([
    [0.10, 0.60], [0.26, 0.45], [0.30, 0.20], [0.31, 0.0],
    [0.32, -0.25], [0.34, -0.55], [0.35, -0.85],
  ]), []);
  return (
    <group position={[0, 0.78, 0]}>
      <mesh geometry={bodyGeo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      {/* Wide sleeves */}
      <mesh position={[-0.42, 0.28, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.08, 0.55, 14]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.42, 0.28, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.08, 0.55, 14]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

export function AgbadaRoyal({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#F8F8F5';
  const outerGeo = useMemo(() => lathe([
    [0.10, 0.62], [0.35, 0.50], [0.45, 0.30], [0.50, 0.0],
    [0.52, -0.30], [0.48, -0.60], [0.42, -0.90],
  ]), []);
  const innerGeo = useMemo(() => lathe([
    [0.10, 0.60], [0.22, 0.45], [0.24, 0.20], [0.23, 0.0],
    [0.22, -0.30], [0.21, -0.70],
  ]), []);
  return (
    <group position={[0, 0.78, 0]}>
      {/* Outer robe */}
      <mesh geometry={outerGeo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      {/* Inner garment */}
      <mesh geometry={innerGeo}>
        <meshStandardMaterial color={col} roughness={0.7} opacity={0.6} transparent />
      </mesh>
      {/* Agbada cap-like wide shoulders */}
      <mesh position={[-0.50, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.14, 0.06, 0.58, 14]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.50, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.14, 0.06, 0.58, 14]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

export function KaftanMarocain({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#1E1B4B';
  const geo = useMemo(() => lathe([
    [0.10, 0.62], [0.23, 0.48], [0.25, 0.25], [0.24, 0.0],
    [0.24, -0.25], [0.25, -0.55], [0.24, -0.85],
  ]), []);
  return (
    <group position={[0, 0.78, 0]}>
      <mesh geometry={geo} castShadow>
        {clothMat(tex, col)}
      </mesh>
      {/* 3/4 sleeves */}
      <mesh position={[-0.34, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.40, 12]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.34, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.40, 12]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

export function JumpsuitAnkara({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#7C3AED';
  return (
    <group>
      {/* Bodice */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.20, 0.55, 20]} />
        {clothMat(tex, col)}
      </mesh>
      {/* Trousers */}
      <mesh position={[-0.10, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.72, 14]} />
        {clothMat(tex, col)}
      </mesh>
      <mesh position={[0.10, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.72, 14]} />
        {clothMat(tex, col)}
      </mesh>
    </group>
  );
}

// ── SHOES ────────────────────────────────────────────────────────────────────

export function SandalesMassai({ styling }: MeshProps) {
  const col = styling?.color ?? '#7C2D12';
  const mat = <meshStandardMaterial color={col} roughness={0.8} />;
  return (
    <group>
      <mesh position={[-0.11, -0.385, 0.04]}>
        <boxGeometry args={[0.11, 0.025, 0.20]} />
        {mat}
      </mesh>
      <mesh position={[0.11, -0.385, 0.04]}>
        <boxGeometry args={[0.11, 0.025, 0.20]} />
        {mat}
      </mesh>
      {/* Straps */}
      {[-0.11, 0.11].map((x, i) => (
        <mesh key={i} position={[x, -0.36, 0.04]}>
          <boxGeometry args={[0.08, 0.015, 0.025]} />
          {mat}
        </mesh>
      ))}
    </group>
  );
}

export function BabouchesOr({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#DAA520';
  const mat = clothMat(tex, col, 0.4);
  return (
    <group>
      {[-0.11, 0.11].map((x, i) => (
        <group key={i} position={[x, -0.37, 0.04]}>
          <mesh>
            <boxGeometry args={[0.12, 0.04, 0.22]} />
            {mat}
          </mesh>
          {/* Pointed toe */}
          <mesh position={[0, 0, 0.13]}>
            <coneGeometry args={[0.04, 0.08, 8]} rotation={[Math.PI / 2, 0, 0] as any} />
            {mat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function TalonsAnkara({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#EC4899';
  const mat = clothMat(tex, col, 0.5);
  return (
    <group>
      {[-0.11, 0.11].map((x, i) => (
        <group key={i} position={[x, -0.34, 0.04]}>
          <mesh>
            <boxGeometry args={[0.10, 0.04, 0.16]} />
            {mat}
          </mesh>
          {/* Heel */}
          <mesh position={[0, -0.05, -0.08]}>
            <cylinderGeometry args={[0.018, 0.014, 0.10, 8]} />
            {mat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── JEWELRY ──────────────────────────────────────────────────────────────────

export function CollierMassai({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#DC2626';
  const geo = useMemo(() => new THREE.TorusGeometry(0.18, 0.018, 8, 36), []);
  return (
    <group position={[0, 1.22, 0]}>
      <mesh geometry={geo} rotation={[Math.PI / 2, 0, 0]}>
        {clothMat(tex, col)}
      </mesh>
      {/* Bead layers */}
      {[0.14, 0.17].map((r, i) => (
        <mesh key={i} geometry={new THREE.TorusGeometry(r, 0.012, 6, 28)}
          rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02 * i, 0]}>
          <meshStandardMaterial color={i === 0 ? '#FFFFFF' : col} />
        </mesh>
      ))}
    </group>
  );
}

export function BraceletsCauris({ styling }: MeshProps) {
  const col = styling?.color ?? '#F4E1C1';
  return (
    <group>
      {[-0.40, 0.40].map((x, i) => (
        <group key={i} position={[x, 0.45, 0]}>
          {[0, 0.025, 0.05].map((dy, j) => (
            <mesh key={j} position={[0, dy, 0]}>
              <torusGeometry args={[0.052, 0.01, 6, 16]} />
              <meshStandardMaterial color={col} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function BouclesOr({ styling }: MeshProps) {
  const col = styling?.color ?? '#DAA520';
  return (
    <group position={[0, 1.53, 0]}>
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <torusGeometry args={[0.04, 0.008, 8, 16]} />
          <meshStandardMaterial color={col} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ── ACCESSORIES ──────────────────────────────────────────────────────────────

export function SacMainAnkara({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#CC5500';
  return (
    <group position={[0.45, 0.35, 0.08]}>
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.14, 0.06]} />
        {clothMat(tex, col)}
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.10, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.05, 0.008, 6, 12, Math.PI]} />
        <meshStandardMaterial color={col} />
      </mesh>
    </group>
  );
}

export function EventailCeremoniel({ styling }: MeshProps) {
  const tex = useTex(styling);
  const col = styling?.color ?? '#DAA520';
  return (
    <group position={[0.42, 0.55, 0.1]} rotation={[0, 0, -0.3]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.02, 0.04, 12, 1, false, 0, Math.PI]} />
        {clothMat(tex, col)}
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.006, 0.22, 6]} />
        <meshStandardMaterial color="#8B6914" roughness={0.6} />
      </mesh>
    </group>
  );
}
