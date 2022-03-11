import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
// export const IS_TABLET = DeviceInfo.isTablet();

export const {height, width} = Dimensions.get('screen');
export const WIDTH = Math.min(width, height);
export const HEIGHT = Math.max(width, height);

export const baseWidth = 375;
export const baseHeight = 812;
export const WIDTH_SCALE = WIDTH / baseWidth;
export const HEIGHT_SCALE = HEIGHT / baseHeight;
