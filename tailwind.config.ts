import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '158': '9.875rem',
        '36': '2.25rem',
      },
      colors: {
        'light-black': '#3B3C4A',
        'bg-dark': '#181A2A',
        'secondary-900': '#141624',
        'light-blue': '#4B6BFB',
        'bg-light-dark': '#22243a',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
