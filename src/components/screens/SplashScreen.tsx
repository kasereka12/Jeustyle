import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

export function SplashScreen() {
  const setScreen = useUIStore(s => s.setScreen);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    el.style.transition = 'stroke-dashoffset 2.4s ease-in-out';
    requestAnimationFrame(() => {
      el.style.strokeDashoffset = '0';
    });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-canvas dark:bg-[#0A0A0A] overflow-hidden">
      {/* Wax motif background SVG */}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <defs>
            <pattern id="wax-bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="6"  fill="none" stroke="#C9A84C" strokeWidth="1" />
              <circle cx="60" cy="60" r="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="6"  fill="none" stroke="#C9A84C" strokeWidth="1" />
              <line x1="20" y1="32" x2="20" y2="48" stroke="#C9A84C" strokeWidth="0.8" />
              <line x1="32" y1="20" x2="48" y2="20" stroke="#C9A84C" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#wax-bg)" />
        </svg>
      </div>

      {/* Animated draw-on kente line */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-visible pointer-events-none">
        <svg viewBox="0 0 1200 4" className="w-full h-4" preserveAspectRatio="none">
          <path
            ref={svgRef}
            d="M0 2 Q150 0 300 2 Q450 4 600 2 Q750 0 900 2 Q1050 4 1200 2"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center px-6 z-10"
      >
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-8"
        >
          <svg viewBox="0 0 60 60" className="w-14 h-14">
            <polygon points="30,4 56,18 56,42 30,56 4,42 4,18" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
            <polygon points="30,12 48,22 48,38 30,48 12,38 12,22" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
            <circle cx="30" cy="30" r="5" fill="#C9A84C" />
          </svg>
        </motion.div>

        <h1 className="serif text-5xl md:text-7xl font-light tracking-tight text-charcoal dark:text-[#FAFAF8] mb-3">
          ASA
        </h1>
        <p className="label text-xs tracking-[0.35em] uppercase text-gold mb-2">
          African Style Atelier
        </p>
        <p className="text-sm text-muted max-w-xs mt-4 leading-relaxed">
          Créez votre avatar en tenues africaines haute couture.
          De Dakar à Lagos, votre style, votre identité.
        </p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={() => setScreen('creator')}
          className="btn-gold mt-10 text-xs tracking-[0.2em] uppercase"
        >
          Commencer
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted/40 mt-8 tracking-wide"
        >
          41 pièces · 5 collections · 12 motifs
        </motion.p>
      </motion.div>

      {/* Bottom gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left"
      />
    </div>
  );
}
