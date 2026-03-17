/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas:    { DEFAULT: '#FAFAF8', dark: '#0A0A0A' },
        surface:   { DEFAULT: '#F2F0EC', dark: '#141414' },
        border:    { DEFAULT: '#E8E4DC', dark: '#242424' },
        muted:     { DEFAULT: '#A89E8C', dark: '#6B6B6B' },
        gold:      { DEFAULT: '#C9A84C', light: '#E0C06A', dark: '#A8883A' },
        terra:     { DEFAULT: '#C67B4B', light: '#DC9468', dark: '#A5613B' },
        indigo:    { DEFAULT: '#2D3A8C', light: '#3D4EA8', dark: '#1E2760' },
        charcoal:  '#1A1A1A',
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"DM Sans"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:   ['"DM Mono"', 'monospace'],
        label:  ['"Outfit"', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'draw': 'draw 3s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        draw: {
          to: { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
