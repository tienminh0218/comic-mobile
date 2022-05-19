import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

import { InteractsOfUser } from './userSlice';
import { ComicWasInteracted, User } from '@models/user';
import { RootState } from '@stores/store/store';

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

  return result;
});

export const interactWithComic = createAsyncThunk<
  any,
  ComicWasInteracted,
  { state: RootState }
>('user/interactWithComic', async (interaction, thunkAPI) => {
  try {
    const { idComic } = interaction;
    const list = [...thunkAPI.getState().user.interacts.comicsWasInteracted];
    const userId = thunkAPI.getState().user.data?.id;

    const index = list.findIndex((v) => v.idComic === idComic);
    if (index !== -1) {
      /// update
      list.splice(index, 1, interaction);
    } else {
      /// add
      list.push(interaction);
    }

    await firestore().collection('users').doc(userId).update({
      'histories.comicsWasInteracted': list,
    });

    thunkAPI.dispatch(loadInteracts(userId!));
    return list;
  } catch (error: any) {
    console.log('error from interactWithComic', error.message);
    return undefined;
  }
});

export const updateHistory = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('user/historyComic', async (idComic, thunkAPI) => {
  const historyComicClone = [...thunkAPI.getState().user.interacts.viewed];

  console.log('clone array', historyComicClone);
});
