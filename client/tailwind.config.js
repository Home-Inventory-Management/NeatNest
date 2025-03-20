/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          urbanist: ["Urbanist", "sans-serif"],
          zapier: ['Archivo Black', 'sans-serif'],
          gumroad: ['Raleway', 'sans-serif'],
          featherdev: ['Poppins', 'sans-serif'],
          figma: ['Inter', 'sans-serif'],
          coinbase: ['DM Sans', 'sans-serif'],
          globalbank: ['Montserrat', 'sans-serif'],
          amplitude: ['Urbanist', 'sans-serif'],
        },

        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
          },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};