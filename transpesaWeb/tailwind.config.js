import plugin from 'tailwindcss/plugin'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Aquí añadimos 'inria' como un nombre personalizado
        'inria': ['"Inria Serif"', 'serif'],
      },
      // AÑADIMOS LA FORMA PERSONALIZADA AQUÍ
      clipPath: {
        manager: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)', // Esta es una forma de ejemplo.
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Se mueve hasta la mitad (la longitud del array original)
        }
      }
    },
  },
  plugins: [
    // AÑADIMOS UN PLUGIN PARA USAR LA CLASE clip-manager
    plugin(function ({ addUtilities, theme }) {
      const clipPaths = theme('clipPath');
      const utilities = Object.entries(clipPaths).map(([key, value]) => ({
        [`.clip-${key}`]: {
          'clip-path': value,
        },
      }));
      addUtilities(utilities);
    }),
  ],
}

