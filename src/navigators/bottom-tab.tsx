import Icon from 'react-native-vector-icons/Octicons';
import { Alert } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from '@screens/discover';
import Home from '@screens/home';
import Profile from '@screens/profile';
import Search from '@screens/search';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation();
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
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => getIcon('home', { color, size }),
        }}
        key="Home"
      />
      <Screen
        name="Khám phá"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) =>
            getIcon('three-bars', { color, size }),
        }}
        key="Discover"
      />
      <Screen
        name="Tìm kiếm"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => getIcon('search', { color, size }),
        }}
        key="Search"
      />
      <Screen
        name="Cá nhân"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => getIcon('person', { color, size }),
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
}

const getIcon = (name: string, { color, size }: GetIconProps) => {
  return <Icon name={name} color={color} size={size} />;
};

export default BottomTab;
