import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { useCommunityStore, type PublishedLook } from '../../store/communityStore';

type Tab = 'galerie' | 'competition' | 'classement';

function StarRating({ look }: { look: PublishedLook }) {
  const rate = useCommunityStore(s => s.rate);
  const [hover, setHover] = useState(0);
  const voted = look.userVote > 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          disabled={voted}
          onClick={() => rate(look.id, star)}
          onMouseEnter={() => !voted && setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110 disabled:cursor-default"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M8 1l1.854 3.757L14 5.528l-3 2.924.708 4.13L8 10.5l-3.708 2.082L5 8.452 2 5.528l4.146-.771z"
              style={{
                color: star <= (hover || look.userVote || look.rating)
                  ? '#C9A84C' : '#FAFAF8',
                opacity: star <= (hover || look.userVote || look.rating) ? 1 : 0.15,
              }}
            />
          </svg>
        </button>
      ))}
      <span className="text-[0.58rem] text-[#FAFAF8]/35 ml-1">
        {look.rating > 0 ? `${look.rating} (${look.votes})` : '—'}
      </span>
    </div>
  );
}

function LookCard({ look, rank }: { look: PublishedLook; rank?: number }) {
  const GENDER_ICON = look.config.gender === 'female' ? '♀' : '♂';
  const ago = (() => {
    const d = Math.floor((Date.now() - new Date(look.createdAt).getTime()) / 86400000);
    return d === 0 ? 'Aujourd\'hui' : `Il y a ${d}j`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group border border-[#FAFAF8]/06 hover:border-[#C9A84C]/30
                 transition-all duration-300 overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {rank && rank <= 3 && (
        <div className="absolute top-3 left-3 z-10 w-7 h-7 flex items-center justify-center"
          style={{ background: rank === 1 ? '#DAA520' : rank === 2 ? '#A8A8A8' : '#CD7F32' }}>
          <span className="text-[#0A0A0A] font-bold text-xs">{rank}</span>
        </div>
      )}

      {/* Avatar placeholder */}
      <div className="h-40 flex items-center justify-center relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #111 0%, #1a1408 100%)' }}>
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl serif font-light"
             style={{ background: '#C9A84C22', border: '1px solid #C9A84C44', color: '#C9A84C' }}>
          {look.avatar}
        </div>
        <div className="absolute bottom-2 right-2 text-[0.5rem] label tracking-widest uppercase text-[#FAFAF8]/30">
          {GENDER_ICON} {look.config.gender === 'female' ? 'Féminin' : 'Masculin'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="serif text-base font-light text-[#FAFAF8] mb-0.5 truncate">{look.lookName}</h3>
        <p className="text-[0.6rem] text-[#FAFAF8]/35 label tracking-wide mb-3">
          {look.userName} · {ago}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {look.tags.slice(0, 3).map(t => (
            <span key={t} className="label text-[0.5rem] tracking-[0.2em] uppercase px-2 py-0.5
                                     border border-[#C9A84C]/20 text-[#C9A84C]/60">
              {t}
            </span>
          ))}
        </div>

        <StarRating look={look} />
      </div>
    </motion.div>
  );
}

export function CommunityScreen() {
  const { setScreen, currentUser } = useUIStore();
  const { looks, competition }     = useCommunityStore();
  const [tab, setTab]              = useState<Tab>('galerie');
  const [search, setSearch]        = useState('');

  const sorted   = [...looks].sort((a, b) => b.rating - a.rating || b.votes - a.votes);
  const filtered = sorted.filter(l =>
    !search ||
    l.lookName.toLowerCase().includes(search.toLowerCase()) ||
    l.userName.toLowerCase().includes(search.toLowerCase()) ||
    l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const TABS: { id: Tab; label: string }[] = [
    { id: 'galerie',     label: 'Galerie'      },
    { id: 'competition', label: 'Compétition'  },
    { id: 'classement',  label: 'Classement'   },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#060606] overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#FAFAF8]/06 flex-shrink-0">
        <button onClick={() => setScreen('landing')}
          className="flex items-center gap-2 text-[#FAFAF8]/50 hover:text-[#C9A84C] transition-colors">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 13.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 7H14a1 1 0 010 2H4.414l3.293 3.293a1 1 0 010 1.414z"/>
          </svg>
          <span className="label text-[0.6rem] tracking-[0.2em] uppercase">Accueil</span>
        </button>

        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polygon points="16,2 30,9 30,23 16,30 2,23 2,9"/>
            <circle cx="16" cy="16" r="3" fill="currentColor"/>
          </svg>
          <span className="serif text-lg font-light text-[#FAFAF8] tracking-wide">Communauté ASA</span>
        </div>

        <button onClick={() => setScreen('editor')}
          className="label text-[0.6rem] tracking-[0.2em] uppercase px-4 py-2 border border-[#C9A84C]/40
                     text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all">
          Mon Atelier
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#FAFAF8]/06 flex-shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-4 label text-[0.65rem] tracking-[0.25em] uppercase transition-all
              ${tab === t.id
                ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                : 'text-[#FAFAF8]/35 hover:text-[#FAFAF8]/60'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ─── GALERIE ─── */}
          {tab === 'galerie' && (
            <motion.div key="galerie"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-6 max-w-6xl mx-auto">

              {/* Search */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 relative">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAFAF8]/25" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                  </svg>
                  <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher un look, créateur, style..."
                    className="w-full bg-[#111] border border-[#FAFAF8]/08 text-[#FAFAF8] text-xs
                               pl-10 pr-4 py-3 outline-none focus:border-[#C9A84C]/40
                               placeholder-[#FAFAF8]/20 transition-colors"
                  />
                </div>
                <div className="text-[0.58rem] text-[#FAFAF8]/25 label tracking-widest whitespace-nowrap">
                  {filtered.length} création{filtered.length > 1 ? 's' : ''}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((look, i) => (
                  <LookCard key={look.id} look={look} rank={i + 1}/>
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-4 text-center py-20 text-[#FAFAF8]/20 serif text-xl font-light">
                    Aucune création trouvée.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── COMPÉTITION ─── */}
          {tab === 'competition' && (
            <motion.div key="competition"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-6 max-w-4xl mx-auto">

              {/* Banner */}
              <div className="relative overflow-hidden mb-10 p-10 border border-[#C9A84C]/20"
                   style={{ background: 'linear-gradient(135deg, #0D0A00, #1a1408)' }}>
                <div className="absolute inset-0 opacity-5"
                     style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                     style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}/>

                <p className="label text-[0.58rem] tracking-[0.5em] uppercase text-[#C9A84C] mb-3">
                  {competition.subtitle}
                </p>
                <h2 className="serif font-light text-[#FAFAF8] mb-4"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                  {competition.title}
                </h2>
                <p className="text-[#FAFAF8]/45 text-sm leading-relaxed max-w-xl mb-8">
                  {competition.theme}
                </p>

                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#FAFAF8]/30 mb-1">Date limite</p>
                    <p className="serif text-[#C9A84C] text-lg">{competition.deadline}</p>
                  </div>
                  <div>
                    <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#FAFAF8]/30 mb-1">Participants</p>
                    <p className="serif text-[#C9A84C] text-lg">{competition.entries}</p>
                  </div>
                  <div className="flex-1">
                    <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#FAFAF8]/30 mb-1">Récompense</p>
                    <p className="text-[#FAFAF8]/60 text-xs leading-relaxed">{competition.prize}</p>
                  </div>
                </div>

                <button onClick={() => setScreen('editor')}
                  className="mt-8 label text-xs tracking-[0.3em] uppercase px-8 py-4 font-medium
                             transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ background: '#C9A84C', color: '#030303' }}>
                  Participer maintenant
                </button>
              </div>

              {/* Top 3 */}
              <h3 className="serif text-xl font-light text-[#FAFAF8] mb-6">
                Top du défi <span className="text-[#C9A84C]">ce mois-ci</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {sorted.slice(0, 3).map((look, i) => (
                  <LookCard key={look.id} look={look} rank={i + 1}/>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── CLASSEMENT ─── */}
          {tab === 'classement' && (
            <motion.div key="classement"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-6 max-w-3xl mx-auto">

              <h2 className="serif text-2xl font-light text-[#FAFAF8] mb-8">
                Meilleurs <span className="text-[#C9A84C]">créateurs</span>
              </h2>

              <div className="flex flex-col gap-3">
                {sorted.map((look, i) => (
                  <motion.div key={look.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-5 p-5 border border-[#FAFAF8]/05
                               hover:border-[#C9A84C]/20 transition-all"
                    style={{ background: i < 3 ? '#0D0A00' : '#0A0A0A' }}>

                    {/* Rank */}
                    <div className="w-8 text-center flex-shrink-0">
                      {i < 3 ? (
                        <span className="serif text-xl font-light"
                              style={{ color: i === 0 ? '#DAA520' : i === 1 ? '#A8A8A8' : '#CD7F32' }}>
                          {i + 1}
                        </span>
                      ) : (
                        <span className="label text-xs text-[#FAFAF8]/20">{i + 1}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center
                                    serif text-sm font-light flex-shrink-0"
                         style={{ background: '#C9A84C22', border: '1px solid #C9A84C33', color: '#C9A84C' }}>
                      {look.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#FAFAF8]/85 text-sm truncate">{look.userName}</p>
                      <p className="text-[#FAFAF8]/30 text-xs truncate serif italic">{look.lookName}</p>
                    </div>

                    {/* Tags */}
                    <div className="hidden sm:flex gap-1">
                      {look.tags.slice(0, 2).map(t => (
                        <span key={t} className="label text-[0.48rem] tracking-[0.15em] uppercase
                                                  px-2 py-0.5 border border-[#C9A84C]/15 text-[#C9A84C]/50">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#C9A84C]" fill="currentColor">
                        <path d="M8 1l1.854 3.757L14 5.528l-3 2.924.708 4.13L8 10.5l-3.708 2.082L5 8.452 2 5.528l4.146-.771z"/>
                      </svg>
                      <span className="text-[#C9A84C] text-sm serif">{look.rating || '—'}</span>
                      <span className="text-[#FAFAF8]/20 text-xs">({look.votes})</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
