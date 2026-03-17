import { useMemo, useEffect, useRef, useState } from 'react';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';
import type { AvatarConfig } from '../types';

const TARGET_HEIGHT = 1.72;

interface AvatarBodyProps {
  config: AvatarConfig;
}

// Mesure légère via bounding box des géométries (pas vertex par vertex)
function measureModel(root: THREE.Object3D): { minY: number; maxY: number } {
  let minY = Infinity;
  let maxY = -Infinity;

  root.updateMatrixWorld(true);

  root.traverse(child => {
    if (!(child instanceof THREE.Mesh) && !(child instanceof THREE.SkinnedMesh)) return;
    const geo = child.geometry as THREE.BufferGeometry;
    geo.computeBoundingBox();
    if (!geo.boundingBox) return;
    const box = geo.boundingBox.clone().applyMatrix4(child.matrixWorld);
    if (box.min.y < minY) minY = box.min.y;
    if (box.max.y > maxY) maxY = box.max.y;
  });

  return { minY, maxY };
}

function FBXModel({ src, config }: { src: string; config: AvatarConfig }) {
  const fbx      = useFBX(src);
  const groupRef = useRef<THREE.Group>(null);
  const model    = useMemo(() => fbx.clone(true), [fbx]);

  const bodyScale = config.bodyType === 'curvy'   ? 1.06
                  : config.bodyType === 'slim'     ? 0.94
                  : config.bodyType === 'athletic' ? 1.03 : 1.0;
  const scaleY    = config.height === 'tall'  ? 1.08
                  : config.height === 'short' ? 0.93 : 1.0;

  const [transform, setTransform] = useState({ s: 0.009, y: -0.42 });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!groupRef.current) return;

      groupRef.current.scale.set(1, 1, 1);
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.updateMatrixWorld(true);

      const { minY, maxY } = measureModel(groupRef.current);
      const h = maxY - minY;

      if (h > 0) {
        const s    = TARGET_HEIGHT / h;
        const offY = -minY * s - 0.42;
        setTransform({ s, y: offY });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [model]);

  // Applique les matériaux : peau + override couleurs noires
  useEffect(() => {
    model.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(mat => {
        // Remplace le matériau par un MeshStandardMaterial propre si besoin
        const src = mat as THREE.MeshStandardMaterial;
        const n   = ((src.name ?? '')).toLowerCase();

        const isSkin = n.includes('skin') || n.includes('body') || n.includes('head') ||
                       n.includes('corps') || n.includes('peau') || n.includes('visage') ||
                       n.includes('arm')   || n.includes('leg')  || n.includes('hand')  ||
                       n.includes('face')  || n.includes('neck');

        // Couleur trop sombre (presque noire) → on force une couleur visible
        const col  = new THREE.Color();
        if (src.color) col.copy(src.color);
        const dark = col.r < 0.08 && col.g < 0.08 && col.b < 0.08;

        if (isSkin) {
          src.color     = new THREE.Color(config.skinTone);
          src.roughness = 0.72;
          src.metalness = 0;
          src.needsUpdate = true;
        } else if (dark || !src.map) {
          // Vêtement sans texture ou noir → couleur neutre agréable
          src.color     = new THREE.Color('#4a4a4a');
          src.roughness = 0.75;
          src.metalness = 0.05;
          src.needsUpdate = true;
        }
      });
    });
  }, [model, config.skinTone]);

  useEffect(() => {
    model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <group
      ref={groupRef}
      position={[0, transform.y, 0]}
      scale={[transform.s * bodyScale, transform.s * scaleY, transform.s * bodyScale]}
    >
      <primitive object={model} />
    </group>
  );
}

export function AvatarBody({ config }: AvatarBodyProps) {
  const src = config.gender === 'female'
    ? '/fbx Clean.fbx'
    : '/fbx Cleanhomme.fbx';

  return <FBXModel key={src} src={src} config={config} />;
}
