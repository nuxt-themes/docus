const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#fff',
  black: '#0c0c0d',
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b'
  },
  green: {
    50: '#d6ffee',
    100: '#acffdd',
    200: '#83ffcc',
    300: '#30ffaa',
    400: '#00dc82',
    500: '#00bd6f',
    600: '#009d5d',
    700: '#007e4a',
    800: '#005e38',
    900: '#003f25'
  },
  yellow: {
    50: '#fdf6db',
    100: '#fcedb7',
    200: '#fae393',
    300: '#f8da70',
    400: '#f7d14c',
    500: '#f5c828',
    600: '#daac0a',
    700: '#a38108',
    800: '#6d5605',
    900: '#362b03'
  },
  orange: {
    50: '#ffe9d9',
    100: '#ffd3b3',
    200: '#ffbd8d',
    300: '#ffa666',
    400: '#ff9040',
    500: '#ff7a1a',
    600: '#e15e00',
    700: '#a94700',
    800: '#702f00',
    900: '#381800'
  },
  red: {
    50: '#ffdbd9',
    100: '#ffb7b3',
    200: '#ff948d',
    300: '#ff7066',
    400: '#ff4c40',
    500: '#ff281a',
    600: '#e10e00',
    700: '#a90a00',
    800: '#700700',
    900: '#380300'
  },
  pear: {
    50: '#f7f8dc',
    100: '#eff0ba',
    200: '#e8e997',
    300: '#e0e274',
    400: '#d8da52',
    500: '#d0d32f',
    600: '#a8aa24',
    700: '#7e801b',
    800: '#545512',
    900: '#2a2b09'
  },
  teal: {
    50: '#d7faf8',
    100: '#aff4f0',
    200: '#87efe9',
    300: '#5fe9e1',
    400: '#36e4da',
    500: '#1cd1c6',
    600: '#16a79e',
    700: '#117d77',
    800: '#0b544f',
    900: '#062a28'
  },
  lightblue: {
    50: '#d9f8ff',
    100: '#b3f1ff',
    200: '#8deaff',
    300: '#66e4ff',
    400: '#40ddff',
    500: '#1ad6ff',
    600: '#00b9e1',
    700: '#008aa9',
    800: '#005c70',
    900: '#002e38'
  },
  blue: {
    50: '#d9f1ff',
    100: '#b3e4ff',
    200: '#8dd6ff',
    300: '#66c8ff',
    400: '#40bbff',
    500: '#1aadff',
    600: '#0090e1',
    700: '#006ca9',
    800: '#004870',
    900: '#002438'
  },
  royalblue: {
    50: '#dfdbfb',
    100: '#c0b7f7',
    200: '#a093f3',
    300: '#806ff0',
    400: '#614bec',
    500: '#4127e8',
    600: '#2c15c4',
    700: '#211093',
    800: '#160a62',
    900: '#0b0531'
  },
  indigo: {
    50: '#d9e5ff',
    100: '#b3cbff',
    200: '#8db0ff',
    300: '#6696ff',
    400: '#407cff',
    500: '#1a62ff',
    600: '#0047e1',
    700: '#0035a9',
    800: '#002370',
    900: '#001238'
  },
  purple: {
    50: '#ead9ff',
    100: '#d5b3ff',
    200: '#c08dff',
    300: '#ab66ff',
    400: '#9640ff',
    500: '#811aff',
    600: '#6500e1',
    700: '#4c00a9',
    800: '#330070',
    900: '#190038'
  },
  pink: {
    50: '#ffd9f2',
    100: '#ffb3e5',
    200: '#ff8dd8',
    300: '#ff66cc',
    400: '#ff40bf',
    500: '#ff1ab2',
    600: '#e10095',
    700: '#a90070',
    800: '#70004b',
    900: '#380025'
  },
  ruby: {
    50: '#ffd9e4',
    100: '#ffb3c9',
    200: '#ff8dae',
    300: '#ff6694',
    400: '#ff4079',
    500: '#ff1a5e',
    600: '#e10043',
    700: '#a90032',
    800: '#700021',
    900: '#380011'
  }
}

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
export default {
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
  theme: {
    colors,
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--colors-primary-500)',
          50: 'var(--colors-primary-50)',
          100: 'var(--colors-primary-100)',
          200: 'var(--colors-primary-200)',
          300: 'var(--colors-primary-300)',
          400: 'var(--colors-primary-400)',
          500: 'var(--colors-primary-500)',
          600: 'var(--colors-primary-600)',
          700: 'var(--colors-primary-700)',
          800: 'var(--colors-primary-800)',
          900: 'var(--colors-primary-900)'
        }
      },
      spacing: {
        header: 'var(--docus-header-height)',
        page: 'var(--docus-page-height)'
      },
      maxWidth: {
        '8xl': 'var(--docus-page-max-width)'
      },
      minHeight: {
        page: 'var(--docus-page-height)',
        footer: 'var(--docus-footer-height)'
      }
    }
  }
}
