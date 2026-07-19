/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        valiant: {
          yellow: '#FFE956',
          'yellow-deep': '#FFE136',
          charcoal: '#262C2D',
          ink: '#2C2C2C',
          muted: '#BBBBBB',
          cream: '#FFFDF5',
          border: '#D8D8D8',
          line: '#EEEEEE',
          body: '#555555',
          soft: '#F5F5F5',
          disabled: '#888888',
          subtle: '#666666',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Arial', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        valiant: '0 18px 50px rgba(38, 44, 45, 0.18)',
      },
    },
  },
  plugins: [],
}
