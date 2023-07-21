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
    primary: theme.color.orange,
    secondary: theme.color.purple,
    shadow: {
      initial: '{color.gray.400}',
      dark: '{color.black}'
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
        dark: '{color.gray.900}'
      },
      color: {
        initial: '{color.gray.800}',
        dark: '{color.gray.200}'
      },
      fontFamily: '{font.sans}'
    },
    readableLine: '78ch',
    layout: {
      // container: {
      //   $schema: {
      //     title: 'Main container sizings.',
      //     tags: [
      //       '@studioInput design-token',
      //       '@studioInputTokenType size',
      //       '@studioIcon material-symbols:width-full-outline'
      //     ]
      //   },
      //   maxWidth: '80rem',
      //   padding: {
      //     initial: '{space.4}',
      //     xs: '{space.4}',
      //     sm: '{space.6}',
      //     xl: '{space.8}'
      //   }
      // },
      docs: {
        spacing: {
          initial: '0px',
          lg: '{space.6}',
          xl: '{space.8}'
        }
      }
    },
    app: {
      loadingBar: {
        height: '3px',
        gradientColorStop1: '{color.primary.600}',
        gradientColorStop2: '{color.primary.500}',
        gradientColorStop3: '{color.secondary.500}'
      },
      header: {
        height: '64px',
        // logo: {
        //   height: {
        //     initial: '{space.6}',
        //     sm: '{space.7}'
        //   }
        // },
        backdropFilter: '{elements.backdrop.filter}',
        backgroundColor: '{elements.backdrop.background}',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '{elements.border.primary.static}',
        // title: {
        //   fontSize: '{fontSize.2xl}',
        //   fontWeight: '{fontWeight.bold}',
        //   color: {
        //     static: {
        //       initial: '{color.gray.900}',
        //       dark: '{color.gray.100}'
        //     },
        //     hover: '{color.primary.500}'
        //   }
        // },
        icon: {
          size: '{space.4}'
        },
        layout: {
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: '{space.2}',
          left: {
            gridColumn: 'span 4 / span 4'
          },
          center: {
            gridColumn: 'span 4 / span 4'
          },
          right: {
            gridColumn: 'span 4 / span 4'
          }
        },
        drawer: {
          button: {
            color: {
              static: {
                initial: '{color.gray.500}',
                dark: '{color.gray.400}'
              },
              hover: {
                initial: '{color.gray.700}',
                dark: '{color.gray.200}'
              }
            },
            zIndex: '10',
            padding: '{space.4}',
            paddingInlineStart: '0px'
          },
          menu: {
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
            borderRightColor: '{elements.border.primary.static}',
            backgroundColor: {
              initial: '{color.gray.50}',
              dark: '{color.gray.900}'
            },
            paddingX: {
              initial: '{space.4}',
              sm: '{space.6}'
            },
            header: {
              height: '{docus.app.header.height}',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: '{elements.border.primary.static}',
              gap: '{space.2}',
              icon: {
                size: '{space.4}'
              }
            },
            links: {
              paddingTop: '{space.6}'
            }
          }
        }
      },
      footer: {
        height: {
          initial: '145px',
          sm: '100px'
        },
        padding: '{space.4} 0',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: '{elements.border.primary.static}',
        layout: {
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          justifyItems: {
            initial: 'center',
            sm: 'stretch'
          },
          gap: '{space.2}',
          left: {
            gridColumn: {
              initial: 'span 12 / span 12',
              sm: 'span 3 / span 3'
            },
            order: {
              initial: '1',
              sm: '0'
            },
            paddingY: '{space.4}'
          },
          center: {
            gridColumn: {
              initial: 'span 12 / span 12',
              sm: 'span 6 / span 6'
            },
            flexDirection: {
              initial: 'column',
              sm: 'row'
            },
            alignItems: 'center',
            justifyContent: {
              initial: 'flex-start',
              sm: 'center'
            }
          },
          right: {
            gridColumn: {
              initial: 'span 12 / span 12',
              sm: 'span 3 / span 3'
            },
            marginInlineEnd: {
              initial: '0px',
              sm: 'calc(0px - {space.4})'
            }
          }
        },
        credits: {
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          icon: {
            size: '{space.4}',
            marginInlineEnd: '{space.2}',
            color: 'currentColor'
          }
        },
        icon: {
          size: '{space.4}'
        },
        textLink: {
          padding: '{space.2}',
          fontSize: '{text.sm.fontSize}',
          lineHeight: '{text.sm.lineHeight}',
          fontWeight: '{fontWeight.medium}'
        },
        iconLink: {
          padding: '{space.4}'
        }
      },
      navigation: {
        gap: '{space.2}',
        vertical: {
          marginBottom: '{space.4}',
          gap: '{space.0}',
          link: {
            padding: '{space.2} 0'
          }
        },
        link: {
          padding: '{space.1} {space.2}',
          fontWeight: '{fontWeight.semibold}',
          gap: '{space.2}',
          fontSize: '{fontSize.sm}',
          icon: {
            size: '{space.5}'
          }
        }
      },
      // colorMode: {
      //   padding: '{space.4}',
      //   color: {
      //     static: '{elements.text.secondary.color.static}',
      //     hover: '{elements.text.secondary.color.hover}'
      //   }
      // },
      textDirection: {
        padding: '{space.4}'
      },
      socialIcons: {
        padding: '{space.4}',
        color: {
          static: '{elements.text.secondary.color.static}',
          hover: '{elements.text.secondary.color.hover}'
        }
      }
    },
    docs: {
      prevNext: {
        gap: '{space.8}',
        padding: '{space.6}',
        backgroundColor: {
          initial: '{color.gray.50}',
          dark: '{color.gray.900}'
        },
        borderRadius: '{radii.2xs}',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: {
          initial: '{color.gray.200}',
          dark: '{color.gray.800}'
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
      },
      search: {
        backdropFilter: 'blur(24px)',
        input: {
          borderRadius: '{radii.2xs}',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: {
            initial: '{color.gray.200}',
            dark: 'transparent'
          },
          fontSize: '{fontSize.sm}',
          gap: '{space.2}',
          padding: '{space.2} {space.4}',
          backgroundColor: {
            initial: 'rgba({temp.color.gray.200}, 0.5)',
            dark: 'rgba({temp.color.gray.800}, 0.5)'
          },
        },
        results: {
          window: {
            marginX: {
              initial: '0',
              sm: '{space.4}'
            },
            borderRadius: {
              initial: 'none',
              sm: '{radii.xs}'
            },
            marginTop: {
              initial: '0',
              sm: '20vh'
            },
            maxWidth: '640px',
            maxHeight: {
              initial: '100%',
              sm: '320px'
            },
          },
          selected: {
            backgroundColor: {
              initial: 'rgba({temp.color.gray.300}, 0.5)',
              dark: 'rgba({temp.color.gray.700}, 0.5)'
            },
          },
          highlight: {
            color: 'white',
            backgroundColor: '{color.primary.500}'
          }
        }
      }
    },
    landing: {
      // hero: {
      //   padding: {
      //     initial: '{space.20} 0',
      //     sm: '{space.24} 0',
      //     lg: '{space.24} 0 {space.32} 0'
      //   },
      //   layout: {
      //     gap: {
      //       initial: '{space.16}',
      //       xl: '{space.4}'
      //     },
      //     gridTemplateColumns: {
      //       initial: 'none',
      //       xl: 'repeat(12, minmax(0, 1fr))'
      //     }
      //   },
      //   content: {
      //     gridColumn: {
      //       initial: 'auto',
      //       xl: 'span 7 / span 7'
      //     },
      //     alignItems: {
      //       initial: 'center',
      //       xl: 'flex-start'
      //     },
      //     announce: {
      //       marginBottom: '{space.8}'
      //     },
      //     title: {
      //       fontSize: {
      //         initial: '{text.4xl.fontSize}',
      //         sm: '{text.5xl.fontSize}',
      //         lg: '{text.6xl.fontSize}'
      //       },
      //       lineHeight: {
      //         initial: '{text.4xl.lineHeight}',
      //         sm: '{text.5xl.lineHeight}',
      //         lg: '{text.6xl.lineHeight}'
      //       },
      //       color: '{elements.text.primary.color.static}',
      //       fontWeight: '{fontWeight.semibold}',
      //       letterSpacing: '{letterSpacing.tight}',
      //       paddingX: {
      //         initial: '{space.8}',
      //         md: '{space.12}',
      //         lg: '{space.14}',
      //         xl: '{space.0}'
      //       },
      //       textAlign: {
      //         initial: 'center',
      //         xl: 'start'
      //       },
      //       marginBottom: '{space.8}',
      //       gradientText: {
      //         initial: 'linear-gradient(114deg, {color.gray.900} 10%, {color.gray.600} 54%, {color.gray.500})',
      //         dark: 'linear-gradient(114deg, {color.gray.400} 10%, {color.gray.100} 54%, {color.gray.700})'
      //       },
      //       mixBlendMode: 'normal'
      //     },
      //     description: {
      //       textAlign: {
      //         initial: 'center',
      //         xl: 'start'
      //       },
      //       marginBottom: '{space.12}',
      //       fontSize: {
      //         initial: '{text.lg.fontSize}',
      //         lg: '{text.xl.fontSize}'
      //       },
      //       lineHeight: {
      //         initial: '{text.lg.lineHeight}',
      //         lg: '{text.xl.lineHeight}'
      //       },
      //       color: '{elements.text.secondary.color.static}',
      //       paddingX: {
      //         initial: '{space.2}',
      //         md: '{space.6}',
      //         xl: '{space.0}'
      //       },
      //       mixBlendMode: 'normal'
      //     },
      //     extra: {
      //       justifyContent: {
      //         initial: 'center',
      //         xl: 'flex-start'
      //       },
      //       marginBottom: '{space.16}'
      //     },
      //     actions: {
      //       flexDirection: {
      //         initial: 'column',
      //         sm: 'row'
      //       },
      //       gap: {
      //         initial: '{space.2}',
      //         sm: '{space.3}'
      //       },
      //       justifyContent: {
      //         initial: 'center',
      //         xl: 'flex-start'
      //       }
      //     }
      //   },
      //   support: {
      //     gridColumn: {
      //       initial: 'auto',
      //       xl: 'span 5 / span 5'
      //     }
      //   }
      // },
      card: {
        padding: '2px',
        borderRadius: '{radii.sm}',
        borderWidth: '0px',
        borderStyle: 'solid',
        borderColor: 'rgba({temp.color.gray.800}, 0.5)',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backdropFilter: '{elements.backdrop.filter}',
        boxShadow: 'none',
        minHeight: 'auto',
        wrapper: {
          borderRadius: '{radii.xs}',
          backgroundColor: 'transparent',
          backgroundImage: {
            initial: 'linear-gradient(135deg, rgba({temp.color.gray.100}, 0.5), rgba({temp.color.gray.200}, .5))',
            dark: 'linear-gradient(135deg, rgba({temp.color.gray.800}, 0.4), rgba({temp.color.gray.800}, .7))'
          }
        },
        noise: {
          opacity: {
            initial: '0.2',
            dark: '0.2'
          }
        },
        content: {
          padding: '{space.8}'
        },
        icon: {
          marginBottom: '{space.4}',
          width: '{space.6}',
          height: '{space.6}',
          padding: '{space.3}',
          borderRadius: '{radii.xs}',
          backgroundColor: {
            initial: 'rgba({temp.color.gray.300}, 0.2)',
            dark: 'rgba({temp.color.gray.900}, 0.2)'
          },
          boxShadow: 'inset -0.5px 0.5px 0px hsla(0,0%,100%,.1), inset 0.5px 0px 0px hsla(0,0%,100%,.1)'
        },
        title: {
          marginBottom: '{space.2}',
          fontSize: '{text.2xl.fontSize}',
          lineHeight: '{text.2xl.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          letterSpacing: '{letterSpacing.tight}',
          color: '{elements.text.primary.color.static}'
        },
        description: {
          fontSize: '{text.sm.fontSize}',
          lineHeight: '{text.sm.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          color: '{elements.text.secondary.color.static}'
        }
      },
      terminal: {
        maxWidth: '{space.128}',
        height: '{space.64}',
        borderWidth: '0px',
        borderStyle: 'solid',
        borderColor: '{elements.border.primary.static}',
        borderRadius: '{radii.xs}',
        backgroundColor: {
          initial: 'rgba({temp.color.gray.200}, 0.7)',
          dark: 'rgba({temp.color.gray.900}, 0.7)'
        },
        boxShadow: 'inset 0px 0px 0px 1px rgba({temp.color.gray.600}, 0.3), {shadow.2xl}',
        backdropFilter: 'blur(3px)',
        header: {
          borderBottomWidth: '0px',
          borderBottomStyle: 'solid',
          borderBottomColor: '{elements.border.primary.static}',
          height: '{space.12}',
          boxShadow: 'inset 0px -1px 0px 0px rgba({temp.color.gray.600}, 0.3)'
        },
        window: {
          fontFamily: '{font.mono}',
          fontSize: '{text.sm.fontSize}',
          mixBlendMode: {
            initial: 'normal',
            dark: 'difference'
          },
          sign: {
            color: {
              initial: '{color.gray.500}',
              dark: '{color.gray.700}'
            }
          }
        },
        copied: {
          color: {
            initial: '{color.gray.900}',
            dark: '{color.gray.100}'
          }
        }
      },
      sectionHeader: {
        alignItems: {
          initial: 'center',
          xl: 'flex-start'
        },
        marginBottom: '{space.8}',
        subtitle: {
          fontSize: '{text.lg.fontSize}',
          lineHeight: '{text.lg.lineHeight}',
          fontWeight: '{fontWeight.normal}',
          letterSpacing: '{letterSpacing.wide}',
          marginBottom: '{space.2}'
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
          marginBottom: '{space.2}',
          fontWeight: '{fontWeight.semibold}',
          letterSpacing: '{letterSpacing.tight}',
          color: '{docus.body.color}'
        },
        description: {
          color: '{elements.text.secondary.color.static}'
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
  prose: {
    code: {
      block: {
        borderColor: '{elements.border.primary.static}'
      },
      inline: {
        color: '{color.primary.500}',
        backgroundColor: {
          initial: '{color.primary.50}',
          dark: '{color.primary.900}'
        }
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
        dark: 'rgba({temp.color.gray.900}, 0.8)'
      }
    },

    codeGroup: {
      margin: '{typography.verticalMargin.base} 0px'
    },

    modal: {
      scrim: {
        backgroundColor: {
          initial: 'rgba({temp.color.gray.50}, 0.95)',
          dark: 'rgba({temp.color.gray.900}, 0.95)'
        }
      }
    }
  }
})

// border: {
//   $schema: {
//     title: 'Borders used in Elements.',
//     tags: [
//       '@studioInput design-token',
//       '@studioInputTokenType color',
//       '@studioIcon material-symbols:border-all-outline-rounded'
//     ]
//   },
//   primary: {
//     static: {
//       initial: '{color.gray.200}',
//       dark: '{color.gray.800}'
//     },
//     hover: {
//       initial: '{color.gray.300}',
//       dark: '{color.gray.700}'
//     }
//   },
//   secondary: {
//     static: {
//       initial: '{color.gray.300}',
//       dark: '{color.gray.700}'
//     },
//     hover: {
//       initial: '',
//       dark: ''
//     }
//   }
// },
