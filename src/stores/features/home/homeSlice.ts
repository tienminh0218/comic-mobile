import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ComicType } from '@models/comic';
import type { RootState } from '@stores/app/store';
import { loadData } from './thunks';

export interface HomeState {
  recommend: ComicType[];
  popular: ComicType[];
  lastUpdated: ComicType[];
  newSeries: ComicType[];
}

interface initStateType {
  data: HomeState;
}

const initialState: initStateType = {
  data: {
    recommend: [],
    popular: [],
    lastUpdated: [],
    newSeries: [],
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default homeSlice.reducer;
