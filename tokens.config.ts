import { defineTheme } from 'pinceau'
import nuxtThemeTokens from '@nuxt-themes/tokens/tokens'

export default defineTheme({
  colors: {
    primary: (nuxtThemeTokens.colors as any).lightblue
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
  backdrop: {
    filter: 'saturate(200%) blur(20px)',
    background: {
      // TODO: rgba 80% from colors.white
      initial: '#fffc',
      // TODO: rgba 80% from colors.black
      dark: '#0c0d0ccc'
    }
  },
  utils: {
    stateColors: (value: any) => {
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
    }
  }
})
