import type { Pattern } from '../types';
import * as THREE from 'three';

// ── Pattern definitions ───────────────────────────────────────
export const PATTERNS: Pattern[] = [
  {
    id: 'wax-papillon', name: 'Wax Papillon', type: 'wax', origin: 'Côte d\'Ivoire',
    primary: '#CC5500', secondary: '#F4D03F', accent: '#FFFFFF',
  },
  {
    id: 'kente-royale', name: 'Kente Royale', type: 'kente', origin: 'Ghana — Tissu Kente Ashanti',
    primary: '#DAA520', secondary: '#006400', accent: '#CC0000',
  },
  {
    id: 'bogolan-mali', name: 'Bogolan du Mali', type: 'bogolan', origin: 'Mali — Mud Cloth',
    primary: '#F4E1C1', secondary: '#3B1A08', accent: '#8B4513',
  },
  {
    id: 'adire-indigo', name: 'Adire Indigo', type: 'adire', origin: 'Nigeria — Tie-dye Yoruba',
    primary: '#1E3A8A', secondary: '#DBEAFE', accent: '#60A5FA',
  },
  {
    id: 'ankara-geo', name: 'Ankara Géométrique', type: 'wax', origin: 'Afrique de l\'Ouest',
    primary: '#DC2626', secondary: '#1E40AF', accent: '#FDE047',
  },
  {
    id: 'kitenge-floral', name: 'Kitenge Floral', type: 'kitenge', origin: 'Afrique de l\'Est',
    primary: '#7C3AED', secondary: '#F59E0B', accent: '#FFFFFF',
  },
  {
    id: 'shweshwe-blue', name: 'Shweshwe Bleu', type: 'shweshwe', origin: 'Afrique du Sud',
    primary: '#1E3A8A', secondary: '#FFFFFF', accent: '#93C5FD',
  },
  {
    id: 'wax-cercles', name: 'Wax Cercles', type: 'wax', origin: 'Sénégal',
    primary: '#0F766E', secondary: '#FDE047', accent: '#FFFFFF',
  },
  {
    id: 'modern-afro', name: 'Afrofuturisme', type: 'modern', origin: 'Diaspora Africaine',
    primary: '#0A0A0A', secondary: '#C9A84C', accent: '#6D28D9',
  },
  {
    id: 'brocade-or', name: 'Brocart Doré', type: 'brocade', origin: 'Maroc — Artisanat Fassi',
    primary: '#1C1C1C', secondary: '#C9A84C', accent: '#E8C86A',
  },
  {
    id: 'ankara-fleurs', name: 'Ankara Fleuri', type: 'wax', origin: 'Nigeria',
    primary: '#EC4899', secondary: '#1D4ED8', accent: '#FDE047',
  },
  {
    id: 'solid-blanc', name: 'Lin Blanc', type: 'solid', origin: 'Universel',
    primary: '#F8F8F5', secondary: '#E8E4DC', accent: '#FFFFFF',
  },
  {
    id: 'solid-noir', name: 'Velours Noir', type: 'solid', origin: 'Universel',
    primary: '#1A1A1A', secondary: '#2A2A2A', accent: '#3A3A3A',
  },
  {
    id: 'solid-creme', name: 'Soie Crème', type: 'solid', origin: 'Universel',
    primary: '#F5E6C8', secondary: '#E8D4A8', accent: '#DEC898',
  },
];

export const getPatternById = (id: string) => PATTERNS.find(p => p.id === id) ?? PATTERNS[0];

// ── Canvas Texture Generator ──────────────────────────────────
class TextureManager {
  private cache = new Map<string, THREE.CanvasTexture>();

