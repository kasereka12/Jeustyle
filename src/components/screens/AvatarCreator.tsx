import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { useAvatarStore } from '../../store/avatarStore';
import type { AvatarConfig } from '../../types';

const SKIN_TONES = [
  { id: 's1', color: '#FDDBB4', label: 'Clair' },
  { id: 's2', color: '#D4956A', label: 'Doux' },
  { id: 's3', color: '#C67B4B', label: 'Miel' },
  { id: 's4', color: '#8D5524', label: 'Caramel' },
  { id: 's5', color: '#5C3317', label: 'Bronze' },
  { id: 's6', color: '#3B1F0F', label: 'Ébène' },
];

const HAIR_COLORS = [
  { id: 'h1', color: '#1C1917', label: 'Noir ébène' },
  { id: 'h2', color: '#3B1A08', label: 'Brun foncé' },
  { id: 'h3', color: '#7C4A1E', label: 'Brun roux' },
  { id: 'h4', color: '#C9A84C', label: 'Doré' },
  { id: 'h5', color: '#DC2626', label: 'Rouge audace' },
  { id: 'h6', color: '#7C3AED', label: 'Violet néon' },
];

const STEPS = ['genre', 'carnation', 'silhouette', 'cheveux'] as const;
type Step = typeof STEPS[number];

const STEP_LABELS: Record<Step, string> = {
  genre: 'Genre',
  carnation: 'Carnation',
  silhouette: 'Silhouette',
  cheveux: 'Cheveux',
};

export function AvatarCreator() {
  const setScreen = useUIStore(s => s.setScreen);
  const { config, setConfig } = useAvatarStore();
  const [step, setStep] = useState<Step>('genre');
  const [dir, setDir] = useState(1);

  const currentIdx = STEPS.indexOf(step);
  const isLast = currentIdx === STEPS.length - 1;

  const go = (target: Step) => {
    setDir(STEPS.indexOf(target) > currentIdx ? 1 : -1);
    setStep(target);
  };

  const next = () => {
    if (isLast) {
      setScreen('editor');
    } else {
      go(STEPS[currentIdx + 1]);
    }
  };

  const back = () => {
    if (currentIdx === 0) setScreen('splash');
    else go(STEPS[currentIdx - 1]);
  };

  return (
    <div className="w-full h-full flex flex-col bg-canvas dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-border">
        <button onClick={back} className="text-muted hover:text-charcoal dark:hover:text-[#FAFAF8] transition-colors text-sm">
          ← Retour
        </button>
        <span className="serif text-lg tracking-wide">Créer mon avatar</span>
        <span className="text-xs text-muted label tracking-widest uppercase">
          {currentIdx + 1} / {STEPS.length}
        </span>
      </div>

      {/* Steps indicator */}
      <div className="flex gap-1 px-8 pt-4">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col gap-1">
            <div className={`h-px transition-all duration-500 ${i <= currentIdx ? 'bg-gold' : 'bg-border'}`} />
            <span className={`label text-[10px] tracking-widest uppercase transition-colors ${s === step ? 'text-gold' : 'text-muted/50'}`}>
              {STEP_LABELS[s]}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm flex flex-col items-center gap-6"
          >
            <StepContent step={step} config={config} setConfig={setConfig} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-border flex justify-between items-center">
        <button onClick={back} className="btn-ghost text-xs tracking-widest uppercase">
          ← Précédent
        </button>
        <button onClick={next} className="btn-gold text-xs tracking-[0.2em] uppercase">
          {isLast ? 'Commencer à habiller →' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
}

// ─── Step content per step ────────────────────────────────────────────────────

function StepContent({
  step, config, setConfig,
}: {
  step: Step;
  config: AvatarConfig;
  setConfig: (c: Partial<AvatarConfig>) => void;
}) {
  switch (step) {
    case 'genre':
      return (
        <>
          <h2 className="serif text-3xl font-light">Votre genre</h2>
          <div className="flex gap-4 w-full">
            {(['female', 'male'] as const).map(g => (
              <button
                key={g}
                onClick={() => setConfig({ gender: g })}
                className={`flex-1 py-8 border flex flex-col items-center gap-3 transition-all duration-150
                  ${config.gender === g ? 'border-gold bg-gold/5' : 'border-border hover:border-muted'}`}
              >
                <span className="text-3xl">
                  {g === 'female' ? '♀' : '♂'}
                </span>
                <span className="label text-xs tracking-widest uppercase text-muted">
                  {g === 'female' ? 'Féminin' : 'Masculin'}
                </span>
              </button>
            ))}
          </div>
        </>
      );

    case 'carnation':
      return (
        <>
          <h2 className="serif text-3xl font-light">Carnation</h2>
          <div className="grid grid-cols-3 gap-3 w-full">
            {SKIN_TONES.map(s => (
              <button
                key={s.id}
                onClick={() => setConfig({ skinTone: s.color })}
                className={`flex flex-col items-center gap-2 p-3 border transition-all duration-150
                  ${config.skinTone === s.color ? 'border-gold' : 'border-transparent hover:border-border'}`}
              >
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: s.color, boxShadow: config.skinTone === s.color ? `0 0 0 2px #C9A84C` : 'none' }}
                />
                <span className="label text-[10px] tracking-wider text-muted uppercase">{s.label}</span>
              </button>
            ))}
          </div>
        </>
      );

    case 'silhouette':
      return (
        <>
          <h2 className="serif text-3xl font-light">Silhouette</h2>
          <div className="space-y-3 w-full">
            <p className="section-title">Corpulence</p>
            <div className="flex gap-3">
              {(['slim', 'medium', 'curvy'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setConfig({ bodyType: b })}
                  className={`flex-1 py-4 border text-sm transition-all duration-150
                    ${config.bodyType === b ? 'border-gold bg-gold/5 text-charcoal dark:text-[#FAFAF8]' : 'border-border text-muted hover:border-muted'}`}
                >
                  <span className="label text-xs tracking-widest uppercase">
                    {b === 'slim' ? 'Fine' : b === 'medium' ? 'Moyenne' : 'Généreuse'}
                  </span>
                </button>
              ))}
            </div>

            <p className="section-title mt-6">Taille</p>
            <div className="flex gap-3">
              {(['short', 'medium', 'tall'] as const).map(h => (
                <button
                  key={h}
                  onClick={() => setConfig({ height: h })}
                  className={`flex-1 py-4 border text-sm transition-all duration-150
                    ${config.height === h ? 'border-gold bg-gold/5 text-charcoal dark:text-[#FAFAF8]' : 'border-border text-muted hover:border-muted'}`}
                >
                  <span className="label text-xs tracking-widest uppercase">
                    {h === 'short' ? 'Petite' : h === 'medium' ? 'Moyenne' : 'Grande'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      );

    case 'cheveux':
      return (
        <>
          <h2 className="serif text-3xl font-light">Couleur de cheveux</h2>
          <div className="grid grid-cols-3 gap-3 w-full">
            {HAIR_COLORS.map(h => (
              <button
                key={h.id}
                onClick={() => setConfig({ hairColor: h.color })}
                className={`flex flex-col items-center gap-2 p-3 border transition-all duration-150
                  ${config.hairColor === h.color ? 'border-gold' : 'border-transparent hover:border-border'}`}
              >
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: h.color, boxShadow: config.hairColor === h.color ? `0 0 0 2px #C9A84C` : 'none' }}
                />
                <span className="label text-[10px] tracking-wider text-muted uppercase">{h.label}</span>
              </button>
            ))}
          </div>
        </>
      );
  }
}
