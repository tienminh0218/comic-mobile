import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';

import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';

class MySpinner extends React.PureComponent {
  static instance = null;

  static show() {
    if (MySpinner.instance) {
      MySpinner.instance.setState({ visible: true });
    }
  }

  static hide() {
    if (MySpinner.instance) {
      MySpinner.instance.setState({ visible: false });
    }
  }

  constructor(props) {
    super(props);
    MySpinner.instance = this;
    this.state = {
      visible: false,
    };
  }
  render() {
    const { width, height } = this.context;

    if (MySpinner?.instance?.state?.visible) {
      return (
        <Modal
          deviceWidth={width}
          deviceHeight={height}
          backdropOpacity={1}
          animationIn="fadeInDown"
          animationInTiming={500}
          animationOutTiming={500}
          visible={MySpinner?.instance?.state?.visible}
          transparent={true}>
          <View
            style={[
              { ...StyleSheet.absoluteFillObject },
              {
                position: 'absolute',
                width: width,
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0000001a',
              },
            ]}>
            <View
              style={{
                width: 40 * WIDTH_SCALE * 2,
                height: 40 * WIDTH_SCALE * 2,
                borderRadius: 4 * WIDTH_SCALE,
                backgroundColor: 'transparent',
              }}>
              <SkypeIndicator color={pColor.black} size={40 * WIDTH_SCALE} />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }
}
export default MySpinner;
