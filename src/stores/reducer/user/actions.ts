import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { InteractsOfUser } from './userSlice';
import { User } from '@models/user';

export const loadInteracts = createAsyncThunk<
  InteractsOfUser | undefined,
  string
>('user/loadInteracts', async (userId: string) => {
  let result;

  await firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.exists) {
        const user = {
          id: querySnapshot.id,
          ...querySnapshot.data(),
        } as User;
        result = {
          comicsWasInteracted: user.histories.comicsWasInteracted,
          viewed: user.histories.viewed,
        };
      }
    });

  console.log('result ne ', result);

  return result;
});
