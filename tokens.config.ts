import { defineTheme } from 'pinceau'
import type { PinceauTheme, PropertyValue } from 'pinceau'

export default defineTheme({
  media: {
    $schema: {
      title: 'Your website media queries.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType color',
        '@studioIcon material-symbols:screenshot-monitor-outline-rounded'
      ]
    },
    xs: '(min-width: 475px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
    rm: '(prefers-reduced-motion: reduce)',
    landscape: 'only screen and (orientation: landscape)',
    portrait: 'only screen and (orientation: portrait)'
  },

  color: {
    $schema: {
      title: 'Your website color palette.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType color',
        '@studioIcon ph:palette'
      ]
    },
    white: '#ffffff',
    black: '#0B0A0A',
    // Primary is modified lightblue
    primary: {
      50: '#F1FCFF',
      100: '#DCF7FF',
      200: '#C5F2FF',
      300: '#82E3FF',
      400: '#55E1FF',
      500: '#1AD6FF',
      600: '#09A0C1',
      700: '#024757',
      800: '#00232B',
      900: '#001A1F'
    },
    gray: {
      50: '#FBFBFB',
      100: '#F6F5F4',
      200: '#ECEBE8',
      300: '#DBD9D3',
      400: '#ADA9A4',
      500: '#97948F',
      600: '#67635D',
      700: '#36332E',
      800: '#201E1B',
      900: '#121110'
    },
    red: {
      50: '#FFF9F8',
      100: '#FFF3F0',
      200: '#FFDED7',
      300: '#FFA692',
      400: '#FF7353',
      500: '#FF3B10',
      600: '#BB2402',
      700: '#701704',
      800: '#340A01',
      900: '#1C0301'
    },
    blue: {
      50: '#F2FAFF',
      100: '#DFF3FF',
      200: '#C6EAFF',
      300: '#A1DDFF',
      400: '#64C7FF',
      500: '#1AADFF',
      600: '#0069A6',
      700: '#014267',
      800: '#002235',
      900: '#00131D'
    },
    green: {
      50: '#ECFFF7',
      100: '#DEFFF1',
      200: '#C3FFE6',
      300: '#86FBCB',
      400: '#3CEEA5',
      500: '#0DD885',
      600: '#00B467',
      700: '#006037',
      800: '#002817',
      900: '#00190F'
    },
    yellow: {
      50: '#FFFCEE',
      100: '#FFF6D3',
      200: '#FFF0B1',
      300: '#FFE372',
      400: '#FFDC4E',
      500: '#FBCA05',
      600: '#CBA408',
      700: '#614E02',
      800: '#292100',
      900: '#1B1500'
    },
    shadow: {
      initial: '{color.gray.400}',
      dark: '{color.gray.800}'
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

  width: {
    $schema: {
      title: 'Your website screen sizings.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon ph:ruler'
      ]
    },
    screen: '100vw'
  },

  height: {
    $schema: {
      title: 'Your website screen sizings.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon ph:ruler'
      ]
    },
    screen: '100vh'
  },

  shadow: {
    xs: '0px 1px 2px 0px {color.shadow}',
    sm: '0px 1px 3px 0px {color.shadow}, 0px 1px 2px -1px {color.shadow}',
    md: '0px 4px 6px -1px {color.shadow}, 0px 2px 4px -2px {color.shadow}',
    lg: '0px 10px 15px -3px {color.shadow}, 0px 4px 6px -4px {color.shadow}',
    xl: '0px 20px 25px -5px {color.shadow}, 0px 8px 10px -6px {color.shadow}',
    '2xl': '0px 25px 50px -12px {color.shadow}',
    none: '0px 0px 0px 0px transparent'
  },

  radii: {
    $schema: {
      title: 'Your website border radiuses.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon material-symbols:rounded-corner'
      ]
    },
    none: '0px',
    '2xs': '0.125rem',
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    full: '9999px'
  },

  size: {
    $schema: {
      title: 'Your website sizings.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon ph:ruler'
      ]
    },
    0: '0px',
    2: '2px',
    4: '4px',
    6: '6px',
    8: '8px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    48: '48px',
    56: '56px',
    64: '64px',
    80: '80px',
    104: '104px',
    200: '200px',
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
    full: '100%'
  },

  space: {
    $schema: {
      title: 'Your website spacings.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon ph:ruler'
      ]
    },
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
    128: '32rem',
    px: '1px',
    rem: {
      125: '0.125rem',
      375: '0.375rem',
      625: '0.625rem',
      875: '0.875rem'
    }
  },

  borderWidth: {
    $schema: {
      title: 'Your website border widths.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon material-symbols:border-all-outline-rounded'
      ]
    },
    noBorder: '0',
    sm: '1px',
    md: '2px',
    lg: '3px'
  },

  opacity: {
    $schema: {
      title: 'Your website opacities.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType opacity',
        '@studioIcon material-symbols:opacity'
      ]
    },
    noOpacity: '0',
    bright: '0.1',
    light: '0.15',
    soft: '0.3',
    medium: '0.5',
    high: '0.8',
    total: '1'
  },

  font: {
    $schema: {
      title: 'Your website fonts',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType font',
        '@studioIcon material-symbols:font-download-rounded'
      ]
    },
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
  },

  fontWeight: {
    $schema: {
      title: 'Your website font weights.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType font-weight',
        '@studioIcon radix-icons:font-style'
      ]
    },
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

  fontSize: {
    $schema: {
      title: 'Your website font sizes.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType font-size',
        '@studioIcon radix-icons:font-style'
      ]
    },
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

  letterSpacing: {
    $schema: {
      title: 'Your website letter spacings.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType letter-spacing',
        '@studioIcon fluent:font-space-tracking-out-24-filled'
      ]
    },
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },

  lead: {
    $schema: {
      title: 'Your website line heights.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon icon-park-outline:auto-line-height'
      ]
    },
    1: '.025rem',
    2: '.5rem',
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

  text: {
    $schema: {
      title: 'Your website text scales.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType size',
        '@studioIcon material-symbols:format-size-rounded'
      ]
    },
    xs: {
      fontSize: '{fontSize.xs}',
      lineHeight: '{lead.4}'
    },
    sm: {
      fontSize: '{fontSize.sm}',
      lineHeight: '{lead.5}'
    },
    base: {
      fontSize: '{fontSize.base}',
      lineHeight: '{lead.6}'
    },
    lg: {
      fontSize: '{fontSize.lg}',
      lineHeight: '{lead.7}'
    },
    xl: {
      fontSize: '{fontSize.xl}',
      lineHeight: '{lead.7}'
    },
    '2xl': {
      fontSize: '{fontSize.2xl}',
      lineHeight: '{lead.8}'
    },
    '3xl': {
      fontSize: '{fontSize.3xl}',
      lineHeight: '{lead.9}'
    },
    '4xl': {
      fontSize: '{fontSize.4xl}',
      lineHeight: '{lead.10}'
    },
    '5xl': {
      fontSize: '{fontSize.5xl}',
      lineHeight: '{lead.none}'
    },
    '6xl': {
      fontSize: '{fontSize.6xl}',
      lineHeight: '{lead.none}'
    }
  },

  docus: {
    $schema: {
      title: 'All the configurable tokens from Docus.',
      tags: [
        '@studioIcon material-symbols:docs'
      ]
    },
    body: {
      backgroundColor: {
        initial: '{color.white}',
        dark: '{color.black}'
      },
      color: {
        initial: '{color.gray.800}',
        dark: '{color.gray.200}'
      },
      fontFamily: '{font.sans}'
    },
    header: { height: '64px' },
    footer: { height: { initial: '145px', sm: '100px' }, padding: '{space.4} 0' },
    readableLine: '78ch',
    loadingBar: {
      height: '3px',
      gradientColorStop1: '#00dc82',
      gradientColorStop2: '#34cdfe',
      gradientColorStop3: '#0047e1'
    }
  },

  typography: {
    $schema: {
      title: 'All the configurable tokens for your Typography.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType color',
        '@studioIcon material-symbols:article'
      ]
    },
    body: {
      color: {
        initial: '{color.black}',
        dark: '{color.white}'
      },
      backgroundColor: {
        initial: '{color.white}',
        dark: '{color.black}'
      }
    },
    verticalMargin: {
      $schema: {
        title: 'Vertical spacings between paragraphs.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon mingcute:line-height-line'
        ]
      },
      sm: '16px',
      base: '24px'
    },
    letterSpacing: {
      $schema: {
        title: 'Horizontal spacings between letters.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon mingcute:letter-spacing-line'
        ]
      },
      tight: '-0.025em',
      wide: '0.025em'
    },
    fontSize: {
      $schema: {
        title: 'Horizontal spacings between letters.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font-size',
          '@studioIcon mingcute:font-size-fill'
        ]
      },
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px',
      '9xl': '128px'
    },
    fontWeight: {
      $schema: {
        title: 'Font weights used in typography.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font-size',
          '@studioIcon mingcute:bold-fill'
        ]
      },
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
    lead: {
      $schema: {
        title: 'Line heights used in your typography.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font-size',
          '@studioIcon material-symbols:height-rounded'
        ]
      },
      1: '.025rem',
      2: '.5rem',
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
    font: {
      $schema: {
        title: 'Your typography fonts',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font',
          '@studioIcon material-symbols:font-download-rounded'
        ]
      },
      display: '{font.sans}',
      body: '{font.sans}',
      code: '{font.mono}'
    },
    color: {
      $schema: {
        title: 'Your typography color palette.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType color',
          '@studioIcon ph:palette'
        ]
      },
      primary: {
        50: '{color.primary.50}',
        100: '{color.primary.100}',
        200: '{color.primary.200}',
        300: '{color.primary.300}',
        400: '{color.primary.400}',
        500: '{color.primary.500}',
        600: '{color.primary.600}',
        700: '{color.primary.700}',
        800: '{color.primary.800}',
        900: '{color.primary.900}'
      },
      secondary: {
        50: '{color.gray.50}',
        100: '{color.gray.100}',
        200: '{color.gray.200}',
        300: '{color.gray.300}',
        400: '{color.gray.400}',
        500: '{color.gray.500}',
        600: '{color.gray.600}',
        700: '{color.gray.700}',
        800: '{color.gray.800}',
        900: '{color.gray.900}'
      }
    }
  },

  prose: {
    $schema: {
      title: 'All the configurable tokens for your Prose components.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType font-size',
        '@studioIcon lucide:component'
      ]
    },
    p: {
      fontSize: '{typography.fontSize.base}',
      lineHeight: '{typography.lead.normal}',
      margin: '{typography.verticalMargin.base} 0',
      br: {
        margin: '{typography.verticalMargin.base} 0 0 0'
      }
    },
    h1: {
      margin: '0 0 2rem',
      fontSize: '{typography.fontSize.5xl}',
      lineHeight: '{typography.lead.tight}',
      fontWeight: '{typography.fontWeight.bold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.3xl}'
    },
    h2: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.4xl}',
      lineHeight: '{typography.lead.tight}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.2xl}'
    },
    h3: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.3xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.xl}'
    },
    h4: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.2xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.lg}'
    },
    h5: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      iconSize: '{typography.fontSize.lg}'
    },
    h6: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.lg}',
      lineHeight: '{typography.lead.normal}',
      fontWeight: '{typography.fontWeight.semibold}',
      iconSize: '{typography.fontSize.base}'
    },
    strong: {
      fontWeight: '{typography.fontWeight.semibold}'
    },
    img: {
      margin: '{typography.verticalMargin.base} 0'
    },
    a: {
      textDecoration: 'none',
      color: {
        static: {
          initial: 'inherit',
          dark: 'inherit'
        },
        hover: {
          initial: '{typography.color.primary.500}',
          dark: '{typography.color.primary.400}'
        }
      },
      border: {
        width: '1px',
        style: {
          static: 'dashed',
          hover: 'solid'
        },
        color: {
          static: {
            initial: 'currentColor',
            dark: 'currentColor'
          },
          hover: {
            initial: 'currentColor',
            dark: 'currentColor'
          }
        },
        distance: '2px'
      },
      fontWeight: '{typography.fontWeight.medium}',
      hasCode: {
        borderBottom: 'none'
      },
      code: {
        border: {
          width: '{prose.a.border.width}',
          style: '{prose.a.border.style.static}',
          color: {
            static: {
              initial: '{typography.color.secondary.400}',
              dark: '{typography.color.secondary.600}'
            },
            hover: {
              initial: '{typography.color.primary.500}',
              dark: '{typography.color.primary.600}'
            }
          }
        },
        color: {
          static: {
            initial: 'currentColor',
            dark: 'currentColor'
          },
          hover: {
            initial: 'currentColor',
            dark: 'currentColor'
          }
        },
        background: {
          static: {},
          hover: {
            initial: '{typography.color.primary.50}',
            dark: '{typography.color.primary.900}'
          }
        }
      }
    },
    blockquote: {
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '24px',
      quotes: "'201C' '201D' '2018' '2019'",
      color: {
        initial: '{typography.color.secondary.500}',
        dark: '{typography.color.secondary.400}'
      },
      border: {
        width: '4px',
        style: 'solid',
        color: {
          initial: '{typography.color.secondary.200}',
          dark: '{typography.color.secondary.700}'
        }
      }
    },
    ul: {
      listStyleType: 'disc',
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '21px',
      li: {
        markerColor: {
          initial: 'currentColor',
          dark: 'currentColor'
        }
      }
    },
    ol: {
      listStyleType: 'decimal',
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '21px',
      li: {
        markerColor: {
          initial: 'currentColor',
          dark: 'currentColor'
        }
      }
    },
    li: {
      margin: '{typography.verticalMargin.sm} 0',
      listStylePosition: 'outside'
    },
    hr: {
      margin: '{typography.verticalMargin.base} 0',
      style: 'solid',
      width: '1px',
      color: {
        initial: '{typography.color.secondary.200}',
        dark: '{typography.color.secondary.800}'
      }
    },
    table: {
      margin: '{typography.verticalMargin.base} 0',
      textAlign: 'start',
      fontSize: '{typography.fontSize.sm}',
      lineHeight: '{typography.lead.6}'
    },
    thead: {
      border: {
        width: '0px',
        style: 'solid',
        color: {
          initial: '{typography.color.secondary.300}',
          dark: '{typography.color.secondary.600}'
        }
      },
      borderBottom: {
        width: '1px',
        style: 'solid',
        color: {
          initial: '{typography.color.secondary.200}',
          dark: '{typography.color.secondary.800}'
        }
      }
    },
    th: {
      color: {
        initial: '{typography.color.secondary.600}',
        dark: '{typography.color.secondary.400}'
      },
      padding: '0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}',
      fontWeight: '{typography.fontWeight.semibold}',
      textAlign: 'inherit'
    },
    tbody: {
      tr: {
        borderBottom: {
          width: '1px',
          style: 'dashed',
          color: {
            initial: '{typography.color.secondary.200}',
            dark: '{typography.color.secondary.800}'
          }
        }
      },
      td: {
        padding: '{typography.verticalMargin.sm}'
      },
      code: {
        inline: {
          fontSize: '{typography.fontSize.sm}'
        }
      }
    },
    code: {
      block: {
        fontSize: '{typography.fontSize.sm}',
        margin: '{typography.verticalMargin.base} 0',
        border: {
          width: '1px',
          style: 'solid',
          color: {
            initial: '{typography.color.secondary.200}',
            dark: '{typography.color.secondary.800}'
          }
        },
        color: {
          initial: '{typography.color.secondary.700}',
          dark: '{typography.color.secondary.200}'
        },
        backgroundColor: {
          initial: '{typography.color.secondary.100}',
          dark: '{typography.color.secondary.900}'
        },
        backdropFilter: {
          initial: 'contrast(1)',
          dark: 'contrast(1)'
        },
        pre: {
          padding: '{typography.verticalMargin.sm}'
        }
      },
      inline: {
        borderRadius: '{radii.xs}',
        padding: '0.2rem 0.375rem 0.2rem 0.375rem',
        fontSize: '{typography.fontSize.sm}',
        fontWeight: '{typography.fontWeight.normal}',
        color: {
          initial: '{typography.color.secondary.700}',
          dark: '{typography.color.secondary.200}'
        },
        backgroundColor: {
          initial: '{typography.color.secondary.100}',
          dark: '{typography.color.secondary.800}'
        }
      }
    }
  },

  elements: {
    $schema: {
      title: 'All the configurable tokens for your Elements.',
      tags: [
        '@studioIcon uiw:component'
      ]
    },
    text: {
      primary: {
        color: {
          static: {
            initial: '{color.gray.900}',
            dark: '{color.gray.50}'
          },
          // TODO: add `hover` state
          hover: {}
        }
      },
      secondary: {
        color: {
          static: {
            initial: '{color.gray.500}',
            dark: '{color.gray.400}'
          },
          hover: {
            initial: '{color.gray.700}',
            dark: '{color.gray.200}'
          }
        }
      }
    },

    container: {
      $schema: {
        title: 'Main container sizings.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon material-symbols:width-full-outline'
        ]
      },
      maxWidth: '80rem',
      padding: {
        initial: '{space.4}',
        xs: '{space.4}',
        sm: '{space.6}',
        md: '{space.6}'
      }
    },

    backdrop: {
      $schema: {
        title: 'Backdrops used in Elements.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon material-symbols:blur-circular'
        ]
      },
      // TODO: add filter tokens in `tokens` package
      filter: 'saturate(200%) blur(20px)',
      background: {
        // TODO: rgba 80% from color.white
        initial: '#fffc',
        // TODO: rgba 80% from color.black
        dark: '#0c0d0ccc'
      }
    },

    border: {
      $schema: {
        title: 'Borders used in Elements.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType color',
          '@studioIcon material-symbols:border-all-outline-rounded'
        ]
      },
      primary: {
        static: {
          initial: '{color.gray.100}',
          dark: '{color.gray.900}'
        },
        hover: {
          initial: '{color.gray.200}',
          dark: '{color.gray.800}'
        }
      },
      secondary: {
        static: {
          initial: '{color.gray.200}',
          dark: '{color.gray.800}'
        },
        hover: {
          initial: '',
          dark: ''
        }
      }
    },

    surface: {
      $schema: {
        title: 'Surfaces used in Elements.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType color',
          '@studioIcon fluent:surface-hub-20-filled'
        ]
      },
      primary: {
        backgroundColor: {
          initial: '{color.gray.100}',
          dark: '{color.gray.900}'
        }
      },
      secondary: {
        backgroundColor: {
          initial: '{color.gray.200}',
          dark: '{color.gray.800}'
        }
      }
    },

    state: {
      $schema: {
        title: 'Color states used in Elements.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType color',
          '@studioIcon mdi:palette-advanced'
        ]
      },
      neutral: {
        color: {
          primary: {
            initial: '{color.gray.500}',
            dark: '{color.gray.500}'
          },
          secondary: {
            initial: '{color.gray.600}',
            dark: '{color.gray.400}'
          },
          tertiary: {
            initial: '{color.gray.700}',
            dark: '{color.gray.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.gray.50}',
            dark: '{color.gray.900}'
          },
          secondary: {
            initial: '{color.gray.100}',
            dark: '{color.gray.800}'
          },
          tertiary: {
            initial: '{color.gray.200}',
            dark: '{color.gray.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.gray.100}',
            dark: '{color.gray.800}'
          },
          secondary: {
            initial: '{color.gray.200}',
            dark: '{color.gray.700}'
          }
        }
      },
      primary: {
        color: {
          primary: {
            initial: '{color.primary.500}',
            dark: '{color.primary.500}'
          },
          secondary: {
            initial: '{color.primary.600}',
            dark: '{color.primary.400}'
          },
          tertiary: {
            initial: '{color.primary.700}',
            dark: '{color.primary.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.primary.50}',
            dark: '{color.primary.900}'
          },
          secondary: {
            initial: '{color.primary.100}',
            dark: '{color.primary.800}'
          },
          tertiary: {
            initial: '{color.primary.200}',
            dark: '{color.primary.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.primary.100}',
            dark: '{color.primary.800}'
          },
          secondary: {
            initial: '{color.primary.200}',
            dark: '{color.primary.700}'
          }
        }
      },
      info: {
        color: {
          primary: {
            initial: '{color.blue.500}',
            dark: '{color.blue.500}'
          },
          secondary: {
            initial: '{color.blue.600}',
            dark: '{color.blue.400}'
          },
          tertiary: {
            initial: '{color.blue.700}',
            dark: '{color.blue.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.blue.50}',
            dark: '{color.blue.900}'
          },
          secondary: {
            initial: '{color.blue.100}',
            dark: '{color.blue.800}'
          },
          tertiary: {
            initial: '{color.blue.200}',
            dark: '{color.blue.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.blue.100}',
            dark: '{color.blue.800}'
          },
          secondary: {
            initial: '{color.blue.200}',
            dark: '{color.blue.700}'
          }
        }
      },
      success: {
        color: {
          primary: {
            initial: '{color.green.500}',
            dark: '{color.green.500}'
          },
          secondary: {
            initial: '{color.green.600}',
            dark: '{color.green.400}'
          },
          tertiary: {
            initial: '{color.green.700}',
            dark: '{color.green.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.green.50}',
            dark: '{color.green.900}'
          },
          secondary: {
            initial: '{color.green.100}',
            dark: '{color.green.800}'
          },
          tertiary: {
            initial: '{color.green.200}',
            dark: '{color.green.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.green.100}',
            dark: '{color.green.800}'
          },
          secondary: {
            initial: '{color.green.200}',
            dark: '{color.green.700}'
          }
        }
      },
      warning: {
        color: {
          primary: {
            initial: '{color.yellow.500}',
            dark: '{color.yellow.500}'
          },
          secondary: {
            initial: '{color.yellow.600}',
            dark: '{color.yellow.400}'
          },
          tertiary: {
            initial: '{color.yellow.700}',
            dark: '{color.yellow.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.yellow.50}',
            dark: '{color.yellow.900}'
          },
          secondary: {
            initial: '{color.yellow.100}',
            dark: '{color.yellow.800}'
          },
          tertiary: {
            initial: '{color.yellow.200}',
            dark: '{color.yellow.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.yellow.100}',
            dark: '{color.yellow.800}'
          },
          secondary: {
            initial: '{color.yellow.200}',
            dark: '{color.yellow.700}'
          }
        }
      },
      danger: {
        color: {
          primary: {
            initial: '{color.red.500}',
            dark: '{color.red.500}'
          },
          secondary: {
            initial: '{color.red.600}',
            dark: '{color.red.400}'
          },
          tertiary: {
            initial: '{color.red.700}',
            dark: '{color.red.100}'
          }
        },
        backgroundColor: {
          primary: {
            initial: '{color.red.50}',
            dark: '{color.red.900}'
          },
          secondary: {
            initial: '{color.red.100}',
            dark: '{color.red.800}'
          },
          tertiary: {
            initial: '{color.red.200}',
            dark: '{color.red.700}'
          }
        },
        borderColor: {
          primary: {
            initial: '{color.red.100}',
            dark: '{color.red.800}'
          },
          secondary: {
            initial: '{color.red.200}',
            dark: '{color.red.700}'
          }
        }
      }
    },

    alert: {
      width: '100%',
      paddingX: '{space.4}',
      paddingY: '{space.4}',
      borderRadius: '{radii.sm}',
      borderWidth: '1px',
      borderStyle: 'solid',
      icon: {
        width: '{space.6}',
        height: '{space.6}',
        marginInlineEnd: '{space.3}'
      },
      closeButton: {
        padding: '{space.1}',
        marginInlineStart: '{space.2}',
        border: {
          radius: '{radii.xs}'
        },
        icon: {
          width: '{space.4}',
          height: '{space.4}'
        },
        boxShadow: {
          focus: '0 0 0 2px'
        }
      }
    },

    badge: {
      paddingX: '{space.3}',
      paddingY: '{space.1}',
      fontSize: '{text.base.fontSize}',
      fontWeight: '{fontWeight.normal}',
      lineHeight: '{typography.lead.none}',
      letterSpacing: '{letterSpacing.tight}',
      borderRadius: '{radii.lg}',
      borderWidth: '1px',
      borderStyle: 'solid'
    },

    buttonLink: {
      fontWeight: '{fontWeight.semibold}',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: '{radii.sm}',
      width: 'fit-content',
      icon: {
        marginInlineEnd: '{space.2}'
      },
      small: {
        padding: '{space.1} {space.2}',
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}'
      },
      medium: {
        padding: '{space.2} {space.4}',
        fontSize: '{text.base.fontSize}',
        lineHeight: '{text.base.lineHeight}'
      },
      large: {
        padding: '{space.2} {space.4}',
        fontSize: '{text.lg.fontSize}',
        lineHeight: '{text.lg.lineHeight}'
      },
      giant: {
        padding: '{space.3} {space.5}',
        fontSize: '{text.xl.fontSize}',
        lineHeight: '{text.xl.lineHeight}'
      }
    },

    codeCollapse: {
      margin: '{prose.code.block.margin}',
      borderRadius: '{radii.md}',
      borderWidth: '{prose.code.block.border.width}',
      borderStyle: '{prose.code.block.border.style}',
      borderColor: '{prose.code.block.border.color}',
      button: {
        bottom: '{space.2}',
        left: '50%',
        transform: 'translateX(-50%)',
        paddingY: '{space.1}',
        paddingX: '{space.3}',
        borderRadius: '{radii.sm}',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '{elements.border.secondary.static}',
        backgroundColor: {
          initial: '{color.gray.50}',
          dark: '{color.black}'
        },
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        color: '{elements.text.secondary.color.static}'
      },
      gradientBackdrop: {
        height: '50px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, {prose.code.block.backgroundColor} 100%)'
      }
    },

    callout: {
      width: '100%',
      paddingX: '{space.4}',
      paddingY: '{space.4}',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '{radii.sm}',
      icon: {
        width: '{space.6}',
        height: '{space.7}',
        marginInlineEnd: '{space.3}',
        fontSize: '{text.xl.fontSize}',
        lineHeight: '{text.xl.lineHeight}'
      },
      title: {
        fontSize: '{text.xl.fontSize}',
        lineHeight: '{text.xl.lineHeight}',
        fontWeight: '{fontWeight.medium}',
        marginBottom: '{space.1}'
      }
    },

    disclosure: {
      width: '100%',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '{radii.sm}',
      summary: {
        padding: '1rem',
        borderRadius: '{radii.sm}',
        outline: {
          focus: '2px solid'
        },
        icon: {
          width: '{space.6}',
          height: '{space.6}',
          marginInlineEnd: '{space.3}'
        },
        chevron: {
          borderRadius: '{radii.sm}',
          padding: '2px',
          width: '{space.5}',
          height: '{space.5}',
          transition: 'transform 200ms ease-in-out',
          transform: 'rotate(-90deg)'
        }
      },
      content: {
        padding: '1rem',
        firstChild: {
          marginTop: '0px'
        },
        lastChild: {
          marginBottom: '0px'
        },
        verticalMargin: '{typography.verticalMargin.sm}'
      },
      opened: {
        summary: {
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          borderTopLeftRadius: '{radii.sm}',
          borderTopRightRadius: '{radii.sm}',
          transform: 'rotate(0deg)'
        }
      }
    },

    tooltip: {
      trigger: {
        outline: {
          focusVisible: '2px solid {color.primary.500}'
        }
      },
      content: {
        backgroundColor: {
          initial: '{color.gray.700}',
          dark: '{color.gray.900}'
        },
        color: '{color.gray.100}',
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        fontWeight: '{typography.fontWeight.normal}',
        borderWidth: {
          initial: '0px',
          dark: '1px'
        },
        borderStyle: {
          initial: 'none',
          dark: 'solid'
        },
        borderColor: {
          initial: 'transparent',
          dark: '{color.gray.800}'
        },
        borderRadius: '{radii.sm}',
        padding: '{space.3} {space.4}'
      }
    },

    list: {
      item: {
        marginBottom: '{space.3}',
        lastChild: {
          marginBottom: '0px'
        },
        icon: {
          marginInlineEnd: '{space.3}',
          padding: '{space.1}',
          borderRadius: '{radii.full}',
          width: '{space.4}',
          height: '{space.4}'
        }
      }
    },

    blockHero: {
      padding: {
        initial: '{space.20} 0',
        sm: '{space.24} 0',
        lg: '{space.32} 0'
      },
      layout: {
        gap: {
          initial: '{space.16}',
          xl: '{space.8}'
        },
        gridTemplateColumns: {
          initial: 'none',
          xl: 'repeat(3, minmax(0, 1fr))'
        }
      },
      content: {
        gridColumn: {
          initial: 'auto',
          xl: 'span 2 / span 2'
        },
        announce: {
          textAlign: {
            initial: 'center',
            xl: 'start'
          },
          marginBottom: '{space.2}'
        },
        title: {
          fontSize: {
            initial: '{text.4xl.fontSize}',
            sm: '{text.5xl.fontSize}',
            lg: '{text.6xl.fontSize}'
          },
          lineHeight: {
            initial: '{text.4xl.lineHeight}',
            sm: '{text.5xl.lineHeight}',
            lg: '{text.6xl.lineHeight}'
          },
          color: '{elements.text.primary.color.static}',
          fontWeight: '{fontWeight.bold}',
          letterSpacing: '{letterSpacing.tight}',
          paddingX: {
            initial: '{space.8}',
            lg: '{space.0}'
          },
          textAlign: {
            initial: 'center',
            xl: 'start'
          },
          marginBottom: '{space.8}'
        },
        description: {
          textAlign: {
            initial: 'center',
            xl: 'start'
          },
          marginBottom: '{space.12}',
          fontSize: '{text.lg.fontSize}',
          lineHeight: '{text.lg.lineHeight}',
          color: '{elements.text.secondary.color.static}',
          paddingX: '{space.2}'
        },
        extra: {
          justifyContent: {
            initial: 'center',
            xl: 'flex-start'
          },
          marginBottom: '{space.16}'
        },
        actions: {
          flexDirection: {
            initial: 'column',
            sm: 'row'
          },
          gap: {
            initial: '{space.2}',
            sm: '{space.3}'
          },
          justifyContent: {
            initial: 'center',
            xl: 'flex-start'
          },
          cta: {
            marginBottom: '0px'
          }
        }
      }
    },

    terminal: {
      maxWidth: '{space.128}',
      height: '{space.64}',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '{elements.border.secondary.static}',
      borderRadius: '{radii.md}',
      backgroundColor: '{elements.surface.primary.backgroundColor}',
      header: {
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '{elements.border.secondary.static}',
        height: '{space.12}'
      },
      window: {
        fontFamily: '{font.mono}',
        fontSize: '{text.sm.fontSize}'
      },
      copied: {
        scrim: {
          backgroundColor: {
            initial: '{color.gray.100}',
            dark: '{color.gray.900}'
          },
          opacity: '0.75'
        },
        content: {
          color: {
            initial: '{color.gray.900}',
            dark: '{color.gray.100}'
          }
        }
      }
    },

    card: {
      padding: '{space.8}',
      borderRadius: '{radii.xl}',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '{elements.border.primary.static}',
      backgroundColor: '{elements.backdrop.background}',
      backdropFilter: '{elements.backdrop.filter}',
      icon: {
        marginBottom: '{space.2}',
        width: '{space.6}',
        height: '{space.6}'
      },
      title: {
        marginBottom: '{space.2}',
        fontSize: '{text.lg.fontSize}',
        lineHeight: '{text.lg.lineHeight}',
        fontWeight: '{fontWeight.semibold}',
        color: '{elements.text.primary.color.static}'
      },
      description: {
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        fontWeight: '{fontWeight.medium}',
        color: '{elements.text.secondary.color.static}'
      }
    },

    cardGrid: {
      paddingBottom: {
        initial: '{space.20}',
        sm: '{space.24}',
        md: '{space.32}'
      },
      title: {
        fontSize: {
          initial: '{text.3xl.fontSize}',
          sm: '{text.4xl.fontSize}'
        },
        lineHeight: {
          initial: '{text.3xl.lineHeight}',
          sm: '{text.4xl.lineHeight}'
        },
        marginBottom: '{space.8}',
        fontWeight: '{fontWeight.bold}',
        letterSpacing: '{letterSpacing.tight}',
        color: '{elements.text.primary.color.static}'
      },
      layout: {
        gridTemplateColumns: {
          initial: 'none',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))'
        },
        gap: {
          initial: '{space.4}',
          '2xl': '{space.8}'
        }
      }
    }
  },

  utils: {
    my: (value: PropertyValue<'margin'>) => {
      return {
        marginTop: value,
        marginBottom: value
      }
    },
    mx: (value: PropertyValue<'margin'>) => {
      return {
        marginLeft: value,
        marginRight: value
      }
    },
    py: (value: PropertyValue<'margin'>) => {
      return {
        paddingTop: value,
        paddingBottom: value
      }
    },
    px: (value: PropertyValue<'margin'>) => {
      return {
        paddingLeft: value,
        paddingRight: value
      }
    },
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    } as any,
    lineClamp: (lines: number | string) => ({
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': lines
    }) as any,
    text: (size: keyof PinceauTheme['text']) => ({
      fontSize: `{text.${size}.fontSize}`,
      lineHeight: `{text.${size}.lineHeight}`
    }),
    stateColors: (value: any) => {
      return {
        color: `{elements.state.${value}.color.primary}`,
        backgroundColor: `{elements.state.${value}.backgroundColor.primary}`,
        borderColor: `{elements.state.${value}.borderColor.primary}`,
        '.content': {
          color: `{elements.state.${value}.color.tertiary}`
        },
        ':deep(p code)': {
          backgroundColor: `{elements.state.${value}.backgroundColor.secondary}`
        },
        ':deep(code)': {
          backgroundColor: `{elements.state.${value}.backgroundColor.secondary}`
        },
        ':deep(a code)': {
          borderColor: `{elements.state.${value}.borderColor.primary}`
        },
        ':deep(a)': {
          borderColor: 'currentColor',
          code: {
            backgroundColor: `{elements.state.${value}.backgroundColor.primary}`
          },
          '&:hover': {
            color: `{elements.state.${value}.color.secondary}`,
            borderColor: 'currentColor',
            code: {
              backgroundColor: `{elements.state.${value}.backgroundColor.secondary}`,
              color: `{elements.state.${value}.color.secondary}`,
              borderColor: `{elements.state.${value}.borderColor.secondary}`
            }
          }
        }
      }
    }
  }
})
