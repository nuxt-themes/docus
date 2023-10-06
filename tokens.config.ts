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

export default {
  state,
}
