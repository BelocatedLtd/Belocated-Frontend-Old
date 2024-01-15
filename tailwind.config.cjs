/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fdfdfd', // White
        secondary: '#4285F4', //Blue
        tertiary: '#BC0000', // Red
        running: 'rgba(0, 128, 0, 0.05)', // Running
      }
    },
  },
  plugins: [],
}
