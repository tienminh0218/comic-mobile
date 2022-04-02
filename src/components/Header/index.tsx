import { Appbar } from 'react-native-paper';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  onBackPress?: () => void;
}

const CustomHeader = React.memo(({ onBackPress }: CustomHeaderProps) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    onBackPress ? onBackPress() : navigation?.goBack();
  }, [onBackPress]);

  return (
    <Appbar.Header
      style={{
        backgroundColor: 'transparent',
        elevation: 0,
      }}>
      <Appbar.BackAction onPress={handleGoBack} />
    </Appbar.Header>
  );
});

export default CustomHeader;
