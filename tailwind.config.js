/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        'primary-dark': '#1B4332',
        secondary: '#52B788',
        bg: '#FAFAF8',
        surface: '#FFFFFF',
        beige: '#F2EDE4',
        'text-main': '#1A1A1A',
        muted: '#6B7280',
        border: '#E5E0D8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