  generate(patternId: string, overrideColor?: string): THREE.CanvasTexture {
    const pattern = getPatternById(patternId);
    const key = `${patternId}-${overrideColor ?? 'default'}`;

    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const primary   = overrideColor ?? pattern.primary;
    const secondary = pattern.secondary;
    const accent    = pattern.accent;

    switch (pattern.type) {
      case 'kente':    this.drawKente(ctx, primary, secondary, accent); break;
      case 'bogolan':  this.drawBogolan(ctx, primary, secondary, accent); break;
      case 'adire':    this.drawAdire(ctx, primary, secondary); break;
      case 'shweshwe': this.drawShweshwe(ctx, primary, secondary); break;
      case 'brocade':  this.drawBrocade(ctx, primary, secondary, accent); break;
      case 'solid':    this.drawSolid(ctx, primary); break;
      case 'modern':   this.drawModern(ctx, primary, secondary, accent); break;
      default:         this.drawWax(ctx, pattern.id, primary, secondary, accent); break;
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.needsUpdate = true;
    this.cache.set(key, texture);
    return texture;
  }

  private drawSolid(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 512);
    // Subtle fabric weave
    ctx.strokeStyle = this.adjustAlpha(color, -15);
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 4) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
    }
  }

  private drawKente(ctx: CanvasRenderingContext2D, p: string, s: string, a: string) {
    const W = 512;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    // Horizontal stripes with geometric fills
    const stripeH = 32;
    const colors = [p, s, a, s, p, a];
    for (let row = 0; row < W / stripeH; row++) {
      const y = row * stripeH;
      const col = colors[row % colors.length];
      ctx.fillStyle = col;
      ctx.fillRect(0, y, W, stripeH);
      // Geometric insets
      if (row % 2 === 0) {
        for (let x = 0; x < W; x += stripeH) {
          ctx.fillStyle = colors[(row + 2) % colors.length];
          ctx.fillRect(x + 4, y + 4, stripeH - 8, stripeH - 8);
          ctx.fillStyle = col;
          ctx.fillRect(x + 10, y + 10, stripeH - 20, stripeH - 20);
        }
      }
    }
    // Vertical black lines
    ctx.strokeStyle = '#1C1917';
    ctx.lineWidth = 2;
    for (let x = 0; x < W; x += stripeH) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, W); ctx.stroke();
    }
  }

  private drawBogolan(ctx: CanvasRenderingContext2D, p: string, s: string, _a: string) {
    const W = 512; const T = 64;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    ctx.strokeStyle = s;
    ctx.lineWidth = 3;
    for (let x = 0; x < W; x += T) {
      for (let y = 0; y < W; y += T) {
        // Mud cloth geometric squares
        ctx.strokeRect(x + 4, y + 4, T - 8, T - 8);
        ctx.strokeRect(x + 14, y + 14, T - 28, T - 28);
        // Cross in center
        ctx.beginPath();
        ctx.moveTo(x + T / 2, y + 6); ctx.lineTo(x + T / 2, y + T - 6);
        ctx.moveTo(x + 6, y + T / 2); ctx.lineTo(x + T - 6, y + T / 2);
        ctx.stroke();
      }
    }
  }

  private drawAdire(ctx: CanvasRenderingContext2D, p: string, s: string) {
    const W = 512;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    // Tie-dye circles
    for (let cx = 40; cx < W; cx += 80) {
      for (let cy = 40; cy < W; cy += 80) {
        const offset = ((cx + cy) / 80 % 2 === 0) ? 40 : 0;
        const rx = cx + (cy % 160 === 40 ? 40 : 0);
        for (let r = 30; r > 2; r -= 6) {
          ctx.beginPath();
          ctx.arc(rx, cy + offset, r, 0, Math.PI * 2);
          ctx.strokeStyle = r % 12 === 0 ? s : this.adjustAlpha(s, -30);
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      }
    }
  }

  private drawShweshwe(ctx: CanvasRenderingContext2D, p: string, s: string) {
    const W = 512; const T = 32;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    ctx.strokeStyle = s;
    ctx.lineWidth = 1;
    // Geometric small diamonds
    for (let x = 0; x < W; x += T) {
      for (let y = 0; y < W; y += T) {
        const cx = x + T / 2, cy = y + T / 2;
        const d = T / 2 - 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy - d);
        ctx.lineTo(cx + d, cy);
        ctx.lineTo(cx, cy + d);
        ctx.lineTo(cx - d, cy);
        ctx.closePath();
        ctx.stroke();
        // Dot in center
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = s;
        ctx.fill();
      }
    }
    // Horizontal dash lines
    ctx.setLineDash([4, 4]);
    for (let y = 8; y < W; y += T) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  private drawBrocade(ctx: CanvasRenderingContext2D, p: string, s: string, a: string) {
    const W = 512;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    // Gold arabesque-like pattern
    for (let x = 0; x < W; x += 64) {
      for (let y = 0; y < W; y += 64) {
        const cx = x + 32, cy = y + 32;
        // Outer circle
        ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.strokeStyle = s; ctx.lineWidth = 2; ctx.stroke();
        // Inner flower
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * 14, cy + Math.sin(angle) * 14, 8, 0, Math.PI * 2);
          ctx.strokeStyle = a; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = s; ctx.fill();
      }
    }
  }

  private drawModern(ctx: CanvasRenderingContext2D, p: string, s: string, a: string) {
    const W = 512;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);
    // Abstract geometric shapes
    const shapes = 12;
    for (let i = 0; i < shapes; i++) {
      const x = (i % 4) * 128 + 64;
      const y = Math.floor(i / 4) * 128 + 64;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((i * Math.PI) / 6);
      // Diamond
      ctx.beginPath();
      ctx.moveTo(0, -45); ctx.lineTo(45, 0); ctx.lineTo(0, 45); ctx.lineTo(-45, 0);
      ctx.closePath();
      ctx.strokeStyle = i % 3 === 0 ? s : i % 3 === 1 ? a : s;
      ctx.lineWidth = 2;
      ctx.stroke();
      // Inner
      ctx.beginPath();
      ctx.moveTo(0, -25); ctx.lineTo(25, 0); ctx.lineTo(0, 25); ctx.lineTo(-25, 0);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? this.adjustAlpha(s, -50) : this.adjustAlpha(a, -50);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawWax(ctx: CanvasRenderingContext2D, id: string, p: string, s: string, a: string) {
    const W = 512;
    ctx.fillStyle = p;
    ctx.fillRect(0, 0, W, W);

    if (id.includes('papillon') || id.includes('fleurs') || id.includes('floral')) {
      // Floral/butterfly pattern
      for (let x = 0; x < W; x += 80) {
        for (let y = 0; y < W; y += 80) {
          const cx = x + 40 + (y % 160 === 0 ? 40 : 0);
          const cy = y + 40;
          // Petals
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(cx + Math.cos(angle) * 18, cy + Math.sin(angle) * 18, 12, 8, angle, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? s : a;
            ctx.fill();
          }
          ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          ctx.fillStyle = a; ctx.fill();
        }
      }
    } else if (id.includes('cercles') || id.includes('geo') || id.includes('ankara')) {
      // Geometric circles
      for (let x = 0; x < W; x += 64) {
        for (let y = 0; y < W; y += 64) {
          const cx = x + 32 + (y % 128 === 64 ? 32 : 0);
          const cy = y + 32;
          ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2);
          ctx.strokeStyle = s; ctx.lineWidth = 3; ctx.stroke();
          ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
          ctx.fillStyle = s; ctx.fill();
          ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fillStyle = a; ctx.fill();
          // Squares at corners
          ctx.strokeStyle = a; ctx.lineWidth = 2;
          ctx.strokeRect(x, y, 10, 10);
          ctx.strokeRect(x + 54, y, 10, 10);
        }
      }
    } else {
      // Generic wax: repeating diamond + dot pattern
      const T = 48;
      ctx.strokeStyle = s; ctx.lineWidth = 2;
      for (let x = 0; x < W; x += T) {
        for (let y = 0; y < W; y += T) {
          const cx = x + T / 2, cy = y + T / 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy - 18); ctx.lineTo(cx + 18, cy);
          ctx.lineTo(cx, cy + 18); ctx.lineTo(cx - 18, cy);
          ctx.closePath(); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.fillStyle = a; ctx.fill();
        }
      }
    }
  }

  private adjustAlpha(hex: string, amount: number): string {
    const h = hex.replace('#', '');
    if (h.length < 6) return hex;
    const r = Math.min(255, Math.max(0, parseInt(h.slice(0, 2), 16) + amount));
    const g = Math.min(255, Math.max(0, parseInt(h.slice(2, 4), 16) + amount));
    const b = Math.min(255, Math.max(0, parseInt(h.slice(4, 6), 16) + amount));
    return `rgb(${r},${g},${b})`;
  }

  dispose() {
    this.cache.forEach(t => t.dispose());
    this.cache.clear();
  }
}

export const textureManager = new TextureManager();
