const backdrop = {
  filter: 'backdrop-saturate-200 backdrop-blur-[10px]',
  backgroundColor: 'bg-gray-50 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80',
}

const text = {
  primary: {
    static: 'text-gray-900 dark:text-gray-50',
    hover: 'hover:text-red-500',
  },
  secondary: {
    static: 'text-gray-500 dark:text-gray-400',
    hover: 'hover:text-gray-700 dark:hover:text-gray-200',
  },
  tertiary: {
    static: 'text-gray-300 dark:text-gray-600',
    hover: 'hover:text-red-500',
  },
}

const border = {
  primary: {
    static: 'border-gray-200 dark:border-gray-800',
    hover: 'hover:border-gray-300 dark:hover:border-gray-700',
  },
  secondary: {
    static: 'border-gray-300 dark:border-gray-700',
    hover: 'hover:border-gray-400 dark:hover:border-gray-600',
  }
}

// const colorVariants = {
//   primary: {}
// }

// TODO: find another way to do this
const state = {
  neutral: {
    color: {
      primary: 'text-gray-500 dark:text-gray-500',
      secondary: 'text-gray-600 dark:text-gray-400',
      tertiary: 'text-gray-700 dark:text-gray-100',
    },
    backgroundColor: {
      primary: 'bg-gray-100 dark:bg-gray-800',
      secondary: 'bg-gray-200 dark:bg-gray-700',
      tertiary: 'bg-gray-300 dark:bg-gray-600',
    },
    borderColor: {
      primary: 'border-gray-200 dark:border-gray-700',
      secondary: 'border-gray-300 dark:border-gray-600',
      tertiary: '',
    },
  },
  primary: {
    color: {
      primary: 'text-primary-500 dark:text-primary-500',
      secondary: 'text-primary-600 dark:text-primary-400',
      tertiary: 'text-primary-700 dark:text-primary-100',
    },
    backgroundColor: {
      primary: 'bg-primary-50 dark:bg-primary-900',
      secondary: 'bg-primary-100 dark:bg-primary-800',
      tertiary: 'bg-primary-200 dark:bg-primary-700',
    },
    borderColor: {
      primary: 'border-primary-100 dark:border-primary-800',
      secondary: 'border-primary-200 dark:border-primary-700',
      tertiary: '',
    },
  },
  secondary: {
    color: {
      primary: 'text-secondary-500 dark:text-secondary-500',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      tertiary: 'text-secondary-700 dark:text-secondary-100',
    },
    backgroundColor: {
      primary: 'bg-secondary-50 dark:bg-secondary-900',
      secondary: 'bg-secondary-100 dark:bg-secondary-800',
      tertiary: 'bg-secondary-200 dark:bg-secondary-700',
    },
    borderColor: {
      primary: 'border-secondary-100 dark:border-secondary-800',
      secondary: 'border-secondary-200 dark:border-secondary-700',
      tertiary: '',
    },
  },
  info: {
    color: {
      primary: 'text-blue-500 dark:text-blue-500',
      secondary: 'text-blue-600 dark:text-blue-400',
      tertiary: 'text-blue-700 dark:text-blue-100',
    },
    backgroundColor: {
      primary: 'bg-blue-50 dark:bg-blue-900',
      secondary: 'bg-blue-100 dark:bg-blue-800',
      tertiary: 'bg-blue-200 dark:bg-blue-700',
    },
    borderColor: {
      primary: 'border-blue-100 dark:border-blue-800',
      secondary: 'border-blue-200 dark:border-blue-700',
      tertiary: '',
    },
  },
  success: {
    color: {
      primary: 'text-green-500 dark:text-green-500',
      secondary: 'text-green-600 dark:text-green-400',
      tertiary: 'text-green-700 dark:text-green-100',
    },
    backgroundColor: {
      primary: 'bg-green-50 dark:bg-green-900',
      secondary: 'bg-green-100 dark:bg-green-800',
      tertiary: 'bg-green-200 dark:bg-green-700',
    },
    borderColor: {
      primary: 'border-green-100 dark:border-green-800',
      secondary: 'border-green-200 dark:border-green-700',
      tertiary: '',
    },
  },
  warning: {
    color: {
      primary: 'text-yellow-500 dark:text-yellow-500',
      secondary: 'text-yellow-600 dark:text-yellow-400',
      tertiary: 'text-yellow-700 dark:text-yellow-100',
    },
    backgroundColor: {
      primary: 'bg-yellow-50 dark:bg-yellow-900',
      secondary: 'bg-yellow-100 dark:bg-yellow-800',
      tertiary: 'bg-yellow-200 dark:bg-yellow-700',
    },
    borderColor: {
      primary: 'border-yellow-100 dark:border-yellow-800',
      secondary: 'border-yellow-200 dark:border-yellow-700',
      tertiary: '',
    },
  },
  danger: {
    color: {
      primary: 'text-red-500 dark:text-red-500',
      secondary: 'bg-red-600 dark:bg-red-400',
      tertiary: 'bg-red-700 dark:bg-red-100',
    },
    backgroundColor: {
      primary: 'bg-red-50 dark:bg-red-900',
      secondary: 'bg-red-100 dark:bg-red-800',
      tertiary: 'bg-red-200 dark:bg-red-700',
    },
    borderColor: {
      primary: 'border-red-100 dark:border-red-800',
      secondary: 'border-red-200 dark:border-red-700',
      tertiary: '',
    },
  },
}

