import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from './home/homeSlice';
import userReducer from './user/userSlice';
import genresReducer from './genre/genreSlice';
import detailReducer from './detail/detailSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer,
  genre: genresReducer,
  detail: detailReducer,
});

export default persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);
