import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import BottomTab from './bottom-tab';
import Login from '@screens/auth/login';
import Register from '@screens/auth/register';
import Splash from '@screens/splash';
import Detail from '@screens/detail';
import ViewChap, { ViewChapProps } from '@screens/detail/view';
import Bookmark from '@screens/bookmark';
import History from '@screens/history';
import Discover from '@screens/discover';

export type AllStackScreensParams = {
  Splash: undefined;
  Home: undefined;
  BottomTab: undefined;
  Login: undefined;
  Register: undefined;
  Detail: undefined;
  Discover:
    | undefined
    | {
        genres?: string;
        status?: string;
      };
  Profile: undefined;
  Bookmark: undefined;
  ViewChap: undefined | ViewChapProps;
  History: undefined | any;
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
      <Screen name="ViewChap" key={'ViewChap'} component={ViewChap} />

      {/* Profile */}
      <Screen name="Bookmark" key={'Bookmark'} component={Bookmark} />
      <Screen name="History" key={'History'} component={History} />

      {/* Auth stack */}
      <Screen name="Login" key={'Login'} component={Login} />
      <Screen name="Register" key={'Register'} component={Register} />

      <Screen name="BottomTab" key={'BottomTab'} component={BottomTab} />
    </Navigator>
  );
};

export default AllStack;
