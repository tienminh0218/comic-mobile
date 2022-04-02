import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from '../reducer/home/homeSlice';
import userReducer from '../reducer/user/userSlice';
import genresReducer from '../reducer/genre/genreSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer,
  genre: genresReducer,
});

export default persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);
