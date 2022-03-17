import React, {useEffect} from 'react';
import {Image} from 'react-native';

import {AllStackScreenProps} from '@navigators/all-stack';
import {IMAGE} from '@constants/image-path';
import FixedContainer from '@components/FixContainer';
import {WIDTH_SCALE} from '@constants/constants';

const Splash = (prop: AllStackScreenProps<'Splash'>) => {
  const {navigation} = prop;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      navigation.replace('BottomTab');
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <FixedContainer
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          flex: 1,
          width: WIDTH_SCALE * 60,
          height: WIDTH_SCALE * 60,
        }}
        source={IMAGE.logo}
        resizeMode="contain"
      />
    </FixedContainer>
  );
};

export default Splash;
