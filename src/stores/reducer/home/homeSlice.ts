import { createSlice } from '@reduxjs/toolkit';

import { ComicType } from '@models/comic';
import { loadData } from './thunks';

export interface HomeState {
  recommend: ComicType[];
  popular: ComicType[];
  lastUpdated: ComicType[];
  newSeries: ComicType[];
}

interface initStateType {
  data: HomeState;
  isLoading: boolean;
}

const initialState: initStateType = {
  data: {
    recommend: [],
    popular: [],
    lastUpdated: [],
    newSeries: [],
  },
  isLoading: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default homeSlice.reducer;
