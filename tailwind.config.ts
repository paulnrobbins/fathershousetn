import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — driven by [data-theme] wrappers in globals.css
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        // Brand color tokens — constant across themes.
        steel: 'rgb(var(--steel) / <alpha-value>)',
        parchment: 'rgb(var(--parchment) / <alpha-value>)',
        brass: 'rgb(var(--brass) / <alpha-value>)',
        bronze: 'rgb(var(--bronze) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Display scale — fluid, viewport-bound. Used for hero / scene headlines.
        'display-xs': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2.5rem, 7vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(3.5rem, 10vw, 7rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(4.5rem, 13vw, 11rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(5.5rem, 16vw, 16rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        editorial: '-0.025em',
        mono: '0.04em',
        eyebrow: '0.18em',
      },
      backdropBlur: {
        nav: '14px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        threshold: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'breath': 'breath 6s ease-in-out infinite',
      },
      backgroundImage: {
        'brass-glow':
          'radial-gradient(ellipse at center, rgb(var(--brass) / 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
