import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AvatarConfig, EquippedItems, ItemStyling, SavedLook, CollectionLook } from '../types';

const DEFAULT_AVATAR: AvatarConfig = {
  gender:    'female',
  bodyType:  'medium',
  skinTone:  '#8D5524',
  hairColor: '#1C1917',
  height:    'medium',
};

const EMPTY_EQUIPPED: EquippedItems = {
  hair: null, top: null, bottom: null, full: null,
  shoes: null, jewelry: null, accessory: null,
};

interface AvatarStore {
  config:    AvatarConfig;
  equipped:  EquippedItems;
  styling:   Record<string, ItemStyling>;  // itemId → styling
  savedLooks: SavedLook[];
  currentPose: string;

  setConfig:  (c: Partial<AvatarConfig>) => void;
  equip:      (slot: keyof EquippedItems, itemId: string | null) => void;
  setStyle:   (itemId: string, style: Partial<ItemStyling>) => void;
  applyCollection: (c: CollectionLook) => void;
  saveLook:   (name: string) => void;
  loadLook:   (look: SavedLook) => void;
  deleteLook: (id: string) => void;
  setPose:    (pose: string) => void;
  reset:      () => void;
}

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      config:    DEFAULT_AVATAR,
      equipped:  { ...EMPTY_EQUIPPED, hair: 'afro-natural', shoes: 'sandales-massai' },
      styling:   {},
      savedLooks: [],
      currentPose: 'idle',

      setConfig: (c) => set(s => ({ config: { ...s.config, ...c } })),

      equip: (slot, itemId) =>
        set(s => ({ equipped: { ...s.equipped, [slot]: itemId } })),

      setStyle: (itemId, style) =>
        set(s => ({
          styling: {
            ...s.styling,
            [itemId]: { ...(s.styling[itemId] ?? {}), ...style } as ItemStyling,
          },
        })),

      applyCollection: (c) =>
        set({
          equipped: { ...EMPTY_EQUIPPED, ...c.equipped },
          styling:  c.styling,
        }),

      saveLook: (name) => {
        const { config, equipped, styling } = get();
        const look: SavedLook = {
          id:        `look-${Date.now()}`,
          name,
          avatar:    { ...config },
          equipped:  { ...equipped },
          styling:   { ...styling },
          pose:      get().currentPose,
          createdAt: new Date().toISOString(),
        };
        set(s => ({ savedLooks: [...s.savedLooks, look] }));
      },

      loadLook: (look) =>
        set({
          config:  { ...look.avatar },
          equipped: { ...look.equipped },
          styling:  { ...look.styling },
        }),

      deleteLook: (id) =>
        set(s => ({ savedLooks: s.savedLooks.filter(l => l.id !== id) })),

      setPose: (pose) => set({ currentPose: pose }),

      reset: () =>
        set({ equipped: { ...EMPTY_EQUIPPED }, styling: {} }),
    }),
    {
      name: 'asa-avatar',
      partialize: s => ({
        config: s.config, equipped: s.equipped,
        styling: s.styling, savedLooks: s.savedLooks,
      }),
    }
  )
);
