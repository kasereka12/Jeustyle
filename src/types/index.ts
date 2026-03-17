// ── Avatar Config ─────────────────────────────────────────────
export type Gender     = 'female' | 'male';
export type BodyType   = 'slim' | 'medium' | 'curvy' | 'athletic';
export type SkinTone   = { label: string; hex: string };
export type HairColor  = { label: string; hex: string };

export interface AvatarConfig {
  gender:    Gender;
  bodyType:  BodyType;
  skinTone:  string;   // hex
  hairColor: string;   // hex
  height:    'short' | 'medium' | 'tall';
}

// ── Clothing ──────────────────────────────────────────────────
export type ClothingCategory =
  | 'hair' | 'top' | 'bottom' | 'full' | 'shoes' | 'jewelry' | 'accessory';

export type Region   = 'west' | 'east' | 'north' | 'south' | 'central' | 'diaspora';
export type Occasion = 'casual' | 'ceremony' | 'wedding' | 'royal' | 'street' | 'evening';
export type PatternType =
  | 'wax' | 'kente' | 'bogolan' | 'adire' | 'kitenge'
  | 'shweshwe' | 'solid' | 'modern' | 'brocade';

export interface Pattern {
  id:        string;
  name:      string;
  type:      PatternType;
  origin:    string;
  primary:   string;
  secondary: string;
  accent:    string;
}

export interface ClothingItem {
  id:               string;
  name:             string;
  localName:        string;
  category:         ClothingCategory;
  region:           Region;
  culture:          string;
  occasion:         Occasion[];
  availablePatterns: string[];     // pattern ids
  availableColors:  string[];      // hex palette
  description:      string;
  culturalNote:     string;
  wornBy:           Gender[];
  tags:             string[];
  accentColor?:     string;
}

// ── Saved Look ────────────────────────────────────────────────
export interface EquippedItems {
  hair:      string | null;
  top:       string | null;
  bottom:    string | null;
  full:      string | null;
  shoes:     string | null;
  jewelry:   string | null;
  accessory: string | null;
}

export interface ItemStyling {
  patternId: string;
  color:     string;
}

export interface SavedLook {
  id:        string;
  name:      string;
  avatar:    AvatarConfig;
  equipped:  EquippedItems;
  styling:   Record<string, ItemStyling>;  // itemId → styling
  pose:      string;
  createdAt: string;
}

// ── Collection ────────────────────────────────────────────────
export interface CollectionLook {
  title:       string;
  subtitle:    string;
  description: string;
  equipped:    Partial<EquippedItems>;
  styling:     Record<string, ItemStyling>;
  accentColor: string;
}

// ── UI ────────────────────────────────────────────────────────
export type AppScreen = 'landing' | 'login' | 'splash' | 'creator' | 'editor' | 'community';
export type EditorTab = ClothingCategory | 'looks' | 'culture';
