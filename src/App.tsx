import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import AllStack from '@navigators/all-stack';
import { NavigationContainer } from '@react-navigation/native';
import store from '@stores/app/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
