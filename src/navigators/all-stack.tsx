import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '@screens/Auth/login';
import Register from '@screens/Auth/register';
import Splash from '@screens/splash';
import Detail from '@screens/detail';
import React from 'react';
import BottomTab from './bottom-tab';

export type AllStackScreensParams = {
  Splash: undefined;
  Home: undefined;
  BottomTab: undefined;
  Login: undefined;
  Register: undefined;
  Detail: undefined;
};

export type AllStackScreens = keyof AllStackScreensParams;
export type AllStackScreenProps<T extends AllStackScreens> =
  NativeStackScreenProps<AllStackScreensParams, T>;

const { Navigator, Screen } =
  createNativeStackNavigator<AllStackScreensParams>();

const AllStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Splash" key={'Splash'} component={Splash} />
      <Screen name="Detail" key={'Detail'} component={Detail} />

      {/* Auth stack */}
      <Screen name="Login" key={'Login'} component={Login} />
      <Screen name="Register" key={'Register'} component={Register} />

      <Screen name="BottomTab" key={'BottomTab'} component={BottomTab} />
    </Navigator>
  );
};

export default AllStack;
