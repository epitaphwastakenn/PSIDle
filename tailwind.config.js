/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#131a34',
          100: '#182347',
          200: '#26345f',
        },
        peach: {
          300: '#ff9ac3',
          500: '#ff6b9d',
        },
        mint: {
          200: '#9ff8d3',
          500: '#3dd9a6',
        },
        denim: {
          400: '#5d90ff',
          500: '#4a7bff',
          600: '#355de6',
        },
        night: {
          950: '#070a18',
          900: '#0b1024',
          800: '#121a39',
        },
        aura: {
          500: '#8a6cff',
          400: '#a38dff',
          300: '#c2b3ff',
        },
      },
      fontFamily: {
        body: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
        title: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 260ms ease-out both',
      },
      boxShadow: {
        card: '0 16px 40px rgba(2, 6, 24, 0.45)',
        glow: '0 0 0 1px rgba(167, 139, 250, 0.45), 0 0 22px rgba(59, 130, 246, 0.4)',
      },
    },
  },
  plugins: [],
}
