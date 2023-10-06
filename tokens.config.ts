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

const docsLayout = {
  root: 'relative flex lg:grid flex-col-reverse lg:gap-6 xl:gap-8',
  layout: '[&.has-toc]:lg:grid-cols-[minmax(320px,1fr)minmax(200px,200px)] [&.has-toc]:xl:grid-cols-[minmax(320px,1fr)minmax(250px,250px)] [&.has-aside]:lg:grid-cols-[minmax(200px,200px)minmax(320px,1fr)] [&.has-aside]:xl:grid-cols-[minmax(250px,250px)minmax(320px,1fr)] [&.has-aside.has-toc]:lg:grid-cols-[minmax(200px,200px)minmax(320px,1fr)minmax(200px,200px)] [&.has-aside.has-toc]:xl:grid-cols-[minmax(250px,250px)minmax(320px,1fr)minmax(250px,250px)]',
  asideNav: {
    display: 'hidden lg:block',
    position: 'lg:sticky',
    overflow: 'overflow-y-auto',
    alignSelf: 'self-start',
    padding: 'lg:py-6 xl:py-8 lg:pe-6 xl:pe-8',
    top: 'lg:top-[var(--app-header-height)]',
    height: 'lg:h-[calc(100vh-var(--app-header-height))]',
  },
  content: {
    root: {
      position: 'relative',
      display: 'flex flex-1 flex-col',
      padding: 'py-8 lg:py-12',
      width: 'w-full',
      margin: 'mx-auto lg:mt-0',
      //     maxWidth: '{docus.readableLine}',
    },
    bottom: 'flex flex-col gap-8'
  },
  toc: {
    root: {
      position: 'sticky',
      display: 'flex lg:self-start',
      top: 'top-[var(--app-header-height)]',
      overflow: 'overflow-auto',
      border: 'border-b lg:border-b-0 ' + border.primary.static,
      margin: '-mx-4 sm:-mx-6 lg:mx-0',
      padding: 'lg:p-6 xl:p-8 pe-0',
      height: 'lg:h-[calc(100vh-var(--app-header-height))]',
    },
    //     '@lg': {
    //       padding: '{docus.layout.docs.spacing}',
    //       paddingInlineEnd: '0px',
    //       height: 'calc(100vh - {docus.app.header.height})',
    //       maxHeight: 'none',
    //     },
    wrapper: {
      width: 'w-full',
      height: 'h-full',
      backdropFilter: backdrop.filter + ' lg:backdrop-filter-none',
      backgroundColor: backdrop.backgroundColor + ' lg:bg-transparent dark:lg:bg-transparent',
    },
    button: {
      display: 'flex lg:hidden',
      alignItems: 'items-center',
      width: 'w-full',
      height: 'h-full',
      padding: 'p-4 sm:px-6',
      title: {
        fontSize: 'text-sm',
        fontWeight: 'font-semibold',
        margin: 'me-1'
      },
      icon: {
        width: 'w-4',
        height: 'h-4',
        transition: 'transition-transform duration-100 [&.rotate]:rotate-90',
      }
    },
    content: {
      display: 'hidden [&.opened]:block lg:block',
      margin: 'mb-4 lg:mt-0',
      opened: '[&.opened]:px-4 [&.opened]:sm:px-6 [&.opened]:lg:px-0 [&.opened]:overflow-auto [&.opened]:max-h-[50vh] [&.opened]:lg:max-h-none'
    }
  }
}

const docsToc = {
  root: 'flex flex-col gap-2',
  title: 'hidden lg:block overflow-hidden text-sm font-semibold',
  bottom: 'text-sm py-2' + ' ' + text.secondary.static,
}

const docsTocLinks = {
  link: 'block truncate py-1 lg:pe-3 text-sm text-gray-500 dark:text-gray-400 [&.active]:text-primary-500',
}

const docsPrevNext = {
  root: 'grid grid-cols-1 sm:grid-cols-2 gap-8',
  directory: {
    display: 'block',
    marginBottom: 'mb-3',
    fontSize: 'text-xs',
    fontWeight: 'font-medium',
    color: 'text-gray-500',
  },
  icon: {
    width: 'w-8',
    height: 'h-8',
    marginBottom: 'mb-4',
  },
  title: {
    color: 'group-hover:text-primary-500',
    fontWeight: 'font-medium',
    marginBottom: 'mb-2',
  },
  description: {
    fontSize: 'text-sm',
    color: 'text-gray-500',
    clamp: 'line-clamp-3'
  },
  link: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'flex-col',
    padding: 'p-6',
    border: 'border rounded-2xs ' + border.primary.static,
  }
}

const docsContentBottom = {
  root: 'flex items-center justify-between gap-4 mt-8 text-sm' + ' ' + text.secondary.static,
  editLink: 'flex flex-1 items-center gap-2',
}

const codeGroup = {
  root: 'w-full overflow-hidden border rounded ' + border.primary.static,
}

const codeGroupTabs = {
  tabs: 'relative z-0 flex overflow-x-auto',
  tab: {
    display: 'flex items-center flex-1',
    padding: 'py-2 px-4',
    position: 'relative',
    fontFamily: 'font-mono',
    fontSize: 'text-sm',
    letterSpacing: 'tracking-tight',
    border: '[.two-tabs_&&:first-of-type]:border-e [&.active]:border-b-transparent [&.inactive]:border-b [&.active]:border-b first-of-type:border-0 last-of-type:border-0 border-x ' + border.primary.static,
    textAlign: 'text-start',
    userSelect: 'select-none',
    backgroundColor: '[&.inactive]:bg-gray-100 [&.inactive]:dark:bg-black',
    //       backgroundColor: {
    //         initial: '{color.gray.50}',
    //         dark: '{prose.code.block.backgroundColor}'
    //       },
    color: '[&.inactive]:text-gray-500 [&.inactive]:hover:text-gray-900 [&.inactive]:hover:dark:text-gray-300 [&.active]:text-gray-900 [&.active]:dark:text-gray-300',
    filter: '[&.inactive]:grayscale [&.inactive]:hover:grayscale-0',
    
  },
  icon: 'w-4 h-4 me-2',
}

export default {
  text,
  state,
  docsNavigation,
  card,
  sectionHeader,
  cardGrid,
  docsLayout,
  docsToc,
  docsTocLinks,
  docsPrevNext,
  docsContentBottom,
  codeGroup,
  codeGroupTabs
}
