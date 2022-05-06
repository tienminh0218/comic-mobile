import { createAsyncThunk } from '@reduxjs/toolkit';
import { HomeState } from './homeSlice';
import API from '@services/api';

const DEFAULT_VALUE = {
  recommend: [],
  popular: [],
  lastUpdated: [],
  newSeries: [],
};

export const loadData = createAsyncThunk<HomeState>(
  'home/loadData',
  async () => {
    try {
      const res = await API.get('/home');
      if (res.status === 200) {
        return res.data;
      }
      return DEFAULT_VALUE;
    } catch (error: any) {
      console.log('error from loadData home action', error?.message);
      return DEFAULT_VALUE;
    }
  },
);