const loadingBar = {
  height: 'h-[3px]',
  backgroundImage: 'bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500',
}

const announce = {
  padding: 'p-1',
  backgroundColor: 'bg-gray-100 dark:bg-gray-800',
  borderRadius: 'rounded-full',
  borderWidth: 'border',
  borderStyle: border.primary.static,
  fontSize: 'text-sm',
  fontWeight: 'font-medium',
  boxShadow: 'shadow-light-up',
  content: {
    paddingX: 'px-3',
  },
  icon: {
    padding: 'py-1 px-2',
    borderRadius: 'rounded-full',
    backgroundColor: 'bg-gray-200 dark:bg-gray-700',
  }
}

const terminal = {
  maxWidth: 'max-w-[512px]',
  height: 'h-[256px]',
  borderWidth: 'border-0',
  borderStyle: 'border-solid',
  borderColor: border.primary.static,
  borderRadius: 'rounded-xs',
  backgroundColor: 'bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70',
  boxShadow: 'shadow-terminal',
  backdropFilter: 'backdrop-blur-[3px]',
  header: {
    height: 'h-12',
    borderWidth: 'border-0',
    borderStyle: 'border-solid',
    borderColor: border.primary.static,
    boxShadow: 'shadow-[inset_0_-1px_0px_0px_rgb(var(--color-gray-500)/0.3)]'
  },
  window: {
    fontFamily: 'font-mono',
    fontSize: 'text-sm',
    mixBlendMode: 'mix-blend-normal dark:mix-blend-difference',
  }
}

const list = {
  item: {
    marginBottom: 'mb-3',
  },
  icon: {
    marginInlineEnd: 'me-3',
    padding: 'p-1',
    borderRadius: 'rounded-full',
    boxShadow: 'shadow-light-up-sm',
    width: 'w-4',
    height: 'h-4',
  }
}

