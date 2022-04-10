import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicType } from '@models/comic';
import { Chapter } from '@models/chapter';
import { loadDetailComic, viewChap } from './actions';

interface initStateType {
  data: ComicType | undefined;
  dataChapter: any;
  isLoading: boolean;
}

const initialState: initStateType = {
  data: undefined,
  dataChapter: undefined,
  isLoading: false,
};

export const detailSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateDetail: (state, action: PayloadAction<ComicType>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearDetail: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDetailComic.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadDetailComic.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadDetailComic.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(viewChap.fulfilled, (state, action) => {
      state.dataChapter = action.payload;
    });
  },
});

export const { updateDetail, clearDetail } = detailSlice.actions;
export default detailSlice.reducer;
