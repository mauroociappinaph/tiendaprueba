/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F0FDF4', // Very light pastel green (green-50)
        'surface': '#FFFFFF',
        'primary': '#22C55E', // Friendly green (green-500)
        'primary-light': '#D1FAE5', // Lighter pastel green (green-100)
        'text-primary': '#1F2937', // Dark gray
        'text-secondary': '#6B7280', // Medium gray
        'border': '#E5E7EB', // Light gray
        'danger': '#EF4444', // Red-500
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    }
  },
  plugins: [],
}