const buttonLink = {
  fontWeight: 'font-semibold',
  borderWidth: 'border-0',
  borderStyle: 'border-solid',
  borderColor: 'border-transparent',
  borderRadius: 'rounded-2xs',
  icon: {
    marginInlineEnd: 'me-2',
  },
  variants: {
    ghost: {
      true: {
        primary: 'bg-transparent text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800',
        secondary: 'bg-transparent text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-800',
        gray: 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
        orange: 'bg-transparent text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-800',
        purple: 'bg-transparent text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-800',
        green: 'bg-transparent text-green-500 hover:bg-green-100 dark:hover:bg-green-800',
        blue: 'bg-transparent text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800',
        yellow: 'bg-transparent text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-800',
        red: 'bg-transparent text-red-500 hover:bg-red-100 dark:hover:bg-red-800',
      },
      false: {
        primary: 'text-primary-500 bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700',
        secondary: 'text-secondary-500 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700',
        gray: 'text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
        orange: 'text-orange-500 bg-orange-100 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-700',
        purple: 'text-purple-500 bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 dark:hover:bg-purple-700',
        green: 'text-green-500 bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700',
        blue: 'text-blue-500 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700',
        yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-700',
        red: 'text-red-500 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700',
      }
    },
    size: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-4 py-2',
      xl: 'text-xl px-5 py-3',
    }
  }
}

const hero = {
  padding: 'py-20 sm:py-24 lg:py-24',
  layout: {
    gap: 'gap-16 xl:gap-4',
    gridTemplateColumns: 'xl:grid-cols-12',
  },
  content: {
    gridColumn: 'xl:col-span-7',
    alignItems: 'items-center xl:items-start',
    announce: {
      marginBottom: 'mb-8'
    },
    title: {
      color: text.primary.static,
      fontSize: 'text-4xl sm:text-5xl lg:text-6xl',
      fontWeight: 'font-semibold',
      letterSpacing: 'tracking-tight',
      textAlign: 'text-center xl:text-start',
      marginBottom: 'mb-8',
      padding: 'px-8 md:px-12 lg:px-14 xl:px-0',
      gradientText: 'text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-gray-100 dark:from-gray-200 from-10% via-gray-300 dark:via-gray-400 via-54% to-gray-600 dark:to-gray-700',
      mixBlendMode: 'mix-blend-exclusion',
    },
    description: {
      color: text.secondary.static,
      fontSize: 'text-lg lg:text-xl',
      textAlign: 'text-center xl:text-start',
      marginBottom: 'mb-12',
      padding: 'px-2 md:px-6 xl:px-0',
      mixBlendMode: 'mix-blend-normal',
    },
    extra: {
      justifyContent: 'justify-center xl:justify-start',
      marginBottom: 'mb-16',
    },
    actions: {
      flexDirection: 'flex-col sm:flex-row',
      gap: 'gap-2 sm:gap-3',
      justifyContent: 'justify-center xl:justify-start',
    }
  },
  support: {
    gridColumn: 'xl:col-span-5'
  }
}

const container = {
  maxWidth: 'max-w-[80rem]',
  padding: 'px-4 sm:px-6 xl:px-8',
}

const appHeader = {
  height: 'h-16',
  backdropFilter: backdrop.filter,
  backgroundColor: backdrop.backgroundColor,
  border: 'border-b ' + border.primary.static,
  layout: {
    gridTemplateColumns: 'grid-cols-12',
    gap: 'gap-2',
    left: {
      gridColumn: 'col-span-4'
    },
    center: {
      gridColumn: 'col-span-4'
    },
    right: {
      gridColumn: 'col-span-4'
    }
  },
  icon: '[&>.icon]:w-4 [&>.icon]:h-4'
}

const appColorMode = {
  padding: 'p-4',
  color: text.secondary.static + ' ' + text.secondary.hover,
}

const appHeaderLogo = {
  logo: {
    height: 'h-6 sm:h-7',
    width: 'w-auto',
  },
  title: {
    fontSize: 'text-2xl',
    fontWeight: 'font-bold',
    color: 'text-color-900 dark:text-color-100 hover:text-primary-500',
  }
}

const appSocialIcons = {
  padding: 'p-4',
  color: text.secondary.static + ' ' + text.secondary.hover,
}

