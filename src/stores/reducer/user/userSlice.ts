import { ComicType } from '@models/comic';
import { ComicWasInteracted, HistoryViewed } from '@models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadInteracts } from './actions';

export interface UserState {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface InteractsOfUser {
  comicsWasInteracted: ComicWasInteracted[];
  viewed: HistoryViewed[];
}

interface initStateType {
  data: UserState | undefined;
  interacts: InteractsOfUser;
  listRecommend: ComicType[];
  testError: string;
}

const initialState: initStateType = {
  data: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  interacts: {
    comicsWasInteracted: [],
    viewed: [],
  },
  listRecommend: [],
  testError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.testError = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    updateRecommendUser: (state, action: PayloadAction<ComicType[]>) => {
      state.listRecommend = action.payload;
    },
    clearUser: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadInteracts.fulfilled,
      (state, action: PayloadAction<InteractsOfUser | undefined>) => {
        if (action.payload !== undefined) {
          state.interacts = {
            ...state.interacts,
            ...action.payload,
          };
        }
      },
    );
  },
});

export const { updateUser, clearUser, updateError, updateRecommendUser } =
  userSlice.actions;
export default userSlice.reducer;
