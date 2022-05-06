import React from 'react';
import { ActivityIndicator } from 'react-native';

import FixedContainer from '@components/FixContainer';
import { pColor } from '@constants/color';

export const LoadingScreen = React.memo(() => {
  return (
    <FixedContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} color={pColor.black} />
    </FixedContainer>
  );
});
