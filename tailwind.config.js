/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
