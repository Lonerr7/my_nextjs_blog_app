import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-serif-pro': ['var(--font-source-seif-pro)']
      },
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
        'bg-dark': '#181A2A',
        'secondary-900': '#141624',
        'light-blue': '#4B6BFB',
        'bg-light-dark': '#22243a',
        'google-blue': 'rgb(66 133 244)',
        'item-bg-dark': '#2e2f40',
        'item-bg-dark_hover': '#22222f',
        'item-bg-dark_x2': '#1b1b25',
        'item-bg-dark_x2_hover': '#15151c',
        'text-gray': '#696A75',
        'light-gray': '#f1f1f1',
        'light-gray_hover': '#6c6c6c',
        'dark-gray': '#BABABF',
        'dark-blue': '#242535',
        'item-gray': '#cccccc',
        'quill-btn_hover': '#444444',
        'blogpost-border-light': '#E8E8EA',
        'blogpost-tag-primary': '#4B6BFB',
        'blogpost-info': '#97989F',
        'scrolled-header-light': '#d2d2d2',
        'scrolled-header-dark': '#0d0e17',
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
