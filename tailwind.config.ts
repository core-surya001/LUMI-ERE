import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E5C978',
          DEFAULT: '#C9A646',
          dark: '#A6822B',
          soft: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.28em',
      },
    },
  },
  plugins: [],
};

export default config;
