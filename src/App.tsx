import AllStack from '@navigators/all-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SystemNavigationBar.setNavigationColor('#fff');
  }, []);

  return (
    <NavigationContainer>
      <AllStack />
    </NavigationContainer>
  );
};

export default App;
