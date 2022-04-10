import SystemNavigationBar from 'react-native-system-navigation-bar';
import React, { useEffect } from 'react';
import { Image } from 'react-native';

import { AllStackScreenProps } from '@navigators/all-stack';
import { IMAGE } from '@constants/image-path';
import FixedContainer from '@components/FixContainer';
import { WIDTH_SCALE } from '@constants/constants';
import { useAppDispatch } from '@stores/store/storeHook';
import { loadData } from '@stores/reducer/home/actions';
import { loadGenres } from '@stores/reducer/genre/actions';

const Splash = (prop: AllStackScreenProps<'Splash'>) => {
  const { navigation } = prop;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadData());
    dispatch(loadGenres());
  }, []);

  useEffect(() => {
    SystemNavigationBar.navigationHide();
    const timeOutId = setTimeout(() => {
      navigation.replace('BottomTab');
      SystemNavigationBar.navigationShow();
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
