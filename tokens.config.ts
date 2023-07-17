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
  borderStyle: 'border-solid',
  borderColor: 'border-primary-static', // TODO
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
  borderColor: 'border-primary-static', // TODO
  borderRadius: 'rounded-xs',
  backgroundColor: 'bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70',
  boxShadow: 'shadow-terminal',
  backdropFilter: 'backdrop-blur-[3px]',
  header: {
    height: 'h-12',
    borderWidth: 'border-0',
    borderStyle: 'border-solid',
    borderColor: 'border-primary-static', // TODO
    boxShadow: 'shadow-[inset_0_-1px_0px_0px_rgb(var(--color-gray-600)/0.3)]'
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

export default {
  state,
  loadingBar,
  announce,
  terminal,
  list,
  buttonLink
}
