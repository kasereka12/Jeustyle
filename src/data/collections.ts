import type { CollectionLook } from '../types';

export const COLLECTIONS: CollectionLook[] = [
  {
    title: 'Mariage à Lagos',
    subtitle: 'Cérémonie Yoruba',
    description: 'L\'élégance absolue d\'un mariage yoruba traditionnel. Agbada brodé, gele sculpté, collier de perles royales.',
    accentColor: '#DAA520',
    equipped: {
      hair: 'gele-cérémonie',
      full: 'agbada-royal',
      shoes: 'babouches-or',
      jewelry: 'collier-massai',
    },
    styling: {
      'gele-cérémonie': { patternId: 'brocade-or', color: '#DAA520' },
      'agbada-royal':   { patternId: 'kente-royale', color: '#F8F8F5' },
      'babouches-or':   { patternId: 'solid-creme', color: '#DAA520' },
      'collier-massai': { patternId: 'solid-blanc', color: '#DAA520' },
    },
  },
  {
    title: 'Casual Dakar',
    subtitle: 'Afro-Contemporain',
    description: 'Le style décontracté de Dakar — pagne noué avec légèreté, chemise wax ouverte, sandales ancestrales.',
    accentColor: '#C67B4B',
    equipped: {
      hair: 'tresses-longues',
      top: 'dashiki-classic',
      bottom: 'pagne-royal',
      shoes: 'sandales-massai',
      jewelry: 'bracelets-cauris',
    },
    styling: {
      'tresses-longues':  { patternId: 'solid-blanc', color: '#3B1A08' },
      'dashiki-classic':  { patternId: 'wax-papillon', color: '#CC5500' },
      'pagne-royal':      { patternId: 'wax-cercles', color: '#0F766E' },
      'sandales-massai':  { patternId: 'solid-noir', color: '#7C2D12' },
      'bracelets-cauris': { patternId: 'solid-blanc', color: '#F4E1C1' },
    },
  },
  {
    title: 'Cérémonie Royale Ashanti',
    subtitle: 'Royaume Ashanti — Ghana',
    description: 'La splendeur du royaume Ashanti. Kente tissé à la main, bijoux en or pur, boubou de soie.',
    accentColor: '#C9A84C',
    equipped: {
      hair: 'afro-natural',
      full: 'boubou-grand',
      shoes: 'babouches-or',
      jewelry: 'boucles-or',
      accessory: 'eventail-ceremoniel',
    },
    styling: {
      'afro-natural':       { patternId: 'solid-noir', color: '#1C1917' },
      'boubou-grand':       { patternId: 'kente-royale', color: '#DAA520' },
      'babouches-or':       { patternId: 'brocade-or', color: '#DAA520' },
      'boucles-or':         { patternId: 'solid-blanc', color: '#DAA520' },
      'eventail-ceremoniel':{ patternId: 'kente-royale', color: '#DAA520' },
    },
  },
  {
    title: 'Street Style Nairobi',
    subtitle: 'Kenya — Génération Z',
    description: 'Nairobi, capitale de la créativité africaine. Jumpsuit ankara audacieux, locks libres, sneakers custom.',
    accentColor: '#7C3AED',
    equipped: {
      hair: 'locks-rasta',
      full: 'jumpsuit-ankara',
      shoes: 'talons-ankara',
      jewelry: 'collier-massai',
    },
    styling: {
      'locks-rasta':      { patternId: 'solid-noir', color: '#3B1A08' },
      'jumpsuit-ankara':  { patternId: 'modern-afro', color: '#7C3AED' },
      'talons-ankara':    { patternId: 'ankara-geo', color: '#7C3AED' },
      'collier-massai':   { patternId: 'solid-blanc', color: '#DC2626' },
    },
  },
  {
    title: 'Soirée Afro-Chic',
    subtitle: 'Paris — Lagos — Abidjan',
    description: 'Une soirée entre Paris et Lagos. Kaftan brodé, boucles d\'oreilles oversize, talons qui brillent.',
    accentColor: '#EC4899',
    equipped: {
      hair: 'tresses-longues',
      full: 'kaftan-marocain',
      shoes: 'talons-ankara',
      jewelry: 'boucles-or',
    },
    styling: {
      'tresses-longues': { patternId: 'solid-noir', color: '#1C1917' },
      'kaftan-marocain': { patternId: 'brocade-or', color: '#1E1B4B' },
      'talons-ankara':   { patternId: 'wax-papillon', color: '#EC4899' },
      'boucles-or':      { patternId: 'solid-blanc', color: '#DAA520' },
    },
  },
];
