module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,js,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
