import { teal } from 'tailwindcss/colors.js'

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
export default {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    // Gives errors in console (color-adjust)
    // require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      colors: {
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
          900: '#18181b',
        },
        primary: teal,
      },
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      spacing: {
        base: '320px',
        header: 'var(--header-height)',
        footer: 'var(--footer-height)',
        page: 'var(--page-height)',
        18: '4.5rem',
        46: '11.5rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      minHeight: {
        page: 'var(--page-height)',
      },
    },
  },
}
