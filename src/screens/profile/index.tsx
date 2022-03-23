import { useAppSelector } from '@stores/store/storeHook';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { RootState } from '@stores/store/store';
import FixedContainer from '@components/FixContainer';
import { IMAGE } from '@constants/image-path';
import { WIDTH_SCALE } from '@constants/constants';

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
    <View>
      <Text style={{ color: 'red' }}>Profile</Text>
    </View>
  );
};

export default Profile;
