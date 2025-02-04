/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React components
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
