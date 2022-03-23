import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from '../reducer/home/homeSlice';
import userReducer from '../reducer/user/userSlice';

export default combineReducers({
  home: homeReducer,
  user: userReducer,
});
