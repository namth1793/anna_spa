/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f9efd5',
          200: '#f2d99d',
          300: '#e9bd65',
          400: '#e2a53e',
          500: '#c9863d',
          DEFAULT: '#C9A96E',
          600: '#b8783a',
          700: '#9a5d30',
          800: '#7d4929',
          900: '#673c24',
        },
        dark: {
          50:  '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#080808',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #e2c48a 50%, #C9A96E 100%)',
      },
    },
  },
  plugins: [],
};
