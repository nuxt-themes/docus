/** @type {import('tailwindcss').Config} */
export default {
  content: ['./tailwind.tokens.config.ts'],
  theme: {
    // colors: {
    //   suka: 'green'
    // },
    extend: {
      colors: {
        // orange
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        // purple
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        orange: {
          50: '#FFF7F2',
          100: '#FFEFE5',
          200: '#FFE5D7',
          300: '#FDAC7E',
          400: '#FC8E51',
          500: '#FA630E',
          600: '#7E3004',
          700: '#3F1802',
          800: '#2D1102',
          900: '#1A0A01',
        },
        purple: {
          50: '#F8F5FF',
          100: '#F1ECFF',
          200: '#E5DCFF',
          300: '#A589F9',
          400: '#8961FD',
          500: '#6B39FA',
          600: '#370DAD',
          700: '#200273',
          800: '#14014A',
          900: '#080020',
        },
      }
    },
  },
  plugins: [],
}

