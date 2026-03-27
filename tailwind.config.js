/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          blue: '#1b6fea',
          cyan: '#00a6ff',
          dark: '#1d1d1b',
          navy: '#0c2340',
          navyDeep: '#0a1e38',
          light: '#f0f4f8',
        },
      },
      fontFamily: {
        fira: ['Fira Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
