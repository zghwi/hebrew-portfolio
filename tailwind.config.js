/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hebrew: ['Noto Sans Hebrew', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
