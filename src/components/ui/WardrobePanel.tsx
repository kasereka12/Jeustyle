import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { useAvatarStore } from '../../store/avatarStore';
import type { SavedLook } from '../../types';

export function WardrobePanel() {
  const { showWardrobe, toggleWardrobe } = useUIStore();
  const { savedLooks, saveLook, loadLook, deleteLook } = useAvatarStore();
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!newName.trim()) return;
    saveLook(newName.trim());
    setNewName('');
    setSaving(false);
  };

  return (
    <AnimatePresence>
      {showWardrobe && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30"
            onClick={toggleWardrobe}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 38 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-canvas dark:bg-[#111]
                       border-l border-border z-40 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <p className="label text-[10px] tracking-[0.3em] uppercase text-muted">Mes looks</p>
                <h2 className="serif text-xl font-light mt-0.5">Garde-robe</h2>
              </div>
              <button
                onClick={toggleWardrobe}
                className="text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors text-xl"
              >
                ×
              </button>
            </div>

            {/* Save new look */}
            <div className="px-6 py-4 border-b border-border">
              {saving ? (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setSaving(false); }}
                    placeholder="Nom du look…"
                    className="flex-1 bg-surface border border-border px-3 py-2 text-sm outline-none
                               focus:border-gold placeholder:text-muted/40"
                  />
                  <button onClick={handleSave} className="btn-gold px-3 py-2 text-xs">
                    ✓
                  </button>
                  <button onClick={() => setSaving(false)} className="btn-ghost px-3 py-2 text-xs">
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSaving(true)}
                  className="w-full py-3 border border-dashed border-border text-muted text-xs
                             label tracking-widest uppercase hover:border-gold hover:text-charcoal
                             dark:hover:text-[#FAFAF8] transition-all"
                >
                  + Sauvegarder le look actuel
                </button>
              )}
            </div>

            {/* Saved looks list */}
            <div className="flex-1 overflow-y-auto">
              {savedLooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                  <p className="serif text-lg text-muted/40">Aucun look sauvegardé</p>
                  <p className="text-xs text-muted/30 mt-2">Créez votre premier look ci-dessus</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {savedLooks.map((look: SavedLook) => (
                    <motion.div
                      key={look.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 px-6 py-4 group"
                    >
                      {/* Color preview from equipped items */}
                      <div className="w-10 h-10 border border-border bg-surface flex-shrink-0 flex items-center justify-center">
                        <span className="text-lg">👗</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{look.name}</p>
                        <p className="text-[10px] text-muted label tracking-wider mt-0.5">
                          {new Date(look.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'short',
                          })}
                        </p>
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => loadLook(look)}
                          className="px-2.5 py-1.5 text-[10px] label tracking-widest uppercase
                                     border border-border hover:border-gold hover:text-charcoal
                                     dark:hover:text-[#FAFAF8] transition-all"
                        >
                          Porter
                        </button>
                        <button
                          onClick={() => deleteLook(look.id)}
                          className="px-2.5 py-1.5 text-[10px] text-muted hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
