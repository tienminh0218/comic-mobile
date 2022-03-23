import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface initStateType {
  data: UserState | undefined;
}

const initialState: initStateType = {
  data: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearUser: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
