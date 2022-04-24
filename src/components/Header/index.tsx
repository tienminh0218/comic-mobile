import { Appbar } from 'react-native-paper';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { pColor } from '@constants/color';
import { StyleProp, ViewStyle } from 'react-native';

interface CustomHeaderProps {
  onBackPress?: () => void;
  title?: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomHeader = React.memo(
  ({ onBackPress, title, subTitle, style }: CustomHeaderProps) => {
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
      onBackPress ? onBackPress() : navigation?.goBack();
    }, [onBackPress]);

    return (
      <Appbar.Header
        style={[
          {
            backgroundColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: pColor.bgSubColor,
          },
          style,
        ]}>
        <Appbar.BackAction color={pColor.textColor2} onPress={handleGoBack} />
        {title && <Appbar.Content title={title} subtitle={subTitle} />}
      </Appbar.Header>
    );
  },
);

export default CustomHeader;
