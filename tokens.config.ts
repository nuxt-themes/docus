import { defineTheme } from 'pinceau'

export default defineTheme({
  utils: {
    stateColors: (value) => {
      return {
        color: `{docus.state.${value}.color.primary}`,
        backgroundColor: `{docus.state.${value}.backgroundColor.primary}`,
        borderColor: `{docus.state.${value}.borderColor.primary}`,
        ':deep(code)': {
          color: `{docus.state.${value}.color.secondary}`,
          backgroundColor: `{docus.state.${value}.backgroundColor.secondary}`
        },
        ':deep(a)': {
          borderColor: 'currentColor',
          '&:hover': {
            color: `{docus.state.${value}.color.secondary}`,
            borderColor: 'currentColor'
          }
        }
      }
    },
    my: (value) => {
      return {
        marginTop: value,
        marginBottom: value
      }
    },
    mx: (value) => {
      return {
        marginLeft: value,
        marginRight: value
      }
    },
    py: (value) => {
      return {
        paddingTop: value,
        paddingBottom: value
      }
    },
    px: (value) => {
      return {
        paddingLeft: value,
        paddingRight: value
      }
    }
  },
  docus: {
    page: {
      height: 'calc(100vh - calc(calc({docus.header.height} + {docus.footer.height})))',
      maxWidth: '90rem'
    },
    header: { height: '64px' },
    footer: { height: '50px' },
    surface: {
      background: {
        base: {
          initial: '{colors.gray.100}',
          dark: '{colors.gray.900}'
        }
      }
    },
    // TODO: improve structure to text.color.primary[default|hover]
    text: {
      color: {
        primary: {
          initial: '{colors.gray.900}',
          dark: '{colors.gray.50}'
        },
        secondary: {
          initial: '{colors.gray.500}',
          dark: '{colors.gray.400}'
        },
        secondaryHover: {
          initial: '{colors.gray.700}',
          dark: '{colors.gray.200}'
        }
      }
    },
    border: {
      primary: {
        default: {
          initial: '{colors.gray.100}',
          dark: '{colors.gray.800}'
        },
        hover: {
          initial: '{colors.gray.200}',
          dark: '{colors.gray.700}'
        }
      },
      secondary: {
        default: {
          initial: '{colors.gray.200}',
          dark: '{colors.gray.700}'
        },
        hover: {
          initial: '',
          dark: ''
        }
      }
    },
    state: {
      primary: {
        color: {
          primary: {
            initial: '{colors.primary.600}',
            dark: '{colors.primary.400}'
          },
          secondary: {
            initial: '{colors.primary.700}',
            dark: '{colors.primary.200}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{colors.primary.50}',
            dark: '{colors.primary.900}'
          },
          secondary: {
            initial: '{colors.primary.100}',
            dark: '{colors.primary.800}'
          }
        },
        borderColor: {
          primary: {
            initial: '{colors.primary.100}',
            dark: '{colors.primary.800}'
          },
          secondary: {}
        }
      },
      info: {
        color: {
          primary: {
            initial: '{colors.blue.500}',
            dark: '{colors.blue.400}'
          },
          secondary: {
            initial: '{colors.blue.600}',
            dark: '{colors.blue.200}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{colors.blue.50}',
            dark: '{colors.blue.900}'
          },
          secondary: {
            initial: '{colors.blue.100}',
            dark: '{colors.blue.800}'
          }
        },
        borderColor: {
          primary: {
            initial: '{colors.blue.100}',
            dark: '{colors.blue.800}'
          },
          secondary: {}
        }
      },
      success: {
        color: {
          primary: {
            initial: '{colors.green.500}',
            dark: '{colors.green.400}'
          },
          secondary: {
            initial: '{colors.green.600}',
            dark: '{colors.green.200}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{colors.green.50}',
            dark: '{colors.green.900}'
          },
          secondary: {
            initial: '{colors.green.100}',
            dark: '{colors.green.800}'
          }
        },
        borderColor: {
          primary: {
            initial: '{colors.green.100}',
            dark: '{colors.green.800}'
          },
          secondary: {}
        }
      },
      warning: {
        color: {
          primary: {
            initial: '{colors.yellow.600}',
            dark: '{colors.yellow.400}'
          },
          secondary: {
            initial: '{colors.yellow.700}',
            dark: '{colors.yellow.200}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{colors.yellow.50}',
            dark: '{colors.yellow.900}'
          },
          secondary: {
            initial: '{colors.yellow.100}',
            dark: '{colors.yellow.800}'
          }
        },
        borderColor: {
          primary: {
            initial: '{colors.yellow.100}',
            dark: '{colors.yellow.800}'
          },
          secondary: {}
        }
      },
      danger: {
        color: {
          primary: {
            initial: '{colors.red.500}',
            dark: '{colors.red.300}'
          },
          secondary: {
            initial: '{colors.red.600}',
            dark: '{colors.red.200}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{colors.red.50}',
            dark: '{colors.red.900}'
          },
          secondary: {
            initial: '{colors.red.100}',
            dark: '{colors.red.800}'
          }
        },
        borderColor: {
          primary: {
            initial: '{colors.red.100}',
            dark: '{colors.red.800}'
          },
          secondary: {}
        }
      }
    }
  },
  typography: {
    colors: {
      primary: {
        50: '{colors.primary.50}',
        100: '{colors.primary.100}',
        200: '{colors.primary.200}',
        300: '{colors.primary.300}',
        400: '{colors.primary.400}',
        500: '{colors.primary.500}',
        600: '{colors.primary.600}',
        700: '{colors.primary.700}',
        800: '{colors.primary.800}',
        900: '{colors.primary.900}'
      },
      secondary: {
        50: '{colors.gray.50}',
        100: '{colors.gray.100}',
        200: '{colors.gray.200}',
        300: '{colors.gray.300}',
        400: '{colors.gray.400}',
        500: '{colors.gray.500}',
        600: '{colors.gray.600}',
        700: '{colors.gray.700}',
        800: '{colors.gray.800}',
        900: '{colors.gray.900}'
      }
    }
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  },
  colors: {
    black: '#0C0D0C',
    white: '#fff',
    primary: {
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
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#D4d4d8',
      400: '#a1a1aa',
      500: '#71717A',
      600: '#52525B',
      700: '#3f3f46',
      800: '#27272A',
      900: '#18181B'
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
    indigoblue: {
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
  },
  space: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    px: '1px',
    '0-5': '0.125rem',
    '1-5': '0.375rem',
    '2-5': '0.625rem',
    '3-5': '0.875rem'
  },
  size: {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    full: '100%',
    prose: '65ch'
  },
  width: { screen: '100vw' },
  height: { screen: '100vh' },
  radii: {
    none: '0px',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: {
      'offset-x': '0px',
      'offset-y': '1px',
      blur: '2px',
      spread: '0px',
      color: '#000',
      opacity: 0.05
    },
    default: [
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
    ],
    md: [
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
    ],
    lg: [
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
    ],
    xl: [
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
    ],
    '2xl': {
      'offset-x': '0px',
      'offset-y': '25px',
      blur: '50px',
      spread: '-12px',
      color: '{colors.blue.900}',
      opacity: 0.25
    },
    none: {
      'offset-x': '0px',
      'offset-y': '0px',
      blur: '0px',
      spread: '0px',
      color: '#000',
      opacity: 0
    }
  },
  font: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  leads: {
    3: '.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },
  backdrop: {
    filter: 'saturate(200%) blur(20px)',
    background: {
      // TODO: rgba 80% from colors.white
      initial: '#fffc',
      // TODO: rgba 80% from colors.black
      dark: '#0c0d0ccc'
    }
  },
  text: {
    xs: {
      fontSize: '{fontSizes.xs}',
      lineHeight: '{leads.4}'
    },
    sm: {
      fontSize: '{fontSizes.sm}',
      lineHeight: '{leads.5}'
    },
    base: {
      fontSize: '{fontSizes.base}',
      lineHeight: '{leads.6}'
    },
    lg: {
      fontSize: '{fontSizes.lg}',
      lineHeight: '{leads.7}'
    },
    '2xl': {
      fontSize: '{fontSizes.2xl}',
      lineHeight: '{leads.8}'
    },
    '3xl': {
      fontSize: '{fontSizes.3xl}',
      lineHeight: '{leads.9}'
    },
    '4xl': {
      fontSize: '{fontSizes.4xl}',
      lineHeight: '{leads.10}'
    },
    '5xl': {
      fontSize: '{fontSizes.5xl}',
      lineHeight: '{leads.none}'
    },
    '6xl': {
      fontSize: '{fontSizes.6xl}',
      lineHeight: '{leads.none}'
    }
  }
})
