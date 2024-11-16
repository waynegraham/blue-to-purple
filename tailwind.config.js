const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Include Flowbite's content
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        print: { raw: 'print'},
        screen: { raw: 'screen' },
      }
    },
  },
  plugins: [
    flowbite.plugin(), // Include Flowbite's plugin for Tailwind CSS,
  ],
}

