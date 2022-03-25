import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import auth from '@react-native-firebase/auth';

import AllStack from '@navigators/all-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import store from '@stores/store/store';
import { pColor } from '@constants/color';
import { useAppDispatch } from '@stores/store/storeHook';
import { clearUser, updateUser } from '@stores/reducer/user/userSlice';

let persistor = persistStore(store);

const Main = React.memo(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        const data = {
          id: user.uid,
          email: user?.email || user.displayName!,
        };
        dispatch(updateUser(data));
      }
      // dispatch(clearUser());
      console.log('subscriber here --> ', user);
    });
    return subscriber;
  }, []);

  return (
    <PersistGate
      loading={<ActivityIndicator animating={true} color={pColor.black} />}
      persistor={persistor}>
      <NavigationContainer theme={MyTheme}>
        <AllStack />
      </NavigationContainer>
    </PersistGate>
  );
});

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
