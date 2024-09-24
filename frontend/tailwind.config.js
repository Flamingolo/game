/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind processes all React files
  ],
  theme: {
    extend: {},  // You can add custom themes here if needed
  },
  plugins: [],
};
