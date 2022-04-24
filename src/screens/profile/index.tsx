import React from 'react';
import { Text, View, Image, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';
import FixedContainer from '@components/FixContainer';
import { IMAGE } from '@constants/image-path';
import { WIDTH_SCALE } from '@constants/constants';
import CustomHeader from '@components/Header';
import { pColor } from '@constants/color';
import MyTouchableOpacity from '@components/MyTouchableOpacity';

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.user.data);

  if (!user?.id) {
    return (
      <FixedContainer>
        <View
          style={{
            width: WIDTH_SCALE * 60,
            height: WIDTH_SCALE * 60,
            borderWidth: 1,
            overflow: 'hidden',
            borderRadius: 40,
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={IMAGE.default_avatar}
            resizeMode="contain"
          />
        </View>
      </FixedContainer>
    );
  }

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
            borderColor: pColor.asiaColor,
          }}>
          <View
            style={{
              marginRight: WIDTH_SCALE * 10,
              width: WIDTH_SCALE * 50,
              height: WIDTH_SCALE * 50,
              borderRadius: 40 * WIDTH_SCALE,
              borderWidth: 1,
              borderColor: pColor.asiaColor,
              overflow: 'hidden',
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg',
              }}
            />
          </View>

          <View>
            <Text
              style={{
                color: pColor.black,
              }}>
              Name ne
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: WIDTH_SCALE * 20,
          }}>
          <ItemSetting
            title="Truyện đã xem"
            customIcon={() => (
              <Icon name="history" size={25} color={pColor.black} />
            )}
            onPress={() => console.log('ok chua')}
          />

          <ItemSetting
            title="Truyện theo dõi"
            customIcon={() => (
              <Icon name="bookmark-outline" size={25} color={pColor.black} />
            )}
            onPress={() => console.log('ok chua')}
          />

          <ItemSetting
            title="Đăng xuất"
            customIcon={() => (
              <Icon name="logout" size={25} color={pColor.black} />
            )}
            onPress={() => console.log('ok chua')}
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
