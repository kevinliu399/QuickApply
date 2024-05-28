/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'main-green': '#67FFA4',
      'main-gray' : '#D9D9D9',
      'main-black': '#141414',
    },
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif'], // Add Rubik font family here
    }
  },
  plugins: [],
}
