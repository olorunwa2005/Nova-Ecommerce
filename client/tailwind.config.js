/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        diamond: {
          light: '#e0f2fe',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        navy: {
          light: '#1e293b',
          DEFAULT: '#0f172a',
          dark: '#020617',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [],
}
