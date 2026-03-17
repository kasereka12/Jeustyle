import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLOTHING } from '../../data/clothing';
import { COLLECTIONS } from '../../data/collections';
import { useAvatarStore } from '../../store/avatarStore';
import { useUIStore } from '../../store/uiStore';
import { PatternCarousel } from './PatternCarousel';
import type { EditorTab, EquippedItems, ItemStyling, ClothingCategory } from '../../types';

const TAB_LABELS: Record<string, string> = {
  hair:     'Coiffure',
  top:      'Haut',
  bottom:   'Bas',
  full:     'Robe entière',
  shoes:    'Chaussures',
  jewelry:  'Bijoux',
  accessory:'Accessoires',
  looks:    'Collections',
  culture:  'Culture',
};

const TABS: EditorTab[] = ['hair','top','bottom','full','shoes','jewelry','accessory','looks'];

export function ClothingPanel() {
  const { activeTab, setTab, openCulture } = useUIStore();
  const { equipped, styling, equip, applyCollection, reset } = useAvatarStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const items = CLOTHING.filter(c => c.category === activeTab);
  const isCollections = activeTab === 'looks';

  return (
    <div className="flex flex-col h-full bg-canvas dark:bg-[#0A0A0A]">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-border no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setTab(tab); setExpandedItem(null); }}
            className={`tab-button flex-shrink-0 ${activeTab === tab ? 'active' : ''}`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">
        {isCollections ? (
          <CollectionsView onApply={(c) => { applyCollection(c); }} />
        ) : (
          <ItemsGrid
            items={items}
            equipped={equipped}
            styling={styling}
            expandedItem={expandedItem}
            setExpandedItem={setExpandedItem}
            equip={equip}
            onCulture={openCulture}
          />
        )}
      </div>

      {/* Reset button */}
      <div className="px-4 pb-4 pt-2 border-t border-border">
        <button
          onClick={reset}
          className="w-full py-2.5 label text-[10px] tracking-[0.25em] uppercase text-muted
                     border border-border hover:border-gold hover:text-charcoal
                     dark:hover:text-[#FAFAF8] transition-all"
        >
          Tout retirer
        </button>
      </div>
    </div>
  );
}

// ── Items grid ────────────────────────────────────────────────────────────────

function ItemsGrid({ items, equipped, styling, expandedItem, setExpandedItem, equip, onCulture }: {
  items: typeof CLOTHING;
  equipped: EquippedItems;
  styling: Record<string, ItemStyling>;
  expandedItem: string | null;
  setExpandedItem: (id: string | null) => void;
  equip: (slot: ClothingCategory, itemId: string | null) => void;
  onCulture: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center px-6">
        <p className="serif text-base text-muted/40">Aucun article disponible</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-1">
      {items.map(item => {
        const isEquipped = Object.values(equipped).includes(item.id);
        const isExpanded = expandedItem === item.id;
        const itemStyle = styling[item.id];

        return (
          <motion.div
            key={item.id}
            layout
            className={`border transition-all duration-150 overflow-hidden
              ${isEquipped ? 'border-gold bg-gold/5' : 'border-border hover:border-muted/60'}`}
          >
            {/* Item row */}
            <div className="flex items-center gap-3 px-3 py-3">
              {/* Color dot / preview */}
              <div
                className="w-9 h-9 border border-border/50 flex-shrink-0"
                style={{
                  background: itemStyle?.color
                    ? itemStyle.color
                    : item.availableColors?.[0] ?? '#C9A84C',
                }}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="label text-[10px] tracking-wider uppercase text-muted">
                  {item.culture}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {/* Culture info */}
                {item.culturalNote && (
                  <button
                    onClick={() => onCulture(item.id)}
                    className="p-1.5 text-muted hover:text-gold transition-colors"
                    title="Note culturelle"
                  >
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5.5a1 1 0 112 0 1 1 0 01-2 0zm1 2.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 8z" />
                    </svg>
                  </button>
                )}

                {/* Pattern toggle */}
                {item.availablePatterns && item.availablePatterns.length > 0 && (
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    className={`p-1.5 transition-colors ${isExpanded ? 'text-gold' : 'text-muted hover:text-charcoal dark:hover:text-[#FAFAF8]'}`}
                    title="Personnaliser"
                  >
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                      <path d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>
                  </button>
                )}

                {/* Equip / unequip */}
                <button
                  onClick={() => equip(item.category as any, isEquipped ? null : item.id)}
                  className={`px-2.5 py-1.5 label text-[9px] tracking-[0.2em] uppercase transition-all
                    ${isEquipped
                      ? 'bg-gold text-[#0A0A0A]'
                      : 'border border-border text-muted hover:border-gold hover:text-charcoal dark:hover:text-[#FAFAF8]'}`}
                >
                  {isEquipped ? 'Porté' : 'Porter'}
                </button>
              </div>
            </div>

            {/* Pattern/color expander */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <PatternCarousel
                    itemId={item.id}
                    currentPattern={itemStyle?.patternId}
                    currentColor={itemStyle?.color}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Collections view ──────────────────────────────────────────────────────────

function CollectionsView({ onApply }: { onApply: (c: typeof COLLECTIONS[0]) => void }) {
  return (
    <div className="p-3 space-y-3">
      {COLLECTIONS.map((col, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="border border-border hover:border-muted transition-all overflow-hidden"
        >
          {/* Accent bar */}
          <div className="h-1" style={{ backgroundColor: col.accentColor }} />

          <div className="p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="serif text-base font-light">{col.title}</h3>
                <p className="label text-[10px] tracking-widest uppercase text-muted">
                  {col.subtitle}
                </p>
              </div>
              <button
                onClick={() => onApply(col)}
                className="flex-shrink-0 px-3 py-1.5 label text-[9px] tracking-[0.2em] uppercase
                           border border-border hover:bg-gold hover:border-gold hover:text-[#0A0A0A]
                           transition-all text-muted"
              >
                Appliquer
              </button>
            </div>
            <p className="text-xs text-muted leading-relaxed">{col.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
