import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

import { ComicType } from '@models/comic';
import API from '@services/api';
import { clearDetail } from './detailSlice';

export const loadDetailComic = createAsyncThunk(
  'detail/loadDetailComic',
  async (comicId: string, thunkAPI) => {
    thunkAPI.dispatch(clearDetail());

    let data: ComicType | any = {};
    const documentSnapshot = await firestore()
      .collection('comics')
      .doc(comicId)
      .get();

    if (documentSnapshot.exists) {
      data = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };
    }

    return data;
  },
);

export const viewChap = createAsyncThunk(
  'detail/viewChap',
  async ({ comicId, idChapter }: { comicId: String; idChapter: String }) => {
    try {
      const data = await API.get(`/titles/${comicId}/view/${idChapter}`);
      return data.data;
    } catch (error) {
      return {};
    }
  },
);
