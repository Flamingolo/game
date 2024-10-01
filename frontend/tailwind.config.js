/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind processes all React files
  ],
  theme: {
    extend: {
      colors: {
        'black-ui': {
          DEFAULT: '#4e434c',  // Main black (default)
          '900': '#2b212a',    // Darkest shade of #4e434c
          '800': '#3a2f39',    // Darker shade
          '700': '#4e434c',    // Default
          '600': '#6a5b65',    // Slightly lighter
          '500': '#7d6b7a',    // Medium-light gray
          '400': '#9c8d98',    // Lighter gray
          '300': '#bdaeb9',    // Light gray
          '200': '#d9ccd4',    // Very light gray
          '100': '#f0e6eb',    // Lightest gray
        },
        'red-ui': {
          DEFAULT: '#ff4c4c',  // Main red
          '900': '#cc3c3c',    // Dark red
          '800': '#d94f4f',    // Darker
          '700': '#e66161',    // Lighter
          '600': '#f27474',    // Even lighter
          '400': '#f58888',    // Soft red
          '300': '#ffb3b3',    // Light red
          '200': '#ffcfcf',    // Lighter red
          '100': '#ffe6e6',    // Lightest red
        },
        'gold-ui': {
          DEFAULT: '#ffd700',  // Main gold
          '900': '#ccac00',    // Dark gold
          '800': '#e6b800',    // Darker gold
          '700': '#ffcc00',    // Slightly lighter gold
          '600': '#ffdb33',    // Light gold
          '400': '#ffe566',    // Pale gold
          '300': '#ffeb99',    // Lighter gold
          '200': '#fff3cc',    // Very light gold
          '100': '#fff8e6',    // Lightest gold
        },
      }
    }, 
  },
  plugins: [],
};
