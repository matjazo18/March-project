/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode using 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include app directory if using app router
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "750px" },
        "max-md": { max: "1024px" },
        "max-rows": { max: "1100px" }, // Custom screen sizes
      },
      colors: {
        background: "var(--background)", // Custom CSS variables
        foreground: "var(--foreground)",
        customOrange: "#ff9900",
        customBlue: "#c6dbef",
      },
    },
  },
  plugins: [require("daisyui")], // Make sure DaisyUI is included
  daisyui: {
    themes: ["light"], // Specify the themes you want
  },
};
