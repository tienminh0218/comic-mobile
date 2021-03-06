import React, { useCallback } from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';
import FixedContainer from '@components/FixContainer';
import { WIDTH_SCALE } from '@constants/constants';
import CustomHeader from '@components/Header';
import { pColor } from '@constants/color';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { useAuth } from '@hooks/useAuth';
import { AllStackScreenProps } from '@navigators/all-stack';
import API from '@services/api';
import MySpinner from '@components/my-spinner';

const Profile = ({ navigation }: AllStackScreenProps<'Profile'>) => {
  const user = useAppSelector((state: RootState) => state.user.data);
  const { signOut } = useAuth();

  const navigateToHistory = useCallback(async () => {
    if (!user?.id) return;
    try {
      MySpinner.show();

      const { data } = await API.get(`/users/history/${user?.id}`);
      MySpinner.hide();
      navigation.navigate('History', {
        data,
      });
    } catch (error: any) {
      console.log('error navigateToHistory', error?.message);
      MySpinner.hide();
    }
  }, []);

  return (
    <FixedContainer>
      <CustomHeader title="Profile" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: WIDTH_SCALE * 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: WIDTH_SCALE * 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: pColor.bgSubColor,
          }}>
          {/* <View
            style={{
              marginRight: WIDTH_SCALE * 10,
              width: WIDTH_SCALE * 50,
              height: WIDTH_SCALE * 50,
              borderRadius: 40 * WIDTH_SCALE,
              borderWidth: 1,
              borderColor: pColor.bgSubColor,
              overflow: 'hidden',
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: 'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg',
              }}
            />
          </View> */}

          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: pColor.black,
              }}>
              Xin ch??o,
            </Text>
            <Text
              style={{
                color: pColor.black,
                fontWeight: 'bold',
              }}>
              {` ${user?.email}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: WIDTH_SCALE * 20,
          }}>
          <ItemSetting
            title="Truy???n ???? xem"
            customIcon={() => (
              <Icon name="history" size={25} color={pColor.black} />
            )}
            onPress={navigateToHistory}
          />

          <ItemSetting
            title="Truy???n theo d??i"
            customIcon={() => (
              <Icon name="bookmark-outline" size={25} color={pColor.black} />
            )}
            onPress={() => navigation.navigate('Bookmark')}
          />

          <ItemSetting
            title="????ng xu???t"
            customIcon={() => (
              <Icon name="logout" size={25} color={pColor.black} />
            )}
            onPress={() => {
              navigation.navigate('Splash');
              signOut();
            }}
          />
        </View>
      </View>
    </FixedContainer>
  );
};

interface ItemSetting {
  title: string;
  customIcon: () => JSX.Element;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ItemSetting = React.memo(
  ({ title, customIcon, onPress }: ItemSetting) => {
    return (
      <MyTouchableOpacity
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: WIDTH_SCALE * 10,
          paddingBottom: WIDTH_SCALE * 10,
          borderBottomWidth: 1,
          borderBottomColor: pColor.asiaColor,
        }}
        onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{ marginRight: WIDTH_SCALE * 5 }}>{customIcon()}</View>
          <Text style={{ color: pColor.black }}>{title}</Text>
        </View>
        <Icon name="arrow-right" size={25} color={pColor.black} />
      </MyTouchableOpacity>
    );
  },
);

export default Profile;
