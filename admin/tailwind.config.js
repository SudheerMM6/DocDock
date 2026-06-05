/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'var(--accent)'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        'card': 'var(--radius-cards)',
        'feature': 'var(--radius-medium)',
        'pill': 'var(--radius-buttons)',
        'nav': 'var(--radius-navigation)',
      },
      boxShadow: {
        'card': 'none',
        'soft': 'none',
        'lg': '0 0 #0000',
      }
    },
  },
  plugins: [],
}