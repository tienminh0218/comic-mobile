import { createAsyncThunk } from '@reduxjs/toolkit';
import { HomeState } from './homeSlice';
import API from '@services/api';

export const loadData = createAsyncThunk<HomeState>(
  'home/loadData',
  async () => {
    const res = await API.get('/home');
    if (res.status === 200) {
      console.log('data from fetch', res.data);
      return res.data;
    }

    return {
      recommend: [],
      popular: [],
      lastUpdated: [],
      newSeries: [],
    };
  },
);
