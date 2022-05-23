import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import { InteractsOfUser } from './userSlice';
import { ComicWasInteracted, User } from '@models/user';
import { Chapter } from '@models/chapter';
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
          // viewed: user.histories.viewed,
          viewed: [
            {
              idChapter: '0199ac00-8a4d-4d2f-b820-4a0238bb23f6',
              idComic: 'laWH3Wo7Do3aFN7HwxgI',
              listChap: ['0199ac00-8a4d-4d2f-b820-4a0238bb23f6'],
              createdAt: 1653043057218,
              updatedAt: 1653043057218,
            },
          ],
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
  { idComic: string; chapter: Chapter },
  { state: RootState }
>('user/historyComic', async ({ idComic, chapter }, thunkAPI) => {
  const userId = thunkAPI.getState().user.data?.id;
  const historyComicClone = [...thunkAPI.getState().user.interacts.viewed];
  const currentTime = moment().valueOf();
  const index = historyComicClone.findIndex((v) => v.idComic === idComic);

  if (!userId) return;

  if (index !== -1) {
    /// update
    const isNewChapterId = historyComicClone[index].listChap.includes(
      chapter.id!,
    );

    historyComicClone.splice(index, 1, {
      ...historyComicClone[index],
      idChapter: chapter.id!,
      listChap: !isNewChapterId
        ? [...historyComicClone[index].listChap, chapter.id!]
        : historyComicClone[index].listChap,
      updatedAt: currentTime,
    });
  } else {
    /// add
    historyComicClone.push({
      idComic,
      idChapter: chapter.id!,
      listChap: [chapter.id!],
      createdAt: currentTime,
      updatedAt: currentTime,
    });
  }

  firestore().collection('users').doc(userId).update({
    'histories.viewed': historyComicClone,
  });
});
