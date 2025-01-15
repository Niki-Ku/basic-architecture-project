const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      gridAutoColumns: {
        mobile: 'calc(50% - 1rem)',
        sm: 'calc((100% - 1rem * 2) / 3)',
        md: 'calc((100% - 1rem * 4) / 5)',
        lg: 'calc((100% - 1rem * 6) / 7)',
        xxl: 'calc((100% - 1rem * 8) / 9)',
      },
      backgroundImage: {
        'error-image': "url('/src/assets/images/error-bg.png')",
        'posters': "url('/src/assets/images/sign-in.jpg')",
      },
      colors: {
        red: {
          default: 'rgb(var(--color-red))',
          secondary: 'rgb(var(--color-red-secondary))',
        },
        gray: {
          default: 'rgb(var(--color-gray))',
          dark: 'rgb(var(--color-gray-dark))',
          light: 'rgb(var(--color-gray-light))',
          secondary: 'rgb(var(--color-gray-secondary))',
          white: 'rgb(var(--color-gray-white))',
          40: 'rgba(var(--color-gray-40), 0.4)',
          static: 'rgba(var(--color-gray-static), 0.4)',
        },
        black: {
          black: {
            absolute: 'rgb(var(--color-black-total))',
            10: 'rgba(var(--color-black-total), 0.1)',
            30: 'rgba(var(--color-black-total), 0.3)',
          },
          default: 'rgb(var(--color-black))',
          10: 'rgba(var(--color-black), 0.1)',
          30: 'rgba(var(--color-black), 0.3)',
          70: 'rgba(var(--color-black), 0.7)',
          90: 'rgba(var(--color-black), 0.9)',
        },
        toggle: {
          bg: 'rgb(var(--toggle-bg))',
          border: 'rgb(var(--toggle-border))',
          active: 'rgb(var(--toggle-active))',
          hover: 'rgb(var(--toggle-hover))',
          text: 'rgb(var(--toggle-text))',
        },
        bg: {
          primary: 'rgb(var(--color-gray-dark))',
          secondary: 'rgb(var(--bg-secondary))',
          hover: 'rgb(var(--color-gray-hover))',
          accent: 'rgb(var(--bg-accent))',
        },
        text: {
          default: 'rgb(var(--text-default))',
          secondary: 'rgb(var(--text-secondary))',
          highlight: 'rgb(var(--text-highlight))',
          hover: 'rgb(var(--text-hover))',
          accent: 'rgb(var(--text-accent))',
          transparent: {
            90: 'rgba(var(--text-default), 0.9)',
            70: 'rgba(var(--text-default), 0.7)',
            40: 'rgba(var(--text-default), 0.4)',
            10: 'rgba(var(--text-default), 0.1)',
          }
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.mask-gradient': {
          maskImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, .068) 3.3%, rgba(0, 0, 0, .145) 5.9%, rgba(0, 0, 0, .227) 8.1%, rgba(0, 0, 0, .313) 10.1%, rgba(0, 0, 0, .401) 12.1%, rgba(0, 0, 0, .49) 14.6%, rgba(0, 0, 0, .578) 17.7%, rgba(0, 0, 0, .661) 21.8%, rgba(0, 0, 0, .74) 27.1%, rgba(0, 0, 0, .812) 33.9%, rgba(0, 0, 0, .875) 42.4%, rgba(0, 0, 0, .927) 53%, rgba(0, 0, 0, .966) 66%, rgba(0, 0, 0, .991) 81.5%, rgba(0, 0, 0, .991) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, .068) 3.3%, rgba(0, 0, 0, .145) 5.9%, rgba(0, 0, 0, .227) 8.1%, rgba(0, 0, 0, .313) 10.1%, rgba(0, 0, 0, .401) 12.1%, rgba(0, 0, 0, .49) 14.6%, rgba(0, 0, 0, .578) 17.7%, rgba(0, 0, 0, .661) 21.8%, rgba(0, 0, 0, .74) 27.1%, rgba(0, 0, 0, .812) 33.9%, rgba(0, 0, 0, .875) 42.4%, rgba(0, 0, 0, .927) 53%, rgba(0, 0, 0, .966) 66%, rgba(0, 0, 0, .991) 81.5%, rgba(0, 0, 0, .991) 100%)',
        },
      });
    }),
  ],
};
