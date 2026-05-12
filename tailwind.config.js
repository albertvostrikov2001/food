/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'easy-primary':        '#D0395E',
        'easy-primary-hover':  '#B02E4F',
        'easy-primary-light':  '#FCE8ED',
        'easy-primary-muted':  '#F4A0B5',
        'easy-accent':         '#F4A35A',
        'easy-accent-light':   '#FEF0E0',
        'easy-bg':             '#FFF8F3',
        'easy-surface':        '#FFFFFF',
        'easy-surface-warm':   '#FFF1E6',
        'easy-text':           '#1C1C1C',
        'easy-text-secondary': '#5A4D44',
        'easy-muted':          '#9E8E84',
        'easy-border':         '#EDE5DC',
        'easy-beige':          '#F5EDE2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
