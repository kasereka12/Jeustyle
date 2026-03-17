import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AvatarConfig, EquippedItems } from '../types';

export interface PublishedLook {
  id:        string;
  userName:  string;
  avatar:    string; // initiales
  lookName:  string;
  config:    AvatarConfig;
  equipped:  EquippedItems;
  createdAt: string;
  tags:      string[];
  rating:    number;   // moyenne
  votes:     number;   // nb votes
  userVote:  number;   // vote de l'utilisateur courant (0 = pas encore voté)
}

export interface Competition {
  id:       string;
  title:    string;
  subtitle: string;
  theme:    string;
  deadline: string;
  prize:    string;
  entries:  number;
}

const MOCK_LOOKS: PublishedLook[] = [
  {
    id: 'mock-1', userName: 'Aminata K.', avatar: 'AK',
    lookName: 'Reine du Sénégal',
    config: { gender: 'female', bodyType: 'medium', skinTone: '#8D5524', hairColor: '#1C1917', height: 'medium' },
    equipped: { hair: 'gele-cérémonie', top: null, bottom: null, full: 'boubou-grand', shoes: 'sandales-massai', jewelry: 'collier-massai', accessory: null },
    createdAt: '2026-03-10T10:00:00Z', tags: ['Sénégal', 'Cérémonie', 'Wax'],
    rating: 4.8, votes: 124, userVote: 0,
  },
  {
    id: 'mock-2', userName: 'Kofi A.', avatar: 'KA',
    lookName: 'Roi Ashanti',
    config: { gender: 'male', bodyType: 'athletic', skinTone: '#4A2C0A', hairColor: '#1C1917', height: 'tall' },
    equipped: { hair: 'kufi-brodé', top: null, bottom: null, full: 'agbada-royal', shoes: 'babouches-or', jewelry: 'boucles-or', accessory: null },
    createdAt: '2026-03-11T14:00:00Z', tags: ['Ghana', 'Royauté', 'Kente'],
    rating: 4.6, votes: 98, userVote: 0,
  },
  {
    id: 'mock-3', userName: 'Fatou D.', avatar: 'FD',
    lookName: 'Nuit de Lagos',
    config: { gender: 'female', bodyType: 'curvy', skinTone: '#6B3A2A', hairColor: '#8B4513', height: 'medium' },
    equipped: { hair: 'tresses-longues', top: 'crop-ankara', bottom: 'jupe-longue-wax', full: null, shoes: 'talons-ankara', jewelry: 'bracelets-cauris', accessory: 'sac-main-ankara' },
    createdAt: '2026-03-12T09:00:00Z', tags: ['Nigeria', 'Street', 'Ankara'],
    rating: 4.5, votes: 87, userVote: 0,
  },
  {
    id: 'mock-4', userName: 'Youssef B.', avatar: 'YB',
    lookName: 'Fassi Prestige',
    config: { gender: 'male', bodyType: 'slim', skinTone: '#C49060', hairColor: '#1C1917', height: 'medium' },
    equipped: { hair: 'turban-soie', top: null, bottom: null, full: 'kaftan-marocain', shoes: 'babouches-or', jewelry: null, accessory: null },
    createdAt: '2026-03-13T16:00:00Z', tags: ['Maroc', 'Élégance', 'Kaftan'],
    rating: 4.7, votes: 112, userVote: 0,
  },
  {
    id: 'mock-5', userName: 'Nia O.', avatar: 'NO',
    lookName: 'Gélé Soleil',
    config: { gender: 'female', bodyType: 'medium', skinTone: '#7A3B1E', hairColor: '#1C1917', height: 'tall' },
    equipped: { hair: 'gele-cérémonie', top: null, bottom: null, full: 'boubou-grand', shoes: 'sandales-massai', jewelry: 'collier-massai', accessory: 'eventail-ceremoniel' },
    createdAt: '2026-03-14T11:00:00Z', tags: ['Yoruba', 'Cérémonie', 'Or'],
    rating: 4.9, votes: 203, userVote: 0,
  },
  {
    id: 'mock-6', userName: 'Seun M.', avatar: 'SM',
    lookName: 'Diaspora Flow',
    config: { gender: 'male', bodyType: 'medium', skinTone: '#5C3010', hairColor: '#1C1917', height: 'medium' },
    equipped: { hair: 'locks-rasta', top: 'dashiki-classic', bottom: 'pantalon-tailleur', full: null, shoes: 'sandales-massai', jewelry: 'bracelets-cauris', accessory: null },
    createdAt: '2026-03-15T08:00:00Z', tags: ['Diaspora', 'Modern', 'Dashiki'],
    rating: 4.3, votes: 65, userVote: 0,
  },
];

const CURRENT_COMPETITION: Competition = {
  id: 'comp-march-2026',
  title: 'Royauté Africaine',
  subtitle: 'Défi du mois de Mars',
  theme: 'Créez un look inspiré des tenues royales d\'Afrique. Chaque pièce doit raconter une histoire de grandeur et d\'héritage.',
  deadline: '31 Mars 2026',
  prize: 'Badge "Maître Créateur" + mise en avant sur la page d\'accueil',
  entries: 247,
};

interface CommunityStore {
  looks:       PublishedLook[];
  competition: Competition;
  publish:     (userName: string, lookName: string, config: AvatarConfig, equipped: EquippedItems, tags: string[]) => void;
  rate:        (lookId: string, stars: number) => void;
  deleteMyLook:(lookId: string) => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      looks:       MOCK_LOOKS,
      competition: CURRENT_COMPETITION,

      publish: (userName, lookName, config, equipped, tags) => {
        const look: PublishedLook = {
          id:        `look-${Date.now()}`,
          userName,
          avatar:    userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
          lookName,
          config,
          equipped,
          createdAt: new Date().toISOString(),
          tags,
          rating:    0,
          votes:     0,
          userVote:  0,
        };
        set(s => ({ looks: [look, ...s.looks] }));
      },

      rate: (lookId, stars) => {
        set(s => ({
          looks: s.looks.map(l => {
            if (l.id !== lookId || l.userVote !== 0) return l;
            const newVotes  = l.votes + 1;
            const newRating = (l.rating * l.votes + stars) / newVotes;
            return { ...l, rating: Math.round(newRating * 10) / 10, votes: newVotes, userVote: stars };
          }),
        }));
      },

      deleteMyLook: (lookId) =>
        set(s => ({ looks: s.looks.filter(l => l.id !== lookId) })),
    }),
    {
      name: 'asa-community',
      partialize: s => ({
        looks: s.looks.filter(l => !l.id.startsWith('mock-')), // ne persiste que les vraies créations
      }),
      merge: (persisted: any, current) => ({
        ...current,
        looks: [...MOCK_LOOKS, ...(persisted.looks ?? [])],
      }),
    }
  )
);
