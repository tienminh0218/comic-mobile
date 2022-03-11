import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Splash from '@screens/splash';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import BottomTab from './bottom-tab';

export type AllStackScreensParams = {
  Splash: undefined;
  BottomTab: undefined;
};

export type AllStackScreens = keyof AllStackScreensParams;
export type AllStackScreenProps<T extends AllStackScreens> =
  NativeStackScreenProps<AllStackScreensParams, T>;

const {Navigator, Screen} = createNativeStackNavigator<AllStackScreensParams>();

const AllStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Splash" key={'Splash'} component={Splash} />

      <Screen name="BottomTab" key={'BottomTab'} component={BottomTab} />
    </Navigator>
  );
};

export default AllStack;
