/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 20% 20%, rgba(76, 29, 149, 0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(6, 182, 212, 0.25), transparent 45%), radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.3), transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 40px -15px rgba(59, 130, 246, 0.8)',
      },
      keyframes: {
        'gradient-move': {
          '0%': { transform: 'translate3d(-10%, -10%, 0) scale(1)' },
          '50%': { transform: 'translate3d(10%, 10%, 0) scale(1.1)' },
          '100%': { transform: 'translate3d(-10%, -10%, 0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.75' },
          '80%, 100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
