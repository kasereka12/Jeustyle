import { create } from 'zustand';
import type { AppScreen, EditorTab } from '../types';

interface User {
  name: string;
  email: string;
}

interface UIStore {
  screen:          AppScreen;
  activeTab:       EditorTab;
  selectedItem:    string | null;
  darkMode:        boolean;
  showCulture:     boolean;
  showCapture:     boolean;
  showWardrobe:    boolean;
  isLoading:       boolean;
  isAuthenticated: boolean;
  currentUser:     User | null;

  setScreen:       (s: AppScreen) => void;
  setTab:          (t: EditorTab) => void;
  selectItem:      (id: string | null) => void;
  toggleDark:      () => void;
  openCulture:     (itemId: string) => void;
  closeCulture:    () => void;
  openCapture:     () => void;
  closeCapture:    () => void;
  toggleWardrobe:  () => void;
  setLoading:      (v: boolean) => void;
  login:           (user: User) => void;
  logout:          () => void;
}

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem('asa-user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

const savedUser = loadUser();

export const useUIStore = create<UIStore>()((set) => ({
  screen:          savedUser ? 'splash' : 'landing',
  activeTab:       'hair',
  selectedItem:    null,
  darkMode:        false,
  showCulture:     false,
  showCapture:     false,
  showWardrobe:    false,
  isLoading:       false,
  isAuthenticated: savedUser !== null,
  currentUser:     savedUser,

  setScreen:       (screen)      => set({ screen }),
  setTab:          (activeTab)   => set({ activeTab, selectedItem: null }),
  selectItem:      (selectedItem) => set({ selectedItem }),
  toggleDark:      ()            => set(s => ({ darkMode: !s.darkMode })),
  openCulture:     (id)          => set({ showCulture: true, selectedItem: id }),
  closeCulture:    ()            => set({ showCulture: false }),
  openCapture:     ()            => set({ showCapture: true }),
  closeCapture:    ()            => set({ showCapture: false }),
  toggleWardrobe:  ()            => set(s => ({ showWardrobe: !s.showWardrobe })),
  setLoading:      (isLoading)   => set({ isLoading }),

  login: (user) => {
    localStorage.setItem('asa-user', JSON.stringify(user));
    set({ isAuthenticated: true, currentUser: user, screen: 'splash' });
  },

  logout: () => {
    localStorage.removeItem('asa-user');
    set({ isAuthenticated: false, currentUser: null, screen: 'landing' });
  },
}));
