import colors from 'windicss/colors'

export default {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      'primary-green': '#00DC82',

      'secondary-surface': '#E5F9FF', // secondary is sky
      'secondary-lightest': '#B7E1ED',
      'secondary-lighter': '#95CDDE',
      'secondary-light': '#71A2B0',
      secondary: '#497A87',
      'secondary-dark': '#255461',
      'secondary-darker': '#003543',
      'secondary-darkest': '#012A35',
      'secondary-black': '#001E26',

      terciary: '#B2CCCC', // cloud
      'cloud-surface': '#E6F0F0',
      'cloud-lightest': '#D1E2E2',
      'cloud-lighter': '#B2CCCC',
      'cloud-light': '#92ADAD',
      cloud: '#688282',
      'cloud-dark': '#566B6B',
      'cloud-darker': '#334040',
      'cloud-darkest': '#273131',
      'cloud-black': '#1A2121',

      black: '#000',
      white: '#fff',
      blue: colors.lightBlue,
      green: colors.emerald,
      red: colors.red,
      rose: colors.rose,
      yellow: colors.amber,
      gray: colors.gray

      // $colorNeutralWhite: #FFFFFF;
      // $colorNeutralBlack: #000000;
      // $colorGreenLighter: #80EEC0;
      // $colorGreenLight: #40E5A1;
      // $colorGreenDefault: #00DC82;
      // $colorGreenDark: #00BB6F;
      // $color-greenDarker: #009A5B;
      // $colorPearLighter: #ECF3AA;
      // $colorPearLight: #E0EB74;
      // $colorPearDefault: #D1E231;
      // $colorPearDark: #BDCE1D;
      // $colorPearDarker: #9CAA18;
      // $colorYellowLighter: #FFF2AC;
      // $colorYellowLight: #FFEC83;
      // $colorYellowDefault: #FFE65A;
      // $colorYellowDark: #D9C34D;
      // $colorYellowDarker: #B3A13F;
      // $colorOrangeLighter: #F9C580;
      // $colorOrangeLight: #F7A840;
      // $colorOrangeDefault: #F48B00;
      // $colorOrangeDark: #CF7600;
      // $colorOrangeDarker: #AB6100;
      // $colorRedLighter: #FFB1A3;
      // $colorRedLight: #FF8B74;
      // $colorRedDefault: #FF6446;
      // $colorRedDark: #D9553C;
      // $colorRedDarker: #B34631;
      // $colorPinkLighter: #FCBBCF;
      // $colorPinkLight: #FB9AB7;
      // $colorPinkDefault: #FA789F;
      // $colorPinkDark: #D56687;
      // $colorPinkDarker: #AF546F;
      // $colorPurpleLighter: #E0B5DF;
      // $colorPurpleLight: #D190CE;
      // $colorPurpleDefault: #C26BBE;
      // $colorPurpleDark: #A55BA2;
      // $colorPurpleDarker: #884B85;
      // $colorIndigoLighter: #80B1E3;
      // $colorIndigoLight: #408BD6;
      // $colorIndigoDefault: #0064C8;
      // $colorIndigoDark: #0055AA;
      // $colorIndigoDarker: #00468C;
      // $colorBlueLighter: #94D5F7;
      // $colorBlueLight: #5EBFF4;
      // $colorBlueDefault: #28AAF0;
      // $colorBlueDark: #2291CC;
      // $colorBlueDarker: #1C77A8;
      // $colorTealLighter: #80F2F2;
      // $colorTealLight: #40EBEB;
      // $colorTealDefault: #00E5E5;
      // $colorTealDark: #00C3C3;
      // $colorTealDarker: #00A0A0;
      // $colorMintSurface: #E7FEFD;
      // $colorMintLightest: #C5EEEC;
      // $colorMintLighter: #A8DDDB;
      // $colorMintLight: #7EB1B0;
      // $colorMintDefault: #558887;
      // $colorMintDark: #2E6160;
      // $colorMintDarker: #003C3C;
      // $colorMintDarkest: #012E2F;
      // $colorMintBlack: #002021;
      // $colorSandSurface: #F5F5EB;
      // $colorSandLightest: #EDEDD5;
      // $colorSandLighter: #DEDEB6;
      // $colorSandLight: #B4B48C;
      // $colorSandDefault: #9C9C6A;
      // $colorSandDark: #636330;
      // $colorSandDarker: #3B3B00;
      // $colorSandDarkest: #2D2E01;
      // $colorSandBlack: #1F2100;
      // $colorSkySurface: #E5F9FF;
      // $colorSkyLightest: #B7E1ED;
      // $colorSkyLighter: #95CDDE;
      // $colorSkyLight: #71A2B0;
      // $colorSkyDefault: #497A87;
      // $colorSkyDark: #255461;
      // $colorSkyDarker: #003543;
      // $colorSkyDarkest: #012A35;
      // $colorSkyBlack: #001E26;
      // $colorCloudSurface: #E6F0F0;
      // $colorCloudLightest: #D1E2E2;
      // $colorCloudLighter: #B2CCCC;
      // $colorCloudLight: #92ADAD;
      // $colorCloudDefault: #688282;
      // $colorCloudDark: #566B6B;
      // $colorCloudDarker: #334040;
      // $colorCloudDarkest: #273131;
      // $colorCloudBlack: #1A2121;
      // $colorStoneSurface: #F6F6F6;
      // $colorStoneLightest: #D4D4D4;
      // $colorStoneLighter: #B2B2B2;
      // $colorStoneLight: #909090;
      // $colorStoneDefault: #6E6E6E;
      // $colorStoneDark: #4C4C4C;
      // $colorStoneDarker: #2A2A2A;
      // $colorStoneDarkest: #191919;
      // $colorStoneBlack: #080808;
    },
    extend: {
      fontFamily: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    }
  },
  shortcuts: {
    'text-display-6': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem'
    },
    'text-display-5': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem'
    },
    'text-display-4': {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    'text-display-3': {
      fontSize: '3.75rem',
      lineHeight: '3.75rem'
    },
    'text-display-2': {
      fontSize: '4.5rem',
      lineHeight: '4.5rem'
    },
    'text-display-1': {
      fontSize: '6rem',
      lineHeight: '6rem'
    },
    'text-body-xs': {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    'text-body-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    'text-body-base': {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    'text-body-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.75rem'
    },
    'text-body-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.75rem'
    },
    'text-body-2xl': {
      fontSize: '1.5rem',
      lineHeight: '2rem'
    }
  }
}
