/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        destructive: '#f87171',
        popover: '#FAF9F6',
        'popover-foreground': '#141414',
        'primary-foreground': '#141414',
        ring: '#34d399'
      }
    },
  },
  plugins: [],
}

