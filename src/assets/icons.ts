import { ImageSourcePropType } from 'react-native';

/** App icon assets from assets/icons — use for branding, splash references, etc. */
export const appIcons = {
  sm: require('../../assets/icons/48.png') as ImageSourcePropType,
  md: require('../../assets/icons/64.png') as ImageSourcePropType,
  lg: require('../../assets/icons/128.png') as ImageSourcePropType,
  xl: require('../../assets/icons/256.png') as ImageSourcePropType,
} as const;

export const bootsplashLogo = require('../../assets/bootsplash/logo.png') as ImageSourcePropType;
