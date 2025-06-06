import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // ✅ Enables class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // ✅ Adjust if you're using another structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
