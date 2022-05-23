import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from './home/homeSlice';
import userReducer from './user/userSlice';
import genresReducer from './genre/genreSlice';
import detailReducer from './detail/detailSlice';

const rootReducer = combineReducers({
  home: persistReducer(
    {
      key: 'home',
      storage: AsyncStorage,
    },
    homeReducer,
  ),
  user: userReducer,
  genre: persistReducer(
    {
      key: 'genres',
      storage: AsyncStorage,
    },
    genresReducer,
  ),
  detail: persistReducer(
    {
      key: 'detail',
      storage: AsyncStorage,
    },
    detailReducer,
  ),
});

export default rootReducer;
