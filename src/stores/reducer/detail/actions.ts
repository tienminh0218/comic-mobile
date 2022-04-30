import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { ComicType } from '@models/comic';
import API from '@services/api';

export const loadDetailComic = createAsyncThunk(
  'detail/loadDetailComic',
  async (comicId: string, thunk: any) => {
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
    // console.log('26969 ~ load genres from detail/loadDetailComic', {
    //   data,
    // });

    return data;
  },
);

export const viewChap = createAsyncThunk(
  'detail/viewChap',
  async (
    { comicId, idChapter }: { comicId: String; idChapter: String },
    thunk: any,
  ) => {
    try {
      const data = await API.get(`/titles/${comicId}/views/${idChapter}`);
      return data.data;
    } catch (error) {
      return {};
    }
  },
);

export const interact = createAsyncThunk(
  'detail/interact',
  async (
    { comicId, idChapter }: { comicId: String; idChapter: String },
    thunk: any,
  ) => {
    try {
      const data = await API.get(`/titles/${comicId}/views/${idChapter}`);
      return data.data;
    } catch (error) {
      return {};
    }
  },
);
