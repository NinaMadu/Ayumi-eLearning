/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': 'rgba(243, 184, 184, 0.15)',
        'custom-red': 'rgb(235, 104, 86)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right,  #D16262, #C53B3B)',
      },
    },
  },
  plugins: [],
}

