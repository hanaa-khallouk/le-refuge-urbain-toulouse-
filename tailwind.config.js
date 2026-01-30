/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stone-bg': '#F5F5F4',    // Blanc pierre chaleureux
        'charcoal': '#18181B',    // Anthracite chic
        'bronze-accent': '#A87C5C', // Bronze brossé
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