const appNavigation = {
  marginBottom: '[&.vertical]:mb-4',
  ul: {
    gap: 'gap-2 [.vertical_&]:gap-0'
  },
  link: {
    padding: '[.vertical_&]:py-2 py-1 px-2',
    fontSize: 'text-sm',
    fontWeight: 'font-semibold',
    gap: 'gap-2',
    active: {
      color: '[&.active]:text-primary-500',
    },
    hover: {
      color: 'hover:text-primary-500',
    }
  },
  icon: {
    width: 'w-5',
    height: 'h-5',
  }
}

const docsSearchButton = {
  backgroundColor: 'bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50',
  padding: 'py-2.5 px-4',
  borderRadius: 'rounded-2xs',
  border: 'border border-gray-200 dark:border-transparent',
  fontSize: 'text-sm',
  gap: 'gap-2',
  boxShadow: 'shadow-light-up-sm',
  color: text.secondary.static + ' ' + text.secondary.hover,
  placeholder: {
    display: 'hidden lg:block',
  },
  icon: {
    width: 'w-4',
    height: 'h-4',
  },
  shortcuts: {
    display: 'hidden xs:block',
    marginLeft: 'ml-auto',
    kbd: {
      background: '[&_kbd]:font-body',
      fontFamily: '',
    },
  }
}

const docsSearch = {
  window: {
    border: 'border ' + border.primary.static,
    borderRadius: 'sm:rounded-xs',
    marginTop: 'sm:mt-[20vh]',
    margin: 'sm:mx-4',
    width: 'w-full',
    maxWidth: 'max-w-[640px]',
    height: 'h-fit',
    maxHeight: 'max-h-full sm:max-h-[320px]',
    backdropFilter: 'backdrop-blur-xl'
  },
  input: {
    backgroundColor: 'bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50',
    padding: 'py-3',
    color: text.primary.static,
    placeholder: 'placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:opacity-50 dark:placeholder:opacity-50',
    icon: {
      width: 'w-5',
      height: 'h-5',
      margin: 'mx-4',
      color: text.tertiary.static,
    },
    close: {
      button: 'flex p-3',
      icon: 'w-5 h-5 ' + text.secondary.static,
    }
  },
  results: {
    empty: 'h-20 flex items-center justify-center' + ' ' + text.tertiary.static,
  },
  result: {
    padding: 'py-3 px-2',
    gap: 'gap-2',
    selected: '[&.selected]:bg-gray-300 [&.selected]:dark:bg-gray-700 [&.selected]:bg-opacity-50 [&.selected]:dark:bg-opacity-50',
    head: {
      gap: 'gap-2',
      svg: 'shrink-0 opacity-50 w-5 h-5 mx-2',
    },
    color: text.secondary.static,
    highlight: '[&_mark]:bg-primary-500 [&_mark]:text-white'
  }
}

const modal = {
  root: {
    zIndex: 'z-50',
  },
  scrim: {
    backdropFilter: 'backdrop-blur-none',
    backgroundColor: 'bg-gray-50 dark:bg-gray-900 opacity-95 dark:opacity-95',
  }
}

const drawer = {
  width: 'w-[320px]',
  height: 'h-screen',
  overflow: 'overflow-auto',
}

const appHeaderDrawer = {
  button: {
    position: 'relative',
    zIndex: 'z-10',
    display: 'flex lg:hidden',
    padding: 'p-4 ps-0',
    color: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  },
  nav: {
    width: 'w-full',
    border: 'border-r ' + border.primary.static,
    backgroundColor: 'bg-gray-50 dark:bg-gray-900',
  },
  navHeader: {
    height: appHeader.height,
    display: 'flex',
    alignItems: 'items-center',
    justifyContent: 'justify-between',
    border: 'border-b ' + border.primary.static,
    gap: 'gap-2',
    padding: 'px-4 sm:px-6',
  },
  navHeaderIcons: {
    display: 'flex',
    alignItems: 'items-center',
    overflow: 'auto',
    icon: '[&_.icon]:w-4 [&_.icon]:h-4',
  },
  navLinks: {
    height: 'h-[calc(100vh-var(--app-header-height))]',
    overflow: 'overflow-y-auto',
    padding: 'px-4 sm:px-6',
    paddingTop: 'pt-6',
  }
}

