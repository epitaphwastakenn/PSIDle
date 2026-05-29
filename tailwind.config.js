/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#fffefb',
          100: '#fff8ee',
          200: '#ffeecf',
        },
        peach: {
          300: '#f8c9a4',
          500: '#ef9f6a',
        },
        mint: {
          200: '#cbe9de',
          500: '#66ab8f',
        },
        denim: {
          400: '#5f82b9',
          600: '#2f507c',
        },
      },
      fontFamily: {
        body: ['Nunito', 'Trebuchet MS', 'sans-serif'],
        title: ['Bree Serif', 'Georgia', 'serif'],
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
        card: '0 8px 24px rgba(90, 80, 58, 0.08)',
      },
    },
  },
  plugins: [],
}
