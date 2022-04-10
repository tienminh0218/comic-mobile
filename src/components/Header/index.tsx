import { Appbar } from 'react-native-paper';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { pColor } from '@constants/color';

interface CustomHeaderProps {
  onBackPress?: () => void;
  title?: string;
  subTitle?: string;
}

const CustomHeader = React.memo(
  ({ onBackPress, title, subTitle }: CustomHeaderProps) => {
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
      onBackPress ? onBackPress() : navigation?.goBack();
    }, [onBackPress]);

    return (
      <Appbar.Header
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: pColor.bgSubColor,
        }}>
        <Appbar.BackAction color={pColor.textColor2} onPress={handleGoBack} />
        {title && <Appbar.Content title={title} subtitle={subTitle} />}
      </Appbar.Header>
    );
  },
);

export default CustomHeader;
