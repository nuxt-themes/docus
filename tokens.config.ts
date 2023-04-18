import { defineTheme } from 'pinceau'
import theme from '@nuxt-themes/tokens/config'

export default defineTheme({
  temp: {
    color: {
      white: '255, 255, 255',
      black: '14, 13, 13',
      gray: {
        50: '251, 251, 251',
        100: '246, 245, 244',
        200: '236, 235, 232',
        300: '219, 217, 211',
        400: '173, 169, 164',
        500: '151, 148, 143',
        600: '103, 99, 93',
        700: '54, 51, 46',
        800: '32, 30, 27',
        900: '18, 17, 16'
      }
    }
  },
  color: {
    primary: theme.color.lightblue,
    shadow: {
      initial: '{color.gray.300}',
      dark: 'black'
    }
    // black: '14, 13, 13',
    // gray: {
    //   50: '251, 251, 251',
    //   100: '246, 245, 244',
    //   200: '236, 235, 232',
    //   300: '219, 217, 211',
    //   400: '173, 169, 164',
    //   500: '151, 148, 143',
    //   600: '103, 99, 93',
    //   700: '54, 51, 46',
    //   800: '32, 30, 27',
    //   900: '18, 17, 16'
    // }
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
  docus: {
    $schema: {
      title: 'All the configurable tokens from Docus.',
      tags: [
        '@studioIcon material-symbols:docs'
      ]
    },
    body: {
      backgroundColor: {
        initial: '{color.gray.50}',
        dark: '{color.black}'
      },
      color: {
        initial: '{color.gray.800}',
        dark: '{color.gray.200}'
      },
      fontFamily: '{font.sans}'
    },
    header: {
      height: '64px',
      logo: {
        height: {
          initial: '{space.6}',
          sm: '{space.7}'
        }
      },
      title: {
        fontSize: '{fontSize.2xl}',
        fontWeight: '{fontWeight.bold}',
        color: {
          static: {
            initial: '{color.gray.900}',
            dark: '{color.gray.100}'
          },
          hover: '{color.primary.500}'
        }
      }
    },
    footer: { height: { initial: '145px', sm: '100px' }, padding: '{space.4} 0' },
    readableLine: '78ch',
    loadingBar: {
      height: '3px',
      gradientColorStop1: '#00dc82',
      gradientColorStop2: '#34cdfe',
      gradientColorStop3: '#0047e1'
    },
    docs: {
      page: {
        layout: {
          spacing: {
            initial: '0px',
            lg: '{space.6}',
            xl: '{space.8}'
          }
        }
      },
      prevNext: {
        gap: '{space.8}',
        padding: '{space.6}',
        backgroundColor: {
          initial: '{color.gray.100}',
          dark: '{color.gray.900}'
        },
        borderRadius: '{radii.2xs}',
        border: {
          initial: '1px solid {color.gray.200}',
          dark: 'none'
        },
        boxShadow: {
          static: {
            initial: 'none',
            dark: 'inset 0.25px 0.5px 0px hsla(0,0%,100%,.1), inset -0.25px 0px 0px hsla(0,0%,100%,.1), {shadow.xs}'
          },
          hover: {
            initial: 'none',
            dark: 'inset 0.25px 0.5px 0px hsla(0,0%,100%,.1), inset -0.25px 0px 0px hsla(0,0%,100%,.1), {shadow.lg}'
          }
        },
        title: {
          color: {
            hover: '{color.primary.500}'
          },
          fontWeight: '{fontWeight.medium}',
          marginBottom: '{space.2}'
        },
        directory: {
          marginBottom: '{space.3}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          color: '{color.gray.500}'
        },
        icon: {
          size: '{space.8}',
          marginBottom: '{space.4}'
        },
        description: {
          fontSize: '{text.sm.fontSize}',
          lineHeight: '{text.sm.lineHeight}',
          color: '{color.gray.500}'
        }
      }
    }
  },
  typography: {
    color: {
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
  elements: {
    backdrop: {
      $schema: {
        title: 'Backdrops used in Elements.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon material-symbols:blur-circular'
        ]
      },
      background: {
        initial: 'rgba({temp.color.gray.50}, 0.8)',
        dark: 'rgba({temp.color.black}, 0.8)'
      }
    }
    // border
    // surface
  }
})
