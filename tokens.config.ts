import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
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
      700: '#003351',
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
      50: '#FFFDEA',
      100: '#FFF8CC',
      200: '#FEF5A4',
      300: '#FFEF8A',
      400: '#FFE53C',
      500: '#EECF00',
      600: '#C2A905',
      700: '#6B5D02',
      800: '#282300',
      900: '#1A1700'
    }
  },
  docus: {
    $schema: {
      title: 'All the configurable tokens from Docus.',
      tags: [
        '@studioIcon material-symbols:docs'
      ]
    },
    header: { height: '64px' },
    footer: { height: { initial: '145px', sm: '100px' }, padding: '{space.4} 0' },
    readableLine: '78ch',
    loadingBar: {
      height: '3px',
      gradientColorStop1: '#00dc82',
      gradientColorStop2: '#34cdfe',
      gradientColorStop3: '#0047e1'
    },
    docs: {
      prevNext: {
        backgroundColor: {
          static: {
            initial: '{color.gray.50}',
            dark: '{color.gray.900}'
          },
          hover: {
            initial: '{color.gray.50}',
            dark: '{color.gray.900}'
          }
        },
        borderColor: {
          static: {
            initial: '{color.gray.100}',
            dark: '{color.gray.800}'
          },
          hover: {
            initial: '{color.gray.100}',
            dark: '{color.gray.800}'
          }
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
  }
})