const docsNavigation = {
  item: {
    bordered: `border-s ${border.primary.static} ${border.primary.hover} [&.active]:border-primary-400 [&.active]:dark:border-primary-600 [.has-children_&]:ps-4 [&.has-parent-icon]:ms-2`,
    
  },

  link: 'py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 [&.active]:text-primary-500 [&.active]:font-medium [&_.icon]:!w-4 [&_.icon]:!h-4 [&_.icon]:!me-1',
  collapsible: {
    root: 'py-2 text-sm font-semibold text-gray-900 dark:text-gray-50',
    content: '[&_.icon]:w-5 [&_.icon]:h-5 [&_.icon]:me-2',
    icon: 'w-3 h-3 ' + text.secondary.static,
  },
  recursive: 'p-0 mb-4 [&_.has-children]:border-s [&_.has-children]:border-transparent [&_.has-children]:ms-4',
}

const appFooter = {
  root: {
    display: 'flex',
    minHeight: 'min-h-[145px] sm:min-h-[100px]',
    border: 'border-t ' + border.primary.static,
    padding: 'py-4',
  },
  layout: {
    root: {
      display: 'grid',
      gridTemplateColumns: 'grid-cols-12',
      justifyItems: 'justify-items-center sm:justify-items-stretch',
      gap: 'gap-2',
    },
    left: {
      display: 'flex',
      gridColumn: 'col-span-12 sm:col-span-3',
      order: 'order-1 sm:order-none',
      padding: 'py-4',
    },
    center: {
      display: 'flex',
      flexDirection: 'flex-col sm:flex-row',
      alignItems: 'items-center',
      justifyContent: 'justify-start sm:justify-center',
      gridColumn: 'col-span-12 sm:col-span-6',
    },
    right: {
      display: 'flex',
      alignItems: 'items-center',
      justifyContent: 'justify-end',
      gridColumn: 'col-span-12 sm:col-span-3',
      margin: 'sm:-me-4'
    },
  },
  credits: {
    text: {
      fontSize: 'text-xs',
      fontWeight: 'font-medium',
      color: text.secondary.static + ' ' + text.secondary.hover,
    },
    icon: {
      flexShrink: 'shrink-0',
      color: 'text-current',
      width: 'w-4',
      height: 'h-4',
      margin: 'me-2',
    },
  },
  textLink: {
    padding: 'p-2',
    fontSize: 'text-sm',
    fontWeight: 'font-medium',
  },
  iconLink: {
    display: 'flex',
    padding: 'p-4',
    color: text.secondary.static + ' ' + text.secondary.hover,
    width: '[&_.icon]:w-4',
    height: '[&_.icon]:h-4',
  }
}

