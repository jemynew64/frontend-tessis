/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-pattern": "url('/images/background-login.png')",

        "background-pattern": "url('/images/background-login.png')",
      },
      colors: {
        "custom-purple": "#533CA6", // Agrega tu color personalizado aquí
        "custom-negro": "#3C3C3C", // Agrega tu color personalizado aquí
        "custom-botones-input": "#F7F7F7", // Agrega tu color personalizado aquí
        // Colores personalizados para medallas
        "custom-gold": "#FFD700", // Dorado
        "custom-silver": "#C0C0C0", // Plateado
        "custom-bronze": "#CD7F32", // Bronce
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Aquí configuramos la fuente Roboto
      },
      spacing: {
        15: "3.75rem", // Personalizado para w-15
        30: "7.5rem", // Personalizado para h-30
      },
      keyframes: {
        draw: {
          to: { strokeDashoffset: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        draw: "draw 0.8s ease-in-out forwards",
        shake: "shake 0.6s ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
