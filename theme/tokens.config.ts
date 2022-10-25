import { defineTheme } from 'pinceau'

export default defineTheme({
  docus: {
    page: {
      height: {
        value: 'calc(100vh - calc(calc({docus.header.height} + {docus.footer.height})))'
      },
      maxWidth: {
        value: '90rem'
      }
    },
    header: {
      height: {
        value: '64px'
      }
    },
    footer: {
      height: {
        value: '50px'
      }
    }
  },
  media: {
    sm: { value: '(min-width: 640px)' },
    md: { value: '(min-width: 768px)' },
    lg: { value: '(min-width: 1024px)' },
    xl: { value: '(min-width: 1280px)' },
    '2xl': { value: '(min-width: 1536px)' }
  },
  colors: {
    black: { value: '#0C0D0C' },
    white: { value: '#fff' },
    slate: {
      50: { value: '#f8fafc' },
      100: { value: '#f1f5f9' },
      200: { value: '#e2e8f0' },
      300: { value: '#cbd5e1' },
      400: { value: '#94a3b8' },
      500: { value: '#64748b' },
      600: { value: '#475569' },
      700: { value: '#334155' },
      800: { value: '#1e293b' },
      900: { value: '#0f172a' }
    },
    gray: {
      50: { value: '#f9fafb' },
      100: { value: '#f3f4f6' },
      200: { value: '#e5e7eb' },
      300: { value: '#d1d5db' },
      400: { value: '#9ca3af' },
      500: { value: '#6b7280' },
      600: { value: '#4b5563' },
      700: { value: '#374151' },
      800: { value: '#1f2937' },
      900: { value: '#111827' }
    },
    zinc: {
      50: { value: '#fafafa' },
      100: { value: '#f4f4f5' },
      200: { value: '#e4e4e7' },
      300: { value: '#d4d4d8' },
      400: { value: '#a1a1aa' },
      500: { value: '#71717a' },
      600: { value: '#52525b' },
      700: { value: '#3f3f46' },
      800: { value: '#27272a' },
      900: { value: '#18181b' }
    },
    neutral: {
      50: { value: '#fafafa' },
      100: { value: '#f5f5f5' },
      200: { value: '#e5e5e5' },
      300: { value: '#d4d4d4' },
      400: { value: '#a3a3a3' },
      500: { value: '#737373' },
      600: { value: '#525252' },
      700: { value: '#404040' },
      800: { value: '#262626' },
      900: { value: '#171717' }
    },
    stone: {
      50: { value: '#fafaf9' },
      100: { value: '#f5f5f4' },
      200: { value: '#e7e5e4' },
      300: { value: '#d6d3d1' },
      400: { value: '#a8a29e' },
      500: { value: '#78716c' },
      600: { value: '#57534e' },
      700: { value: '#44403c' },
      800: { value: '#292524' },
      900: { value: '#1c1917' }
    },
    red: {
      50: { value: '#fef2f2' },
      100: { value: '#fee2e2' },
      200: { value: '#fecaca' },
      300: { value: '#fca5a5' },
      400: { value: '#f87171' },
      500: { value: '#ef4444' },
      600: { value: '#dc2626' },
      700: { value: '#b91c1c' },
      800: { value: '#991b1b' },
      900: { value: '#7f1d1d' }
    },
    orange: {
      50: { value: '#fff7ed' },
      100: { value: '#ffedd5' },
      200: { value: '#fed7aa' },
      300: { value: '#fdba74' },
      400: { value: '#fb923c' },
      500: { value: '#f97316' },
      600: { value: '#ea580c' },
      700: { value: '#c2410c' },
      800: { value: '#9a3412' },
      900: { value: '#7c2d12' }
    },
    amber: {
      50: { value: '#fffbeb' },
      100: { value: '#fef3c7' },
      200: { value: '#fde68a' },
      300: { value: '#fcd34d' },
      400: { value: '#fbbf24' },
      500: { value: '#f59e0b' },
      600: { value: '#d97706' },
      700: { value: '#b45309' },
      800: { value: '#92400e' },
      900: { value: '#78350f' }
    },
    yellow: {
      50: { value: '#fefce8' },
      100: { value: '#fef9c3' },
      200: { value: '#fef08a' },
      300: { value: '#fde047' },
      400: { value: '#facc15' },
      500: { value: '#eab308' },
      600: { value: '#ca8a04' },
      700: { value: '#a16207' },
      800: { value: '#854d0e' },
      900: { value: '#713f12' }
    },
    lime: {
      50: { value: '#f7fee7' },
      100: { value: '#ecfccb' },
      200: { value: '#d9f99d' },
      300: { value: '#bef264' },
      400: { value: '#a3e635' },
      500: { value: '#84cc16' },
      600: { value: '#65a30d' },
      700: { value: '#4d7c0f' },
      800: { value: '#3f6212' },
      900: { value: '#365314' }
    },
    green: {
      50: { value: '#f0fdf4' },
      100: { value: '#dcfce7' },
      200: { value: '#bbf7d0' },
      300: { value: '#86efac' },
      400: { value: '#4ade80' },
      500: { value: '#22c55e' },
      600: { value: '#16a34a' },
      700: { value: '#15803d' },
      800: { value: '#166534' },
      900: { value: '#14532d' }
    },
    emerald: {
      50: { value: '#ecfdf5' },
      100: { value: '#d1fae5' },
      200: { value: '#a7f3d0' },
      300: { value: '#6ee7b7' },
      400: { value: '#34d399' },
      500: { value: '#10b981' },
      600: { value: '#059669' },
      700: { value: '#047857' },
      800: { value: '#065f46' },
      900: { value: '#064e3b' }
    },
    teal: {
      50: { value: '#f0fdfa' },
      100: { value: '#ccfbf1' },
      200: { value: '#99f6e4' },
      300: { value: '#5eead4' },
      400: { value: '#2dd4bf' },
      500: { value: '#14b8a6' },
      600: { value: '#0d9488' },
      700: { value: '#0f766e' },
      800: { value: '#115e59' },
      900: { value: '#134e4a' }
    },
    cyan: {
      50: { value: '#ecfeff' },
      100: { value: '#cffafe' },
      200: { value: '#a5f3fc' },
      300: { value: '#67e8f9' },
      400: { value: '#22d3ee' },
      500: { value: '#06b6d4' },
      600: { value: '#0891b2' },
      700: { value: '#0e7490' },
      800: { value: '#155e75' },
      900: { value: '#164e63' }
    },
    sky: {
      50: { value: '#f0f9ff' },
      100: { value: '#e0f2fe' },
      200: { value: '#bae6fd' },
      300: { value: '#7dd3fc' },
      400: { value: '#38bdf8' },
      500: { value: '#0ea5e9' },
      600: { value: '#0284c7' },
      700: { value: '#0369a1' },
      800: { value: '#075985' },
      900: { value: '#0c4a6e' }
    },
    blue: {
      50: { value: '#eff6ff' },
      100: { value: '#dbeafe' },
      200: { value: '#bfdbfe' },
      300: { value: '#93c5fd' },
      400: { value: '#60a5fa' },
      500: { value: '#3b82f6' },
      600: { value: '#2563eb' },
      700: { value: '#1d4ed8' },
      800: { value: '#1e40af' },
      900: { value: '#1e3a8a' }
    },
    indigo: {
      50: { value: '#eef2ff' },
      100: { value: '#e0e7ff' },
      200: { value: '#c7d2fe' },
      300: { value: '#a5b4fc' },
      400: { value: '#818cf8' },
      500: { value: '#6366f1' },
      600: { value: '#4f46e5' },
      700: { value: '#4338ca' },
      800: { value: '#3730a3' },
      900: { value: '#312e81' }
    },
    violet: {
      50: { value: '#f5f3ff' },
      100: { value: '#ede9fe' },
      200: { value: '#ddd6fe' },
      300: { value: '#c4b5fd' },
      400: { value: '#a78bfa' },
      500: { value: '#8b5cf6' },
      600: { value: '#7c3aed' },
      700: { value: '#6d28d9' },
      800: { value: '#5b21b6' },
      900: { value: '#4c1d95' }
    },
    purple: {
      50: { value: '#faf5ff' },
      100: { value: '#f3e8ff' },
      200: { value: '#e9d5ff' },
      300: { value: '#d8b4fe' },
      400: { value: '#c084fc' },
      500: { value: '#a855f7' },
      600: { value: '#9333ea' },
      700: { value: '#7e22ce' },
      800: { value: '#6b21a8' },
      900: { value: '#581c87' }
    },
    fuchsia: {
      50: { value: '#fdf4ff' },
      100: { value: '#fae8ff' },
      200: { value: '#f5d0fe' },
      300: { value: '#f0abfc' },
      400: { value: '#e879f9' },
      500: { value: '#d946ef' },
      600: { value: '#c026d3' },
      700: { value: '#a21caf' },
      800: { value: '#86198f' },
      900: { value: '#701a75' }
    },
    pink: {
      50: { value: '#fdf2f8' },
      100: { value: '#fce7f3' },
      200: { value: '#fbcfe8' },
      300: { value: '#f9a8d4' },
      400: { value: '#f472b6' },
      500: { value: '#ec4899' },
      600: { value: '#db2777' },
      700: { value: '#be185d' },
      800: { value: '#9d174d' },
      900: { value: '#831843' }
    },
    rose: {
      50: { value: '#fff1f2' },
      100: { value: '#ffe4e6' },
      200: { value: '#fecdd3' },
      300: { value: '#fda4af' },
      400: { value: '#fb7185' },
      500: { value: '#f43f5e' },
      600: { value: '#e11d48' },
      700: { value: '#be123c' },
      800: { value: '#9f1239' },
      900: { value: '#881337' }
    }
  },
  space: {
    px: { value: '1px' },
    0: { value: '0px' },
    0.5: { value: '0.125rem' },
    1: { value: '0.25rem' },
    1.5: { value: '0.375rem' },
    2: { value: '0.5rem' },
    2.5: { value: '0.625rem' },
    3: { value: '0.75rem' },
    3.5: { value: '0.875rem' },
    4: { value: '1rem' },
    5: { value: '1.25rem' },
    6: { value: '1.5rem' },
    7: { value: '1.75rem' },
    8: { value: '2rem' },
    9: { value: '2.25rem' },
    10: { value: '2.5rem' },
    11: { value: '2.75rem' },
    12: { value: '3rem' },
    14: { value: '3.5rem' },
    16: { value: '4rem' },
    20: { value: '5rem' },
    24: { value: '6rem' },
    28: { value: '7rem' },
    32: { value: '8rem' },
    36: { value: '9rem' },
    40: { value: '10rem' },
    44: { value: '11rem' },
    48: { value: '12rem' },
    52: { value: '13rem' },
    56: { value: '14rem' },
    60: { value: '15rem' },
    64: { value: '16rem' },
    72: { value: '18rem' },
    80: { value: '20rem' },
    96: { value: '24rem' }
  },
  size: {
    xs: { value: '20rem' },
    sm: { value: '24rem' },
    md: { value: '28rem' },
    lg: { value: '32rem' },
    xl: { value: '36rem' },
    '2xl': { value: '42rem' },
    '3xl': { value: '48rem' },
    '4xl': { value: '56rem' },
    '5xl': { value: '64rem' },
    '6xl': { value: '72rem' },
    '7xl': { value: '80rem' },
    full: { value: '100%' },
    prose: { value: '65ch' }
  },
  width: {
    screen: { value: '100vw' }
  },
  height: {
    screen: { value: '100vh' }
  },
  radius: {
    none: { value: '0px' },
    sm: { value: '0.125rem' },
    default: { value: '0.25rem' },
    md: { value: '0.375rem' },
    lg: { value: '0.5rem' },
    xl: { value: '0.75rem' },
    '2xl': { value: '1rem' },
    '3xl': { value: '1.5rem' },
    full: { value: '9999px' }
  },
  shadow: {
    sm: {
      value: {
        'offset-x': '0px',
        'offset-y': '1px',
        blur: '2px',
        spread: '0px',
        color: '#000',
        opacity: 0.05
      }
    },
    default: {
      value: [
        {
          'offset-x': '0px',
          'offset-y': '1px',
          blur: '3px',
          spread: '0px',
          color: '#000',
          opacity: 0.1
        },
        {
          'offset-x': '0px',
          'offset-y': '1px',
          blur: '2px',
          spread: '-1px',
          color: '#000',
          opacity: 0.1
        }
      ]
    },
    md: {
      value: [
        {
          'offset-x': '0px',
          'offset-y': '4px',
          blur: '6px',
          spread: '-1px',
          color: '#000',
          opacity: 0.1
        },
        {
          'offset-x': '0px',
          'offset-y': '2px',
          blur: '4px',
          spread: '-2px',
          color: '#000',
          opacity: 0.1
        }
      ]
    },
    lg: {
      value: [
        {
          'offset-x': '0px',
          'offset-y': '10px',
          blur: '15px',
          spread: '-3px',
          color: '#000',
          opacity: 0.1
        },
        {
          'offset-x': '0px',
          'offset-y': '4px',
          blur: '6px',
          spread: '-4px',
          color: '#000',
          opacity: 0.1
        }
      ]
    },
    xl: {
      value: [
        {
          'offset-x': '0px',
          'offset-y': '20px',
          blur: '25px',
          spread: '-5px',
          color: '{colors.blue.400}',
          opacity: 0.1
        },
        {
          'offset-x': '0px',
          'offset-y': '8px',
          blur: '10px',
          spread: '-6px',
          color: '#000',
          opacity: 0.1
        }
      ]
    },
    '2xl': {
      value: {
        'offset-x': '0px',
        'offset-y': '25px',
        blur: '50px',
        spread: '-12px',
        color: '{colors.blue.900}',
        opacity: 0.25
      }
    },
    none: {
      value: {
        'offset-x': '0px',
        'offset-y': '0px',
        blur: '0px',
        spread: '0px',
        color: '#000',
        opacity: 0
      }
    }
  },
  font: {
    sans: {
      value: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    serif: {
      value: [
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif'
      ]
    },
    mono: {
      value: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    }
  },
  fontSizes: {
    xs: { value: '0.75rem' },
    sm: { value: '0.875rem' },
    base: { value: '1rem' },
    lg: { value: '1.125rem' },
    xl: { value: '1.25rem' },
    '2xl': { value: '1.5rem' },
    '3xl': { value: '1.875rem' },
    '4xl': { value: '2.25rem' },
    '5xl': { value: '3rem' },
    '6xl': { value: '3.75rem' },
    '7xl': { value: '4.5rem' },
    '8xl': { value: '6rem' },
    '9xl': { value: '8rem' }
  },
  fontWeights: {
    thin: { value: 100 },
    extralight: { value: 200 },
    light: { value: 300 },
    normal: { value: 400 },
    medium: { value: 500 },
    semibold: { value: 600 },
    bold: { value: 700 },
    extrabold: { value: 800 },
    black: { value: 900 }
  },
  leads: {
    none: { value: 1 },
    tight: { value: 1.25 },
    snug: { value: 1.375 },
    normal: { value: 1.5 },
    relaxed: { value: 1.625 },
    loose: { value: 2 }
  },
  letterSpacings: {
    tighter: { value: '-0.05em' },
    tight: { value: '-0.025em' },
    normal: { value: '0em' },
    wide: { value: '0.025em' },
    wider: { value: '0.05em' },
    widest: { value: '0.1em' }
  },
  transitions: {
    default: { value: '{transitions.in-out}' },
    in: { value: [0.4, 0, 1, 1] },
    out: { value: [0.4, 0, 0.2, 1] },
    'in-out': { value: [0.4, 0, 0.2, 1] }
  }
})
