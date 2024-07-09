/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'banner' : 'url(./src/assets/film-venom.jpg)'
      }
    },
  },
  plugins: [],
}

