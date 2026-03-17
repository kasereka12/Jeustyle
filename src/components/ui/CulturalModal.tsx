import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { CLOTHING } from '../../data/clothing';

export function CulturalModal() {
  const { showCulture, selectedItem, closeCulture } = useUIStore();
  const item = selectedItem ? CLOTHING.find(c => c.id === selectedItem) : null;

  return (
    <AnimatePresence>
      {showCulture && item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={closeCulture}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px]
                       bg-canvas dark:bg-[#111] border border-border z-50 max-h-[80vh] overflow-y-auto"
          >
            {/* Header color band */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: item.accentColor ?? '#C9A84C' }}
            />

            <div className="p-8">
              {/* Close */}
              <button
                onClick={closeCulture}
                className="absolute top-4 right-4 text-muted hover:text-charcoal
                           dark:hover:text-[#FAFAF8] transition-colors text-lg leading-none"
              >
                ×
              </button>

              {/* Meta */}
              <p className="label text-[10px] tracking-[0.3em] uppercase text-muted mb-3">
                {item.region}
              </p>

              <h2 className="serif text-3xl font-light mb-1">
                {item.name}
              </h2>

              {item.wornBy && (
                <p className="text-xs text-muted italic mb-6">
                  Porté par : {item.wornBy}
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-border mb-6" />

              {/* Cultural note */}
              {item.culturalNote && (
                <p className="text-sm leading-relaxed text-charcoal/80 dark:text-[#FAFAF8]/70 mb-6">
                  {item.culturalNote}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.occasion?.map(style => (
                  <span
                    key={style}
                    className="label text-[10px] tracking-widest uppercase px-2.5 py-1 border border-border text-muted"
                  >
                    {style}
                  </span>
                ))}
                <span
                  className="label text-[10px] tracking-widest uppercase px-2.5 py-1 text-[#0A0A0A]"
                  style={{ backgroundColor: item.accentColor ?? '#C9A84C' }}
                >
                  {item.category}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={closeCulture}
                className="mt-8 btn-gold w-full justify-center text-xs tracking-[0.2em] uppercase"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
