import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AvatarBody } from './AvatarBody';
import {
  AfroHair, TressesHair, GeleHair, LocksHair, KufiHat, TurbanHair,
  DashikiTop, CropAnkaraTop, ChemiseWaxTop,
  PagneSkirt, JupeLongue, PantalonTailleur,
  BoubouGrand, AgbadaRoyal, KaftanMarocain, JumpsuitAnkara,
  SandalesMassai, BabouchesOr, TalonsAnkara,
  CollierMassai, BraceletsCauris, BouclesOr,
  SacMainAnkara, EventailCeremoniel,
} from './ClothingMeshes';
import type { AvatarConfig, EquippedItems, ItemStyling } from '../types';

interface AvatarProps {
  config: AvatarConfig;
  equipped: EquippedItems;
  styling: Record<string, ItemStyling>;
  pose?: string;
}

const HAIR_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'afro-natural':   AfroHair,
  'tresses-longues': TressesHair,
  'gele-cérémonie': GeleHair,
  'locks-rasta':    LocksHair,
  'kufi-brodé':     KufiHat,
  'turban-soie':    TurbanHair,
};

const TOP_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'dashiki-classic': DashikiTop,
  'crop-ankara':     CropAnkaraTop,
  'chemise-wax':     ChemiseWaxTop,
};

const BOTTOM_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'pagne-royal':       PagneSkirt,
  'jupe-longue-wax':   JupeLongue,
  'pantalon-tailleur': PantalonTailleur,
};

const FULL_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'boubou-grand':    BoubouGrand,
  'agbada-royal':    AgbadaRoyal,
  'kaftan-marocain': KaftanMarocain,
  'jumpsuit-ankara': JumpsuitAnkara,
};

const SHOES_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'sandales-massai': SandalesMassai,
  'babouches-or':    BabouchesOr,
  'talons-ankara':   TalonsAnkara,
};

const JEWELRY_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'collier-massai':   CollierMassai,
  'bracelets-cauris': BraceletsCauris,
  'boucles-or':       BouclesOr,
};

const ACCESSORY_MAP: Record<string, React.ComponentType<{ styling?: ItemStyling }>> = {
  'sac-main-ankara':    SacMainAnkara,
  'eventail-ceremoniel': EventailCeremoniel,
};

export function Avatar({ config, equipped, styling, pose = 'idle' }: AvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    t.current += delta;

    if (pose === 'idle') {
      // Gentle breathing bob
      groupRef.current.position.y = Math.sin(t.current * 1.2) * 0.008;
      groupRef.current.rotation.y = Math.sin(t.current * 0.4) * 0.04;
    } else if (pose === 'strut') {
      groupRef.current.position.y = Math.abs(Math.sin(t.current * 2.5)) * 0.03;
      groupRef.current.rotation.y = t.current * 0.3;
    } else if (pose === 'pose') {
      groupRef.current.rotation.y = Math.sin(t.current * 0.5) * 0.15;
      groupRef.current.position.y = Math.sin(t.current * 1.0) * 0.005;
    }
  });

  const HairComp   = equipped.hair   ? HAIR_MAP[equipped.hair]   : null;
  const TopComp    = equipped.top    ? TOP_MAP[equipped.top]     : null;
  const BottomComp = equipped.bottom ? BOTTOM_MAP[equipped.bottom] : null;
  const FullComp   = equipped.full   ? FULL_MAP[equipped.full]   : null;
  const ShoesComp  = equipped.shoes  ? SHOES_MAP[equipped.shoes] : null;
  const JewelComp  = equipped.jewelry ? JEWELRY_MAP[equipped.jewelry] : null;
  const AccComp    = equipped.accessory ? ACCESSORY_MAP[equipped.accessory] : null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body (always shown — underlayer) */}
      <AvatarBody config={config} />

      {/* Shoes (below everything) */}
      {ShoesComp && (
        <ShoesComp styling={equipped.shoes ? styling[equipped.shoes] : undefined} />
      )}

      {/* Clothing — full outfit overrides top+bottom */}
      {FullComp ? (
        <FullComp styling={equipped.full ? styling[equipped.full] : undefined} />
      ) : (
        <>
          {TopComp && (
            <TopComp styling={equipped.top ? styling[equipped.top] : undefined} />
          )}
          {BottomComp && (
            <BottomComp styling={equipped.bottom ? styling[equipped.bottom] : undefined} />
          )}
        </>
      )}

      {/* Jewelry */}
      {JewelComp && (
        <JewelComp styling={equipped.jewelry ? styling[equipped.jewelry] : undefined} />
      )}

      {/* Hair / head accessory (above body, below nothing) */}
      {HairComp && (
        <HairComp styling={equipped.hair ? styling[equipped.hair] : undefined} />
      )}

      {/* Bag / accessory */}
      {AccComp && (
        <AccComp styling={equipped.accessory ? styling[equipped.accessory] : undefined} />
      )}
    </group>
  );
}
