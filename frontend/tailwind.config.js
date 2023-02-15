/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary)",
        "secondary-color": "var(--secondary)",
        "accent-color": "var(--accent)",
        "contrast-color": "var(--contrast)",
      }
    },
  },
  plugins: [],
}
