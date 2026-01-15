/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'tablet': '768px',
      },
      colors: {
        primary: "#0066CC",
        'background-light': "#FFFFFF",
        'background-dark': "#1a1a1a",
        'card-dark': "#2a2a2a",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        scrollUp: 'scrollUp 30s linear infinite',
        scrollDown: 'scrollDown 30s linear infinite',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "corporate", "cupcake"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
