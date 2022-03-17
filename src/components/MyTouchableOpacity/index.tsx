import _ from 'lodash';
import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const MyTouchableOpacity = (props: TouchableOpacityProps) => {
  const onPressFunc = React.useCallback(
    _.debounce(props?.onPress || (() => {}), 500, {
      leading: true,
      trailing: false,
    }),
    [props?.onPress],
  );

  return <TouchableOpacity {...props} onPress={onPressFunc} />;
};

export default MyTouchableOpacity;
