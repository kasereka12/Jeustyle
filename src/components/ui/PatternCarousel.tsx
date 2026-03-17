import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PATTERNS } from '../../data/patterns';
import { useAvatarStore } from '../../store/avatarStore';

interface PatternCarouselProps {
  itemId: string;
  currentPattern?: string;
  currentColor?: string;
}

const COLOR_PRESETS = [
  '#C9A84C', '#DAA520', '#CC5500', '#CB4154', '#7C3AED',
  '#0F766E', '#1E1B4B', '#3B1A08', '#1C1917', '#FFFFFF',
  '#DC2626', '#F4E1C1',
];

export function PatternCarousel({ itemId, currentPattern, currentColor }: PatternCarouselProps) {
  const setStyle = useAvatarStore(s => s.setStyle);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-t border-border bg-surface/50 px-4 py-4 space-y-4">
      {/* Pattern selector */}
      <div>
        <p className="section-title mb-3">Motif</p>
        <div ref={rowRef} className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {PATTERNS.map(pat => (
            <motion.button
              key={pat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setStyle(itemId, { patternId: pat.id })}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2 border transition-all
                ${currentPattern === pat.id ? 'border-gold bg-gold/5' : 'border-border hover:border-muted'}`}
            >
              <PatternSwatch patternId={pat.id} color={currentColor} />
              <span className="label text-[9px] tracking-wider uppercase text-muted whitespace-nowrap">
                {pat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Color presets */}
      <div>
        <p className="section-title mb-3">Couleur</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map(color => (
            <motion.button
              key={color}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStyle(itemId, { color })}
              className="w-7 h-7 transition-all"
              style={{
                backgroundColor: color,
                boxShadow: currentColor === color ? '0 0 0 2px #C9A84C, 0 0 0 3px transparent' : 'none',
                border: '1px solid rgba(0,0,0,0.15)',
              }}
              title={color}
            />
          ))}
          {/* Custom color picker */}
          <label className="w-7 h-7 cursor-pointer border border-dashed border-border
                            flex items-center justify-center text-muted text-xs hover:border-gold transition-colors">
            +
            <input
              type="color"
              className="sr-only"
              value={currentColor ?? '#C9A84C'}
              onChange={e => setStyle(itemId, { color: e.target.value })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// Mini canvas-rendered pattern swatch
function PatternSwatch({ patternId, color }: { patternId: string; color?: string }) {
  // Simple visual representation using CSS
  const preview = SWATCH_STYLES[patternId] ?? { background: color ?? '#C9A84C' };
  return (
    <div
      className="w-10 h-10"
      style={preview as React.CSSProperties}
    />
  );
}

const SWATCH_STYLES: Record<string, React.CSSProperties> = {
  'kente-royale': {
    background: 'repeating-linear-gradient(90deg, #DAA520 0px, #DAA520 4px, #1C1917 4px, #1C1917 8px, #CC5500 8px, #CC5500 12px, #1C1917 12px, #1C1917 16px)',
  },
  'bogolan-classique': {
    background: 'repeating-linear-gradient(45deg, #8B6914 0px, #8B6914 6px, #F5E6C3 6px, #F5E6C3 12px)',
  },
  'adire-indigo': {
    background: 'radial-gradient(circle at 30% 30%, #6080c0 0%, #1E1B4B 60%)',
  },
  'shweshwe-geo': {
    background: 'repeating-linear-gradient(45deg, #DC2626 0px, #DC2626 3px, transparent 3px, transparent 9px)',
  },
  'wax-papillon': {
    background: 'repeating-conic-gradient(#CC5500 0% 25%, #F5E6C3 0% 50%) 0 0 / 12px 12px',
  },
  'wax-fleurs': {
    background: 'radial-gradient(circle at 25% 25%, #7C3AED 20%, transparent 20%), radial-gradient(circle at 75% 75%, #7C3AED 20%, transparent 20%), #F5E6C3',
  },
  'wax-cercles': {
    background: 'radial-gradient(circle at 50% 50%, transparent 30%, #0F766E 30%, #0F766E 40%, transparent 40%), #F5E6C3',
  },
  'ankara-geo': {
    background: 'conic-gradient(#7C3AED 90deg, #DAA520 90deg 180deg, #7C3AED 180deg 270deg, #DAA520 270deg)',
    backgroundSize: '12px 12px',
  },
  'brocade-or': {
    background: 'repeating-linear-gradient(45deg, #DAA520 0px, #DAA520 2px, #F5E6C3 2px, #F5E6C3 8px)',
  },
  'modern-afro': {
    background: 'linear-gradient(135deg, #7C3AED, #DC2626, #DAA520)',
  },
  'solid-noir':  { background: '#1C1917' },
  'solid-blanc': { background: '#FAFAF8', border: '1px solid #e5e1d8' },
  'solid-creme': { background: '#F5E6C3' },
};
