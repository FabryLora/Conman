/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary-blue": "#002C72",
        "primary-blue-dark": "#092552",
        "primary-red": "#FF1F14",
        "special-white": "#F5F5F5"

      }
    },
    
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

