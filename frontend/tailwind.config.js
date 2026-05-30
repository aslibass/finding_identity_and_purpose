/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic tokens — RGB channel vars so Tailwind opacity modifiers work
        ivory:     'rgb(var(--c-ivory) / <alpha-value>)',
        parchment: 'rgb(var(--c-parchment) / <alpha-value>)',
        sand:      'rgb(var(--c-sand) / <alpha-value>)',
        charcoal:  'rgb(var(--c-charcoal) / <alpha-value>)',
        muted:     'rgb(var(--c-muted) / <alpha-value>)',
        'input-bg':'rgb(var(--c-input-bg) / <alpha-value>)',

        // Fixed accent colors — identical in both themes
        camel:            '#C4956A',
        burgundy:         '#6B2737',
        'burgundy-light': '#8B3D4F',
        terracotta:       '#C4714A',
        'stage-grey':     '#C5BDB5',
        'stage-amber':    '#D4914A',
        'stage-green':    '#6A8F6A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 4px 0 rgba(44,36,32,0.08)',
        card: '0 2px 12px 0 rgba(44,36,32,0.10)',
      },
    },
  },
  plugins: [],
}
