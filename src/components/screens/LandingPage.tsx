import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

// ─────────────────────────────────────────────────────────────────────────────
// SVG Outfit Illustrations  (pfx = unique prefix for pattern/gradient IDs)
// ─────────────────────────────────────────────────────────────────────────────

function AgbadaSVG({ pfx: _pfx = 'h' }: { pfx?: string }) {
  return <img src="/agbada.png" alt="Agbada Royal" className="w-full h-full object-contain drop-shadow-2xl"/>;
}
function GeleSVG({ pfx: _pfx = 'h' }: { pfx?: string }) {
  return <img src="/gele.png" alt="Gele et Buba" className="w-full h-full object-contain drop-shadow-2xl"/>;
}

function KaftanSVG({ pfx: _pfx = 'h' }: { pfx?: string }) {
  return <img src="/kaftan.png" alt="Kaftan Marocain" className="w-full h-full object-contain drop-shadow-2xl"/>;
}

function BoubouSVG({ pfx: _pfx = 'h' }: { pfx?: string }) {
  return <img src="/boubou.png" alt="Grand Boubou" className="w-full h-full object-contain drop-shadow-2xl"/>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pattern Preview Thumbnails (SVG, no canvas needed)
// ─────────────────────────────────────────────────────────────────────────────

const PATTERNS_PREVIEW = [
  {
    id: 'kente', name: 'Kente Royale', origin: 'Ghana', accent: '#DAA520',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#1E3A8A"/>
        <rect y="0"  width="60" height="12" fill="#DAA520"/>
        <rect y="16" width="60" height="9"  fill="#9B1C1C"/>
        <rect y="30" width="60" height="12" fill="#DAA520"/>
        <rect y="46" width="60" height="14" fill="#006400"/>
        <line x1="0"  y1="0" x2="0"  y2="60" stroke="#0A0A0A" strokeWidth="3"/>
        <line x1="20" y1="0" x2="20" y2="60" stroke="#0A0A0A" strokeWidth="1.5"/>
        <line x1="40" y1="0" x2="40" y2="60" stroke="#0A0A0A" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'wax', name: 'Wax Papillon', origin: 'Côte d\'Ivoire', accent: '#CC5500',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#CC5500"/>
        <circle cx="30" cy="30" r="12" fill="none" stroke="#F4D03F" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="6"  fill="#F4D03F"/>
        <ellipse cx="30" cy="10" rx="5" ry="9" fill="#F4D03F" opacity="0.85"/>
        <ellipse cx="30" cy="50" rx="5" ry="9" fill="#F4D03F" opacity="0.85"/>
        <ellipse cx="10" cy="30" rx="9" ry="5" fill="#F4D03F" opacity="0.85"/>
        <ellipse cx="50" cy="30" rx="9" ry="5" fill="#F4D03F" opacity="0.85"/>
      </svg>
    ),
  },
  {
    id: 'bogolan', name: 'Bogolan du Mali', origin: 'Mali', accent: '#8B4513',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#F4E1C1"/>
        <rect x="4"  y="4"  width="52" height="52" fill="none" stroke="#3B1A08" strokeWidth="2.5"/>
        <rect x="14" y="14" width="32" height="32" fill="none" stroke="#3B1A08" strokeWidth="2"/>
        <line x1="30" y1="4"  x2="30" y2="56" stroke="#3B1A08" strokeWidth="1.5"/>
        <line x1="4"  y1="30" x2="56" y2="30" stroke="#3B1A08" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="6" fill="#3B1A08"/>
        <circle cx="8"  cy="8"  r="3" fill="#3B1A08" opacity="0.5"/>
        <circle cx="52" cy="8"  r="3" fill="#3B1A08" opacity="0.5"/>
        <circle cx="8"  cy="52" r="3" fill="#3B1A08" opacity="0.5"/>
        <circle cx="52" cy="52" r="3" fill="#3B1A08" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'adire', name: 'Adire Indigo', origin: 'Nigeria', accent: '#1E3A8A',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#1E3A8A"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#DBEAFE" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="16" fill="none" stroke="#DBEAFE" strokeWidth="2"/>
        <circle cx="30" cy="30" r="8"  fill="none" stroke="#DBEAFE" strokeWidth="2"/>
        <circle cx="30" cy="30" r="2.5" fill="#DBEAFE"/>
        <circle cx="6"  cy="6"  r="5" fill="none" stroke="#DBEAFE" strokeWidth="1.5"/>
        <circle cx="54" cy="6"  r="5" fill="none" stroke="#DBEAFE" strokeWidth="1.5"/>
        <circle cx="6"  cy="54" r="5" fill="none" stroke="#DBEAFE" strokeWidth="1.5"/>
        <circle cx="54" cy="54" r="5" fill="none" stroke="#DBEAFE" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'ankara', name: 'Ankara Géométrique', origin: 'Afrique de l\'Ouest', accent: '#DC2626',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#DC2626"/>
        <circle cx="30" cy="30" r="22" fill="none" stroke="#1E40AF" strokeWidth="3"/>
        <circle cx="30" cy="30" r="12" fill="#1E40AF"/>
        <circle cx="30" cy="30" r="5"  fill="#FDE047"/>
        <rect x="0"  y="0"  width="12" height="12" fill="#FDE047" opacity="0.7"/>
        <rect x="48" y="0"  width="12" height="12" fill="#FDE047" opacity="0.7"/>
        <rect x="0"  y="48" width="12" height="12" fill="#FDE047" opacity="0.7"/>
        <rect x="48" y="48" width="12" height="12" fill="#FDE047" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: 'brocade', name: 'Brocart Doré', origin: 'Maroc', accent: '#C9A84C',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#0C0C0C"/>
        <circle cx="30" cy="30" r="26" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="16" fill="none" stroke="#C9A84C" strokeWidth="1"/>
        <circle cx="30" cy="4"  r="5.5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="30" cy="56" r="5.5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="4"  cy="30" r="5.5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="56" cy="30" r="5.5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="9"  cy="9"  r="4" fill="none" stroke="#C9A84C" strokeWidth="0.9"/>
        <circle cx="51" cy="9"  r="4" fill="none" stroke="#C9A84C" strokeWidth="0.9"/>
        <circle cx="9"  cy="51" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.9"/>
        <circle cx="51" cy="51" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.9"/>
        <circle cx="30" cy="30" r="4" fill="#C9A84C"/>
      </svg>
    ),
  },
  {
    id: 'kitenge', name: 'Kitenge Floral', origin: 'Afrique de l\'Est', accent: '#7C3AED',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#7C3AED"/>
        <circle cx="30" cy="30" r="14" fill="#F59E0B" opacity="0.85"/>
        <circle cx="30" cy="30" r="7"  fill="#FFFFFF"/>
        <circle cx="30" cy="30" r="3"  fill="#F59E0B"/>
        <circle cx="8"  cy="8"  r="6" fill="#F59E0B" opacity="0.65"/>
        <circle cx="52" cy="8"  r="6" fill="#F59E0B" opacity="0.65"/>
        <circle cx="8"  cy="52" r="6" fill="#F59E0B" opacity="0.65"/>
        <circle cx="52" cy="52" r="6" fill="#F59E0B" opacity="0.65"/>
        <circle cx="30" cy="6"  r="3" fill="#FDE047" opacity="0.7"/>
        <circle cx="30" cy="54" r="3" fill="#FDE047" opacity="0.7"/>
        <circle cx="6"  cy="30" r="3" fill="#FDE047" opacity="0.7"/>
        <circle cx="54" cy="30" r="3" fill="#FDE047" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: 'shweshwe', name: 'Shweshwe Bleu', origin: 'Afrique du Sud', accent: '#1E3A8A',
    svg: (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <rect width="60" height="60" fill="#1E3A8A"/>
        <polygon points="30,4 56,30 30,56 4,30" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <polygon points="30,14 46,30 30,46 14,30" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
        <polygon points="30,22 38,30 30,38 22,30" fill="#FFFFFF" opacity="0.3"/>
        <circle cx="30" cy="30" r="4" fill="#FFFFFF"/>
        <circle cx="4"  cy="4"  r="3" fill="#93C5FD" opacity="0.6"/>
        <circle cx="56" cy="4"  r="3" fill="#93C5FD" opacity="0.6"/>
        <circle cx="4"  cy="56" r="3" fill="#93C5FD" opacity="0.6"/>
        <circle cx="56" cy="56" r="3" fill="#93C5FD" opacity="0.6"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

type IllustrationComponent = React.ComponentType<{ pfx?: string }>;

const OUTFITS: {
  id: string; name: string; localName: string; culture: string; origin: string;
  tag: string; desc: string; lore: string; bg: string; accent: string; glow: string;
  Illustration: IllustrationComponent;
}[] = [
  {
    id: 'agbada', name: 'Agbada Royal', localName: 'Babban Riga',
    culture: 'Yoruba', origin: 'Nigeria', tag: 'Royauté',
    desc: 'Tissé d\'or et de majesté',
    lore: 'Chaque pli de l\'Agbada est une ode à la noblesse Yoruba. Le roi habille son peuple en s\'habillant lui-même.',
    bg: '#050318', accent: '#DAA520', glow: '#DAA520', Illustration: AgbadaSVG,
  },
  {
    id: 'gele', name: 'Gele & Buba', localName: 'Gẹlẹ Ìpẹlẹ',
    culture: 'Yoruba', origin: 'Nigeria', tag: 'Cérémonie',
    desc: 'Sculpture vivante de tissu',
    lore: 'Le Gele est un art en soi. Les femmes Yoruba passent des années à maîtriser l\'art du drapé. Chaque nœud raconte une histoire.',
    bg: '#150008', accent: '#FFD700', glow: '#FF4444', Illustration: GeleSVG,
  },
  {
    id: 'kaftan', name: 'Kaftan Marocain', localName: 'تقشيطة',
    culture: 'Berbère', origin: 'Maroc', tag: 'Élégance',
    desc: 'Arabesques d\'or sur brocart',
    lore: 'Les artisans fassi tissent l\'or et la soie depuis des siècles. Le Kaftan royal est le symbole du raffinement nord-africain.',
    bg: '#080808', accent: '#C9A84C', glow: '#C9A84C', Illustration: KaftanSVG,
  },
  {
    id: 'boubou', name: 'Grand Boubou', localName: 'Bubu / Boubou',
    culture: 'Mandé', origin: 'Sénégal', tag: 'Tradition',
    desc: 'Fluidité et grâce du wax',
    lore: 'Le Grand Boubou enveloppe celui qui le porte dans la dignité ancestrale. Son broderie est une signature d\'identité.',
    bg: '#011414', accent: '#FDE047', glow: '#0F766E', Illustration: BoubouSVG,
  },
];

const REGIONS = [
  {
    id: 'west', name: 'Afrique de l\'Ouest', label: 'OUEST',
    items: ['Agbada', 'Dashiki', 'Gele', 'Boubou'], accent: '#DAA520',
    cultures: 'Yoruba · Akan · Mandé · Wolof',
    desc: 'Berceau des tissus wax et du kente, où la mode est langage social.',
    bg: '#0D0A00',
  },
  {
    id: 'north', name: 'Afrique du Nord', label: 'NORD',
    items: ['Kaftan', 'Djellaba', 'Turban', 'Burnous'], accent: '#C9A84C',
    cultures: 'Berbère · Touareg · Andalou',
    desc: 'L\'artisanat fassi et les broderies en fil d\'or définissent le luxe nordafricain.',
    bg: '#050505',
  },
  {
    id: 'east', name: 'Afrique de l\'Est', label: 'EST',
    items: ['Shuka', 'Kitenge', 'Kanzu', 'Habesha'], accent: '#0F766E',
    cultures: 'Massaï · Éthiopien · Swahili',
    desc: 'Des plaines du Massaï aux hautes terres éthiopiennes, la couleur est reine.',
    bg: '#001210',
  },
  {
    id: 'south', name: 'Afrique du Sud', label: 'SUD',
    items: ['Shweshwe', 'Ndebele', 'Kanga', 'Basotho'], accent: '#1E3A8A',
    cultures: 'Zulu · Ndebele · Xhosa · Sotho',
    desc: 'Les motifs géométriques Ndebele et le bleu Shweshwe incarnent la résistance et la fierté.',
    bg: '#000814',
  },
  {
    id: 'central', name: 'Afrique Centrale', label: 'CENTRE',
    items: ['Raphia', 'Kuba', 'Bogolan', 'Pagne'], accent: '#7C3AED',
    cultures: 'Kongo · Kuba · Bamiléké',
    desc: 'Les tissus de raphia et les broderies Kuba sont parmi les textiles les plus anciens du monde.',
    bg: '#080014',
  },
  {
    id: 'diaspora', name: 'Diaspora', label: 'DIASPORA',
    items: ['Afrofuturisme', 'Ankara Modern', 'Denim Wax', 'Tie & Dye'], accent: '#DC2626',
    cultures: 'Pan-Africain · Caraïbes · Amérique',
    desc: 'La diaspora réinvente les codes ancestraux en y insufflant la modernité mondiale.',
    bg: '#0A0000',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Canvas particle system
// ─────────────────────────────────────────────────────────────────────────────

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, accentRef: React.RefObject<string>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cv = canvas as HTMLCanvasElement;
    const cx = ctx as CanvasRenderingContext2D;

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    function hexToRgb(hex: string) {
      const c = hex.replace('#', '');
      if (c.length < 6) return '200,160,60';
      return `${parseInt(c.slice(0,2),16)}, ${parseInt(c.slice(2,4),16)}, ${parseInt(c.slice(4,6),16)}`;
    }

    type P = { x:number; y:number; vx:number; vy:number; size:number; life:number; maxLife:number; maxOpacity:number; soft:boolean };

    const pts: P[] = Array.from({ length: 55 }, (_, i) => ({
      x: cv.width * (0.15 + Math.random() * 0.7),
      y: cv.height * (0.4 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.5 + Math.random() * 1.6),
      size: i < 30 ? 1 + Math.random() * 1.5 : 2.5 + Math.random() * 3,
      life: Math.random() * 200,
      maxLife: 100 + Math.random() * 180,
      maxOpacity: i < 30 ? 0.35 + Math.random() * 0.55 : 0.2 + Math.random() * 0.4,
      soft: i >= 30,
    }));

    let id: number;
    function tick() {
      cx.clearRect(0, 0, cv.width, cv.height);
      const rgb = hexToRgb(accentRef.current ?? '#DAA520');
      for (const p of pts) {
        p.life++;
        if (p.life > p.maxLife) {
          p.x = cv.width / 2 + (Math.random() - 0.5) * cv.width * 0.35;
          p.y = cv.height * 0.72 + Math.random() * cv.height * 0.25;
          p.life = 0; p.vx = (Math.random() - 0.5) * 0.5; p.vy = -(0.5 + Math.random() * 1.6);
        }
        p.x += p.vx; p.y += p.vy; p.vx += (Math.random() - 0.5) * 0.04;
        const t = p.life / p.maxLife;
        const op = t < 0.12 ? (t/0.12)*p.maxOpacity : t > 0.72 ? ((1-t)/0.28)*p.maxOpacity : p.maxOpacity;
        if (!p.soft) {
          cx.beginPath(); cx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          cx.fillStyle = `rgba(${rgb}, ${op})`; cx.fill();
        } else {
          const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size*2.2);
          g.addColorStop(0, `rgba(${rgb}, ${op})`);
          g.addColorStop(0.5, `rgba(${rgb}, ${op*0.5})`);
          g.addColorStop(1, `rgba(${rgb}, 0)`);
          cx.beginPath(); cx.arc(p.x, p.y, p.size*2.2, 0, Math.PI*2);
          cx.fillStyle = g; cx.fill();
        }
      }
      id = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable section title
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({ tag, title, accent = '#DAA520' }: { tag: string; title: string; accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 text-center"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-16 opacity-40" style={{ background: accent }}/>
        <span className="label text-[0.58rem] tracking-[0.55em] uppercase" style={{ color: accent }}>{tag}</span>
        <div className="h-px w-16 opacity-40" style={{ background: accent }}/>
      </div>
      <h2 className="serif font-light text-[#FAFAF8]" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>{title}</h2>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LandingPage — scrollable, multi-section
// ─────────────────────────────────────────────────────────────────────────────

export function LandingPage() {
  const { setScreen } = useUIStore();
  const [active, setActive] = useState(0);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const accentRef  = useRef<string>(OUTFITS[0].accent);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { accentRef.current = OUTFITS[active].accent; }, [active]);
  useParticles(canvasRef, accentRef);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % OUTFITS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const outfit = OUTFITS[active];
  const { Illustration } = outfit;

  return (
    <div
      ref={scrollRef}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#DAA52060 transparent' }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          STICKY NAVBAR
      ══════════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
           style={{ background: 'rgba(3,3,3,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 44 44" className="w-7 h-7">
            <polygon points="22,2 42,12 42,32 22,42 2,32 2,12" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <circle cx="22" cy="22" r="3.5" fill="#C9A84C"/>
          </svg>
          <div>
            <span className="serif text-lg font-light tracking-[0.22em] text-[#FAFAF8]">ASA</span>
            <div className="label text-[0.48rem] tracking-[0.4em] uppercase text-[#FAFAF8]/28 -mt-0.5">African Style Atelier</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[['tenues','Tenues'],['regions','Régions'],['motifs','Motifs']].map(([id, label]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="label text-[0.6rem] tracking-[0.3em] uppercase text-[#FAFAF8]/40 hover:text-[#C9A84C] transition-colors duration-200">
              {label}
            </button>
          ))}
        </div>

        <button onClick={() => setScreen('login')}
          className="label text-[0.6rem] tracking-[0.3em] uppercase px-5 py-2.5 border transition-all duration-300 hover:opacity-85"
          style={{ borderColor: `${outfit.accent}55`, color: outfit.accent, background: `${outfit.accent}10` }}>
          Connexion
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO (cinematic, full viewport)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>

        {/* Background atmosphere */}
        <AnimatePresence mode="wait">
          <motion.div key={`bg-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }} className="absolute inset-0"
            style={{ background: [
              `radial-gradient(ellipse 55% 70% at 50% 10%, ${outfit.glow}22, transparent 65%)`,
              `radial-gradient(ellipse 80% 55% at 50% 100%, ${outfit.bg}CC, transparent 70%)`,
              `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #030303 100%)`,
              '#030303',
            ].join(', ') }}/>
        </AnimatePresence>

        {/* Light rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ray-g" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={outfit.accent} stopOpacity="0.1"/>
                <stop offset="100%" stopColor={outfit.accent} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polygon points="350,0 650,0 580,1000 420,1000" fill="url(#ray-g)" opacity="0.5"/>
            <polygon points="460,0 540,0 520,1000 480,1000" fill={outfit.accent} fillOpacity="0.035"/>
            <polygon points="280,0 380,0 340,1000 200,1000" fill={outfit.accent} fillOpacity="0.012"/>
            <polygon points="620,0 720,0 800,1000 660,1000" fill={outfit.accent} fillOpacity="0.012"/>
          </svg>
        </div>

        {/* Particles (canvas) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"/>

        {/* Character aura */}
        <AnimatePresence mode="wait">
          <motion.div key={`aura-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ paddingBottom: '14%' }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.04, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full blur-[80px]"
              style={{ width: 340, height: 460, background: `radial-gradient(ellipse, ${outfit.glow}28, transparent 70%)` }}/>
          </motion.div>
        </AnimatePresence>

        {/* Outfit hero */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '8%', paddingTop: '2%' }}>
          <AnimatePresence mode="wait">
            <motion.div key={`hero-${active}`}
              initial={{ opacity: 0, y: 48, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -22, scale: 1.04 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '80vh', maxHeight: 620, maxWidth: 360 }}>
              <motion.div className="h-full w-full"
                animate={{ y: [0, -14, 0], scale: [1, 1.012, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
                <motion.div className="h-full w-full"
                  animate={{ filter: [
                    `drop-shadow(0 0 28px ${outfit.glow}45) drop-shadow(0 16px 40px #000000AA)`,
                    `drop-shadow(0 0 52px ${outfit.glow}70) drop-shadow(0 16px 40px #000000AA)`,
                    `drop-shadow(0 0 28px ${outfit.glow}45) drop-shadow(0 16px 40px #000000AA)`,
                  ]}} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <Illustration pfx="hero"/>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ground fog */}
        <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
             style={{ background: 'linear-gradient(to top, #030303 20%, transparent)' }}/>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 75% 95% at 50% 50%, transparent 30%, #030303CC 100%)' }}/>

        {/* Hextech accent bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.svg key={`hex-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }} width="320" height="24">
              <line x1="0" y1="12" x2="112" y2="12" stroke={outfit.accent} strokeWidth="1" strokeOpacity="0.3"/>
              <polygon points="140,3 148,12 140,21 132,12" fill="none" stroke={outfit.accent} strokeWidth="1" strokeOpacity="0.6"/>
              <polygon points="160,3 168,12 160,21 152,12" fill={outfit.accent} fillOpacity="0.35"/>
              <polygon points="180,3 188,12 180,21 172,12" fill="none" stroke={outfit.accent} strokeWidth="1" strokeOpacity="0.6"/>
              <line x1="208" y1="12" x2="320" y2="12" stroke={outfit.accent} strokeWidth="1" strokeOpacity="0.3"/>
            </motion.svg>
          </AnimatePresence>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-8">
          <div className="flex items-end justify-between gap-8">
            <AnimatePresence mode="wait">
              <motion.div key={`inf-${active}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="max-w-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rotate-45 border" style={{ borderColor: outfit.accent }}/>
                  <span className="label text-[0.56rem] tracking-[0.55em] uppercase" style={{ color: outfit.accent }}>
                    {outfit.tag} · {outfit.culture} · {outfit.origin}
                  </span>
                </div>
                <h2 className="serif font-light text-[#FAFAF8] leading-none mb-1"
                    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', textShadow: `0 0 40px ${outfit.glow}50` }}>
                  {outfit.name}
                </h2>
                <p className="label text-[0.6rem] tracking-[0.42em] uppercase mb-3" style={{ color: `${outfit.accent}80` }}>
                  {outfit.localName}
                </p>
                <motion.div key={`ln-${active}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.18 }} className="h-px w-44 mb-3 origin-left"
                  style={{ background: `linear-gradient(90deg, ${outfit.accent}, ${outfit.accent}00)` }}/>
                <p className="serif italic text-sm text-[#FAFAF8]/38 leading-relaxed max-w-sm">"{outfit.desc}"</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col items-end gap-4 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {OUTFITS.map((o, i) => (
                  <button key={o.id} onClick={() => setActive(i)} className="transition-all duration-300 h-[3px] rounded-full"
                    style={{ width: i === active ? 36 : 10, background: outfit.accent, opacity: i === active ? 1 : 0.22 }}/>
                ))}
              </div>
              <div className="flex flex-col gap-2.5 w-48">
                <button onClick={() => setScreen('login')}
                  className="w-full label text-xs tracking-[0.28em] uppercase py-3.5 font-medium transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ background: outfit.accent, color: '#030303' }}>
                  Créer mon avatar
                </button>
                <button onClick={() => setScreen('splash')}
                  className="w-full label text-[0.62rem] tracking-[0.28em] uppercase py-3 border transition-all hover:opacity-80"
                  style={{ borderColor: `${outfit.accent}35`, color: `${outfit.accent}70` }}>
                  Explorer sans compte
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="label text-[0.5rem] tracking-[0.4em] uppercase text-[#FAFAF8]/30">Découvrir</span>
          <svg viewBox="0 0 16 24" className="w-4 h-6 text-[#FAFAF8]/25" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7"/>
            <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/>
          </svg>
        </motion.div>

        {/* Gold borders */}
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
             style={{ background: `linear-gradient(90deg, transparent, ${outfit.accent}AA, ${outfit.accent}, ${outfit.accent}AA, transparent)` }}/>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
             style={{ background: `linear-gradient(90deg, transparent, ${outfit.accent}55, ${outfit.accent}AA, ${outfit.accent}55, transparent)` }}/>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — MANIFESTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-28 px-8 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#050505' }}>
        {/* Large decorative text behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="serif font-light select-none"
                style={{ fontSize: '32vw', color: '#FFFFFF', opacity: 0.018, lineHeight: 1 }}>ASA</span>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="text-center mb-20">
            <p className="label text-[0.58rem] tracking-[0.55em] uppercase text-[#C9A84C] mb-6">Notre Héritage</p>
            <h2 className="serif font-light text-[#FAFAF8] mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              De Dakar à Lagos,<br/><span className="text-[#C9A84C]">l'Afrique s'habille.</span>
            </h2>
            <p className="text-[#FAFAF8]/45 max-w-xl mx-auto leading-relaxed text-sm">
              ASA rassemble la richesse de 6 régions africaines dans un atelier 3D unique.
              Chaque tenue est une histoire. Chaque motif, une mémoire vivante.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '41', unit: 'pièces', desc: 'Des dashikis aux kaftans, des pagnes aux agbadas — tout le vestiaire africain.', accent: '#DAA520' },
              { n: '6',  unit: 'régions', desc: 'Afrique de l\'Ouest, du Nord, de l\'Est, du Sud, Centrale et Diaspora.', accent: '#0F766E' },
              { n: '12', unit: 'motifs', desc: 'Kente, Wax, Bogolan, Adire, Ankara, Shweshwe, Kitenge et plus encore.', accent: '#7C3AED' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center p-8 border border-[#FAFAF8]/06 hover:border-[#C9A84C]/30 transition-colors duration-300"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="serif font-light mb-1" style={{ fontSize: '4.5rem', color: s.accent, lineHeight: 1 }}>{s.n}</div>
                <div className="label text-[0.6rem] tracking-[0.45em] uppercase mb-4" style={{ color: s.accent }}>{s.unit}</div>
                <div className="h-px w-12 mx-auto mb-4" style={{ background: s.accent, opacity: 0.4 }}/>
                <p className="text-[#FAFAF8]/35 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-20 max-w-2xl mx-auto">
            <p className="serif italic text-[#FAFAF8]/50 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>
              "La mode africaine n'est pas une tendance. C'est une civilisation qui respire."
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-12 bg-[#C9A84C]/40"/>
              <span className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#C9A84C]/60">ASA · African Style Atelier</span>
              <div className="h-px w-12 bg-[#C9A84C]/40"/>
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — LES TENUES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="tenues" className="relative w-full py-28 px-8 md:px-16 lg:px-24" style={{ background: '#030303' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="Les Tenues Iconiques" title="Quatre Silhouettes Royales"/>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTFITS.map((o, i) => {
              const Ill = o.Illustration;
              return (
                <motion.div key={o.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden cursor-pointer border border-[#FAFAF8]/06 hover:border-opacity-60 transition-all duration-500"
                  style={{ borderColor: `${o.accent}20`, background: o.bg }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${o.accent}60`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${o.accent}20`)}>

                  {/* Background glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                       style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${o.glow}18, transparent 70%)` }}/>

                  {/* Outfit illustration */}
                  <div className="relative h-72 flex items-end justify-center pt-6 px-4">
                    <motion.div className="h-full w-auto" whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.4 }}
                      style={{ filter: `drop-shadow(0 8px 24px ${o.glow}40)` }}>
                      <Ill pfx={`c${i}`}/>
                    </motion.div>
                  </div>

                  {/* Info strip */}
                  <div className="px-5 py-5 border-t" style={{ borderColor: `${o.accent}20` }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2.5 h-2.5 rotate-45" style={{ background: o.accent, opacity: 0.7 }}/>
                      <span className="label text-[0.55rem] tracking-[0.4em] uppercase" style={{ color: o.accent }}>{o.tag}</span>
                    </div>
                    <h3 className="serif text-lg font-light text-[#FAFAF8] mb-0.5">{o.name}</h3>
                    <p className="label text-[0.55rem] tracking-[0.3em] uppercase text-[#FAFAF8]/30 mb-3">
                      {o.culture} · {o.origin}
                    </p>
                    <p className="text-xs text-[#FAFAF8]/35 leading-relaxed">{o.lore}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — LES RÉGIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="regions" className="relative w-full py-28 px-8 md:px-16 lg:px-24" style={{ background: '#060606' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="6 Régions d'Afrique" title="Un Continent, Mille Styles"/>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((r, i) => (
              <motion.div key={r.id}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-7 border cursor-default overflow-hidden transition-all duration-400"
                style={{ background: r.bg, borderColor: `${r.accent}22` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${r.accent}55`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${r.accent}22`)}>

                <div className="absolute top-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ width: 120, height: 120, background: `radial-gradient(circle, ${r.accent}15, transparent 70%)` }}/>

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="label text-[0.52rem] tracking-[0.5em] uppercase" style={{ color: r.accent }}>{r.label}</span>
                    <h3 className="serif text-xl font-light text-[#FAFAF8] mt-1">{r.name}</h3>
                  </div>
                  <div className="w-6 h-6 rotate-45 border mt-1 flex-shrink-0" style={{ borderColor: `${r.accent}60` }}/>
                </div>

                <p className="label text-[0.55rem] tracking-[0.25em] uppercase mb-4" style={{ color: `${r.accent}80` }}>
                  {r.cultures}
                </p>
                <p className="text-xs text-[#FAFAF8]/35 leading-relaxed mb-5">{r.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {r.items.map(item => (
                    <span key={item} className="label text-[0.52rem] tracking-[0.2em] uppercase px-2.5 py-1"
                          style={{ background: `${r.accent}14`, color: `${r.accent}BB`, border: `1px solid ${r.accent}22` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — LES MOTIFS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="motifs" className="relative w-full py-28 px-8 md:px-16 lg:px-24" style={{ background: '#040404' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle tag="Tissus & Motifs Sacrés" title="12 Langages du Tissu"/>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PATTERNS_PREVIEW.map((pat, i) => (
              <motion.div key={pat.id}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group cursor-default overflow-hidden border border-[#FAFAF8]/06 hover:border-opacity-60 transition-all duration-300"
                style={{ borderColor: `${pat.accent}20` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${pat.accent}55`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${pat.accent}20`)}>

                {/* Pattern preview */}
                <div className="aspect-square overflow-hidden">
                  <motion.div className="w-full h-full"
                    whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }}>
                    {pat.svg}
                  </motion.div>
                </div>

                {/* Label */}
                <div className="px-3 py-3" style={{ background: '#0A0A0A' }}>
                  <p className="label text-[0.6rem] tracking-[0.2em] uppercase text-[#FAFAF8]/70 mb-0.5">{pat.name}</p>
                  <p className="text-[0.58rem] text-[#FAFAF8]/28 tracking-wide">{pat.origin}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — CTA FINAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-8 overflow-hidden" style={{ background: '#030303' }}>
        {/* Background radial */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #C9A84C12, transparent 70%)' }}/>
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, transparent)' }}/>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto text-center">

          {/* Logo */}
          <svg viewBox="0 0 60 60" className="w-14 h-14 mx-auto mb-8">
            <polygon points="30,2 58,16 58,44 30,58 2,44 2,16" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <polygon points="30,10 50,21 50,39 30,50 10,39 10,21" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
            <circle cx="30" cy="30" r="6" fill="#C9A84C"/>
          </svg>

          <p className="label text-[0.58rem] tracking-[0.55em] uppercase text-[#C9A84C] mb-5">
            Commencez votre voyage
          </p>

          <h2 className="serif font-light text-[#FAFAF8] mb-6 leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Créez votre avatar<br/><span className="text-[#C9A84C]">africain haute couture.</span>
          </h2>

          <p className="text-[#FAFAF8]/40 max-w-md mx-auto text-sm leading-relaxed mb-12">
            Rejoignez l'atelier. Choisissez vos tenues, vos motifs, votre identité.
            Votre avatar vous attend.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setScreen('login')}
              className="label text-xs tracking-[0.3em] uppercase px-10 py-4 font-medium transition-all"
              style={{ background: '#C9A84C', color: '#030303' }}>
              Créer mon avatar
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setScreen('splash')}
              className="label text-xs tracking-[0.3em] uppercase px-10 py-4 border transition-all"
              style={{ borderColor: '#C9A84C44', color: '#C9A84C88' }}>
              Explorer sans compte
            </motion.button>
          </div>

          {/* Stats footer */}
          <div className="flex items-center justify-center gap-8 mt-16 pt-10 border-t border-[#FAFAF8]/06">
            {[['41','Pièces'],['5','Collections'],['12','Motifs'],['6','Régions']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="serif text-2xl font-light text-[#C9A84C]">{n}</div>
                <div className="label text-[0.52rem] tracking-[0.35em] uppercase text-[#FAFAF8]/25 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#020202', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Logo + tagline */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <polygon points="16,2 30,9 30,23 16,30 2,23 2,9"/>
                  <circle cx="16" cy="16" r="3" fill="currentColor"/>
                </svg>
                <span className="serif text-xl font-light text-[#FAFAF8] tracking-wide">ASA</span>
              </div>
              <p className="text-[#FAFAF8]/30 text-xs leading-relaxed mb-5">
                African Style Atelier — l'atelier 3D de la mode africaine contemporaine.
              </p>
              <div className="flex gap-3">
                {['IG','TW','YT'].map(s => (
                  <div key={s} className="w-8 h-8 flex items-center justify-center border border-[#FAFAF8]/08
                                          label text-[0.5rem] tracking-wider text-[#FAFAF8]/25
                                          hover:border-[#C9A84C]/30 hover:text-[#C9A84C]/60 transition-all cursor-pointer">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Explorer */}
            <div>
              <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Explorer</p>
              {[
                { label: 'Les Tenues', anchor: '#tenues' },
                { label: 'Les Régions', anchor: '#regions' },
                { label: 'Les Motifs', anchor: '#motifs' },
              ].map(link => (
                <button key={link.label}
                  onClick={() => document.querySelector(link.anchor)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-[#FAFAF8]/35 text-xs hover:text-[#C9A84C]/70 transition-colors mb-2.5">
                  {link.label}
                </button>
              ))}
            </div>

            {/* Communauté */}
            <div>
              <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Communauté</p>
              {[
                { label: 'Galerie des créations', screen: 'community' as const },
                { label: 'Compétition du mois', screen: 'community' as const },
                { label: 'Classement', screen: 'community' as const },
              ].map(link => (
                <button key={link.label}
                  onClick={() => setScreen(link.screen)}
                  className="block text-[#FAFAF8]/35 text-xs hover:text-[#C9A84C]/70 transition-colors mb-2.5 text-left">
                  {link.label}
                </button>
              ))}
            </div>

            {/* Atelier */}
            <div>
              <p className="label text-[0.55rem] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Atelier</p>
              {[
                { label: 'Créer mon avatar', screen: 'login' as const },
                { label: 'Continuer en invité', screen: 'splash' as const },
              ].map(link => (
                <button key={link.label}
                  onClick={() => setScreen(link.screen)}
                  className="block text-[#FAFAF8]/35 text-xs hover:text-[#C9A84C]/70 transition-colors mb-2.5 text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#FAFAF8]/05">
            <p className="label text-[0.52rem] tracking-[0.3em] uppercase text-[#FAFAF8]/18">
              © 2026 African Style Atelier — Tous droits réservés
            </p>
            <div className="flex gap-6">
              {['Confidentialité', 'Conditions', 'Contact'].map(l => (
                <span key={l} className="label text-[0.52rem] tracking-[0.2em] uppercase text-[#FAFAF8]/18
                                          hover:text-[#C9A84C]/40 transition-colors cursor-pointer">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
