const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#0C0D0C',
  white: '#fff',
  gray: {
    DEFAULT: 'var(--colors-gray-500)',
    50: 'var(--colors-gray-50)',
    100: 'var(--colors-gray-100)',
    200: 'var(--colors-gray-200)',
    300: 'var(--colors-gray-300)',
    400: 'var(--colors-gray-400)',
    500: 'var(--colors-gray-500)',
    600: 'var(--colors-gray-600)',
    700: 'var(--colors-gray-700)',
    800: 'var(--colors-gray-800)',
    900: 'var(--colors-gray-900)'
  },
  green: {
    DEFAULT: 'var(--colors-green-500)',
    50: 'var(--colors-green-50)',
    100: 'var(--colors-green-100)',
    200: 'var(--colors-green-200)',
    300: 'var(--colors-green-300)',
    400: 'var(--colors-green-400)',
    500: 'var(--colors-green-500)',
    600: 'var(--colors-green-600)',
    700: 'var(--colors-green-700)',
    800: 'var(--colors-green-800)',
    900: 'var(--colors-green-900)'
  },
  yellow: {
    DEFAULT: 'var(--colors-yellow-500)',
    50: 'var(--colors-yellow-50)',
    100: 'var(--colors-yellow-100)',
    200: 'var(--colors-yellow-200)',
    300: 'var(--colors-yellow-300)',
    400: 'var(--colors-yellow-400)',
    500: 'var(--colors-yellow-500)',
    600: 'var(--colors-yellow-600)',
    700: 'var(--colors-yellow-700)',
    800: 'var(--colors-yellow-800)',
    900: 'var(--colors-yellow-900)'
  },
  orange: {
    DEFAULT: 'var(--colors-orange-500)',
    50: 'var(--colors-orange-50)',
    100: 'var(--colors-orange-100)',
    200: 'var(--colors-orange-200)',
    300: 'var(--colors-orange-300)',
    400: 'var(--colors-orange-400)',
    500: 'var(--colors-orange-500)',
    600: 'var(--colors-orange-600)',
    700: 'var(--colors-orange-700)',
    800: 'var(--colors-orange-800)',
    900: 'var(--colors-orange-900)'
  },
  red: {
    DEFAULT: 'var(--colors-red-500)',
    50: 'var(--colors-red-50)',
    100: 'var(--colors-red-100)',
    200: 'var(--colors-red-200)',
    300: 'var(--colors-red-300)',
    400: 'var(--colors-red-400)',
    500: 'var(--colors-red-500)',
    600: 'var(--colors-red-600)',
    700: 'var(--colors-red-700)',
    800: 'var(--colors-red-800)',
    900: 'var(--colors-red-900)'
  },
  teal: {
    DEFAULT: 'var(--colors-teal-500)',
    50: 'var(--colors-teal-50)',
    100: 'var(--colors-teal-100)',
    200: 'var(--colors-teal-200)',
    300: 'var(--colors-teal-300)',
    400: 'var(--colors-teal-400)',
    500: 'var(--colors-teal-500)',
    600: 'var(--colors-teal-600)',
    700: 'var(--colors-teal-700)',
    800: 'var(--colors-teal-800)',
    900: 'var(--colors-teal-900)'
  },
  blue: {
    DEFAULT: 'var(--colors-blue-500)',
    50: 'var(--colors-blue-50)',
    100: 'var(--colors-blue-100)',
    200: 'var(--colors-blue-200)',
    300: 'var(--colors-blue-300)',
    400: 'var(--colors-blue-400)',
    500: 'var(--colors-blue-500)',
    600: 'var(--colors-blue-600)',
    700: 'var(--colors-blue-700)',
    800: 'var(--colors-blue-800)',
    900: 'var(--colors-blue-900)'
  },
  indigo: {
    DEFAULT: 'var(--colors-indigo-500)',
    50: 'var(--colors-indigo-50)',
    100: 'var(--colors-indigo-100)',
    200: 'var(--colors-indigo-200)',
    300: 'var(--colors-indigo-300)',
    400: 'var(--colors-indigo-400)',
    500: 'var(--colors-indigo-500)',
    600: 'var(--colors-indigo-600)',
    700: 'var(--colors-indigo-700)',
    800: 'var(--colors-indigo-800)',
    900: 'var(--colors-indigo-900)'
  },
  purple: {
    DEFAULT: 'var(--colors-purple-500)',
    50: 'var(--colors-purple-50)',
    100: 'var(--colors-purple-100)',
    200: 'var(--colors-purple-200)',
    300: 'var(--colors-purple-300)',
    400: 'var(--colors-purple-400)',
    500: 'var(--colors-purple-500)',
    600: 'var(--colors-purple-600)',
    700: 'var(--colors-purple-700)',
    800: 'var(--colors-purple-800)',
    900: 'var(--colors-purple-900)'
  },
  pink: {
    DEFAULT: 'var(--colors-pink-500)',
    50: 'var(--colors-pink-50)',
    100: 'var(--colors-pink-100)',
    200: 'var(--colors-pink-200)',
    300: 'var(--colors-pink-300)',
    400: 'var(--colors-pink-400)',
    500: 'var(--colors-pink-500)',
    600: 'var(--colors-pink-600)',
    700: 'var(--colors-pink-700)',
    800: 'var(--colors-pink-800)',
    900: 'var(--colors-pink-900)'
  },
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
}

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
export default {
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
  theme: {
    colors,
    extend: {
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
