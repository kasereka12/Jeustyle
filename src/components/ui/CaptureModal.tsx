import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

const BACKGROUNDS = [
  { id: 'blanc',   label: 'Blanc cassé',  value: '#FAFAF8' },
  { id: 'noir',    label: 'Noir profond', value: '#0A0A0A' },
  { id: 'or',      label: 'Or sable',     value: '#F5E6C3' },
  { id: 'terracotta', label: 'Terracotta', value: '#CB4154' },
  { id: 'indigo',  label: 'Indigo nuit',  value: '#1E1B4B' },
  { id: 'savane',  label: 'Savane',       value: '#8B6914' },
];

export function CaptureModal() {
  const { showCapture, closeCapture } = useUIStore();
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0].id);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const bg = BACKGROUNDS.find(b => b.id === selectedBg)!;
      const target = document.getElementById('avatar-canvas-container');
      if (!target) return;

      const canvas = await html2canvas(target, {
        backgroundColor: bg.value,
        scale: 2,
        useCORS: true,
        allowTaint: false,
      });

      const link = document.createElement('a');
      link.download = `asa-avatar-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const bg = BACKGROUNDS.find(b => b.id === selectedBg)!;

  return (
    <AnimatePresence>
      {showCapture && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={closeCapture}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2 md:w-[440px]
                       bg-canvas dark:bg-[#111] border border-border z-50"
          >
            <div className="p-8">
              <button
                onClick={closeCapture}
                className="absolute top-4 right-4 text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] text-lg"
              >
                ×
              </button>

              <p className="label text-[10px] tracking-[0.3em] uppercase text-muted mb-3">
                Exporter
              </p>
              <h2 className="serif text-2xl font-light mb-6">Capturer mon avatar</h2>

              {/* Background preview chip */}
              <div
                className="h-16 w-full mb-6 border border-border flex items-center justify-center"
                style={{ backgroundColor: bg.value }}
              >
                <span
                  className="label text-[10px] tracking-widest uppercase"
                  style={{ color: bg.value === '#0A0A0A' || bg.value === '#1E1B4B' ? '#FAFAF8' : '#0A0A0A' }}
                >
                  Aperçu fond
                </span>
              </div>

              {/* Background selector */}
              <p className="section-title">Fond</p>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {BACKGROUNDS.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBg(b.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 border transition-all text-left
                      ${selectedBg === b.id ? 'border-gold' : 'border-border hover:border-muted'}`}
                  >
                    <div
                      className="w-5 h-5 flex-shrink-0 border border-border/50"
                      style={{ backgroundColor: b.value }}
                    />
                    <span className="label text-[10px] tracking-wide text-muted uppercase truncate">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="btn-gold w-full justify-center text-xs tracking-[0.2em] uppercase disabled:opacity-50"
              >
                {downloading ? 'Génération…' : '↓ Télécharger PNG'}
              </button>

              <p className="text-[10px] text-muted text-center mt-3">
                Image 2× — fond transparent sur demande
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
