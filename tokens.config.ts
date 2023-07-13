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

export default {
  loadingBar,
  announce,
  terminal
}