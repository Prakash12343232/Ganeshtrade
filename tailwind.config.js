/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d8b4fe',
          DEFAULT: '#a855f7', // Purple
          dark: '#7e22ce',
        },
        accent: {
          light: '#3b82f6',
          DEFAULT: '#2563eb', // Blue (for variety if needed)
          dark: '#1d4ed8',
        },
        background: '#0a0a0a', // Deep Black
        card: '#121212', // Dark Card
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
