/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'var(--accent)',
        // Warm earthy design system tokens
        'ink': 'var(--ink)',
        'ink-secondary': 'var(--ink-secondary)',
        'ink-tertiary': 'var(--ink-tertiary)',
        'soft': 'var(--soft)',
        'soft-warm': 'var(--soft-warm)',
        'surface': 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        'border-custom': 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-soft': 'var(--accent-soft)',
        'accent-light': 'var(--accent-light)',
        'offwhite': 'var(--off-white)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
      },
      borderRadius: {
        'card': 'var(--radius-cards)',
        'feature': 'var(--radius-medium)',
        'pill': 'var(--radius-buttons)',
        'nav': 'var(--radius-navigation)',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 0 #0000',
        'elevated': '0 0 #0000',
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      }
    },
  },
  plugins: [],
}