/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          500: '#539D8B', // Primary brand color
          600: '#427D6F',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
        }
      },
      borderRadius: {
        'xl': '20px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
