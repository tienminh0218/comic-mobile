// import Icon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, Text } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from '@screens/discover';
import Home from '@screens/home';
import Profile from '@screens/profile';
import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { BOTTOM_TAB_TITLE } from '@constants/constants';
import { pColor } from '@constants/color';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTab = ({ navigation }: any) => {
  const user = useAppSelector((state: RootState) => state.user.data);

  return (
    <Navigator
      safeAreaInsets={{
        bottom: 10,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
        },
      }}
      defaultScreenOptions={{
        tabBarLabelPosition: 'below-icon',
      }}>
      <Screen
        name={BOTTOM_TAB_TITLE.home}
        component={Home}
        options={{
          tabBarIcon: (props) => getIcon(['home', 'home-outline'], props),
          tabBarLabel: (props) => (
            <CustomText {...props} title={BOTTOM_TAB_TITLE.home} />
          ),
        }}
        key="Home"
      />
      <Screen
        name={BOTTOM_TAB_TITLE.discovery}
        component={Discover}
        options={{
          tabBarIcon: (props) =>
            getIcon(['equalizer', 'equalizer-outline'], props),
          tabBarLabel: (props) => (
            <CustomText {...props} title={BOTTOM_TAB_TITLE.discovery} />
          ),
        }}
        key="Discover"
      />
      <Screen
        name={BOTTOM_TAB_TITLE.user}
        component={Profile}
        options={{
          tabBarIcon: (props) => getIcon(['account', 'account-outline'], props),
          tabBarLabel: (props) => (
            <CustomText {...props} title={BOTTOM_TAB_TITLE.user} />
          ),
        }}
        key="Profile"
        listeners={{
          tabPress: (e) => {
            if (!user?.id) {
              e.preventDefault();
              Alert.alert(
                'Thông báo',
                'Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện thao tác này.',
                [
                  {
                    text: 'Huỷ',
                  },
                  {
                    text: 'Đăng nhập',
                    onPress: () => navigation.navigate('Login'),
                  },
                ],
              );
            }
          },
        }}
      />
    </Navigator>
  );
};

interface GetIconProps {
  color: string;
  size: number;
  focused: boolean;
}

const getIcon = (name: string[], { color, size, focused }: GetIconProps) => {
  return (
    <Icon name={focused ? name[0] : name[1]} color={'black'} size={size} />
  );
};

interface CustomTextProps {
  focused: boolean;
  color: string;
  position: LabelPosition;
  title: string;
}

const CustomText = React.memo(({ focused, title }: CustomTextProps) => (
  <Text
    style={{
      fontWeight: focused ? '600' : '400',
      color: pColor.black,
      fontSize: 12,
    }}>
    {title}
  </Text>
));

export default BottomTab;
