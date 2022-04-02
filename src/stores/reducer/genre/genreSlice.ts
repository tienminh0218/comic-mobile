import { GenreType } from '@models/genre';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadGenres } from './thunks';

interface initStateType {
  data: GenreType[];
}

const initialState: initStateType = {
  data: [],
};

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadGenres.fulfilled,
      (state, action: PayloadAction<GenreType[]>) => {
        state.data = action.payload;
      },
    );
  },
});

export default genreSlice.reducer;
