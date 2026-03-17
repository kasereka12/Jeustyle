import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

export function LoginPage() {
  const { setScreen, login } = useUIStore();
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!email.includes('@')) {
      setError('Adresse e-mail invalide.');
      return;
    }
    login({ name: name.trim(), email: email.trim() });
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden">

      {/* Subtle wax pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <defs>
            <pattern id="wax-login" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="14" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="7"  fill="none" stroke="#C9A84C" strokeWidth="1" />
              <circle cx="60" cy="60" r="14" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="7"  fill="none" stroke="#C9A84C" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#wax-login)" />
        </svg>
      </div>

      {/* Top gold border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left"
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setScreen('landing')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#FAFAF8]/40
                   hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase label"
      >
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
          <path fillRule="evenodd" d="M7.707 13.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 7H14a1 1 0 010 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Retour
      </motion.button>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-auto px-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <svg viewBox="0 0 60 60" className="w-10 h-10 mb-5">
            <polygon points="30,4 56,18 56,42 30,56 4,42 4,18" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
            <polygon points="30,12 48,22 48,38 30,48 12,38 12,22" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
            <circle cx="30" cy="30" r="4" fill="#C9A84C" />
          </svg>
          <h2 className="serif text-3xl font-light text-[#FAFAF8] tracking-wide mb-1">
            Connexion
          </h2>
          <p className="label text-[0.6rem] tracking-[0.4em] uppercase text-gold">
            African Style Atelier
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="label text-[0.65rem] tracking-[0.25em] uppercase text-[#FAFAF8]/40">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="Votre nom"
              autoComplete="name"
              className="w-full bg-transparent border border-[#FAFAF8]/10 text-[#FAFAF8] text-sm px-4 py-3
                         placeholder-[#FAFAF8]/20 outline-none transition-colors duration-200
                         focus:border-gold/60 hover:border-[#FAFAF8]/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="label text-[0.65rem] tracking-[0.25em] uppercase text-[#FAFAF8]/40">
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="vous@exemple.com"
              autoComplete="email"
              className="w-full bg-transparent border border-[#FAFAF8]/10 text-[#FAFAF8] text-sm px-4 py-3
                         placeholder-[#FAFAF8]/20 outline-none transition-colors duration-200
                         focus:border-gold/60 hover:border-[#FAFAF8]/20"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 tracking-wide"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5
                       bg-gold text-[#0A0A0A] font-medium tracking-[0.25em] text-xs uppercase label
                       transition-all duration-200 hover:bg-gold/90 active:scale-[0.98]"
          >
            Entrer dans l'atelier
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 010-2h9.586L8.293 3.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>

        {/* Guest link */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-[#FAFAF8]/8" />
          <span className="text-[0.65rem] text-[#FAFAF8]/25 tracking-widest uppercase label">ou</span>
          <div className="flex-1 h-px bg-[#FAFAF8]/8" />
        </div>

        <button
          onClick={() => setScreen('splash')}
          className="mt-5 w-full text-center text-xs text-[#FAFAF8]/30 hover:text-gold/70
                     tracking-[0.2em] uppercase label transition-colors duration-200"
        >
          Continuer en tant qu'invité
        </button>
      </motion.div>

      {/* Bottom gold border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-right"
      />
    </div>
  );
}
