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
        'bg-light': '#f9fafb',
        // 'bg-light': '#e0e1e2',
        'bg-dark': '#181A2A',
        // 'bg-dark': '#282b46',
        'secondary-900': '#141624',
        'light-blue': '#4B6BFB',
        'bg-light-dark': '#22243a',
        'google-blue': 'rgb(66 133 244)',
        'item-bg-dark': '#2e2f40',
        'text-gray': '#696A75',
        'light-gray': '#f1f1f1',
        'dark-blue': '#242535',
        'dark-gray': '#BABABF',
      },
    },
    screens: {
      xsm: { max: '510px' },
      sm: { max: '640px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1280px' },
      '2xl': { max: '1536px' },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
