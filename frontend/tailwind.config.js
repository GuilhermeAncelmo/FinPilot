/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        card: "#121A2B",
        border: "rgba(255,255,255,.06)",
        text: "#F8FAFC",
        secondary: "#94A3B8",
        brand: {
          green: "#10B981",
          red: "#EF4444",
          blue: "#3B82F6",
        }
      },
      borderRadius: {
        'premium': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
