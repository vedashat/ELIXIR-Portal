/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B1512',
        paper: '#F7F1E8',
        wine: {
          DEFAULT: '#7A1B33',
          deep: '#4A0F1F',
          light: '#9C2942'
        },
        amber: '#E3A23C',
        teal: '#2E6B5E',
        line: 'rgba(27,21,18,0.12)'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      },
      maxWidth: {
        prose: '68ch'
      }
    }
  },
  plugins: []
}
