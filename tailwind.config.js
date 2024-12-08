/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