const card = {
  root: {
    display: 'flex',
    textAlign: 'text-center', // TODO: add to props
    padding: 'p-[2px]',
    borderRadius: 'rounded-sm',
    border: 'border-0',
    backdropFilter: backdrop.filter,
  },
  wrapper: {
    borderRadius: 'rounded-xs',
    backgroundImage: 'bg-[linear-gradient(135deg,rgba(var(--color-gray-100)/0.5),rgba(var(--color-gray-200)/0.5))] dark:bg-[linear-gradient(135deg,rgba(var(--color-gray-800)/0.4),rgba(var(--color-gray-800)/0.7))]',
  },
  content: {
    position: 'relative',
    zIndex: 'z-[2]',
    padding: 'p-8',
    // flex: 'flex-1',
  },
  title: {
    marginBottom: 'mb-2',
    fontSize: 'text-2xl',
    fontWeight: 'font-medium',
    letterSpacing: 'tracking-tight',
    color: text.primary.static,
  },
  description: {
    fontSize: 'text-sm',
    fontWeight: 'font-medium',
    color: text.secondary.static,
  },
  icon: {
    display: 'inline-flex',
    marginBottom: 'mb-4',
    padding: 'p-3',
    borderRadius: 'rounded-xs',
    backgroundColor: 'bg-gray-300 dark:bg-gray-900 bg-opacity-20 dark:bg-opacity-20',
    width: '[&_.icon]:w-6',
    height: '[&_.icon]:h-6',
    boxShadow: 'shadow-light-up',
    //  TODO:   boxShadow: 'inset -0.5px 0.5px 0px hsla(0,0%,100%,.1), inset 0.5px 0px 0px hsla(0,0%,100%,.1)'
  },
  noise: {
    position: 'absolute',
    inset: 'inset-0',
    zIndex: 'z-[-1]',
    filter: '[filter:url(#noise-filter)]',
    opacity: 'opacity-20',
  },
  lights: {
    layerOne: 'before:absolute before:rounded-[inherit] before:inset-0 before:z-0 before:bg-[radial-gradient(500px_at_var(--x)_var(--y),rgba(var(--color-gray-400)/0.3),transparent_60%)]',
    layerTwo: 'after:[&_.wrapper]:bg-red-500'
  }
}

// css({
//   '.card': {
//     '--col': (props) => props.col,
//     '--row': (props) => props.row,

//     gridColumnEnd: 'span {col}',
//     gridRowEnd: 'span {row}',


//     '&.lights::before': {
//       content: '""',
//       position: 'absolute',
//       inset: '0',
//       backgroundImage: 'radial-gradient(500px at var(--x) var(--y), rgba({temp.color.gray.400}, 0.3), transparent 60%)',
//       backgroundSize: 'auto',
//       backgroundOrigin: 'padding-box',
//       zIndex: '0',
//       borderRadius: 'inherit',
//       transition: 'background-image 0.2s ease, opacity 0.2s ease',
//       willChange: 'background-image, opacity',
//     },

//     '.wrapper': {
//       '.lights &&:after': {
//         // backgroundImage: '{docus.landing.card.wrapper.after.backgroundImage}', // TODO bug in tokens with vars
//         backgroundImage: 'none',
//         backgroundSize: 'auto',
//         backgroundOrigin: 'padding-box',
//         borderRadius: 'inherit',
//         content: '""',
//         position: 'absolute',
//         inset: '0',
//         zIndex: '1',
//         transition: 'background-image 0.2s ease, opacity 0.2s ease',
//         willChange: 'background-image, opacity',
//         '@dark': {
//           backgroundImage: 'radial-gradient(500px at var(--x) var(--y), rgba({temp.color.gray.900}, .4) 20%, rgba({temp.color.gray.900}, .4) 100% )'
//         }
//       }
//     },

//   }
// })


// card: {
//   minHeight: 'auto',
// },

const sectionHeader = {
  root: 'flex flex-col items-center xl:items-start mb-8',
  subtitle: {
    display: 'block',
    fontSize: 'text-lg',
    fontWeight: 'font-normal',
    letterSpacing: 'tracking-wide',
    marginBottom: 'mb-2',
  },
  title: {
    fontSize: 'text-3xl sm:text-4xl',
    fontWeight: 'font-semibold',
    letterSpacing: 'tracking-tight',
    marginBottom: 'mb-2',
  },
  description: {
    color: text.secondary.static,
  },
}

const cardGrid = {
  root: 'relative w-full',
  layout: {
    display: 'grid grid-cols-12',
    gridAutoFlow: 'grid-flow-dense'
  },
}

export default {
  text,
  state,
  loadingBar,
  announce,
  terminal,
  list,
  buttonLink,
  hero,
  container,
  appHeader,
  appColorMode,
  appHeaderLogo,
  appSocialIcons,
  appNavigation,
  docsSearchButton,
  docsSearch,
  modal,
  drawer,
  appHeaderDrawer,
  docsNavigation,
  appFooter,
  card,
  sectionHeader,
  cardGrid
}
