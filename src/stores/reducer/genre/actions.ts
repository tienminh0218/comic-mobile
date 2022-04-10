import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { GenreType } from '@models/genre';

export const loadGenres = createAsyncThunk<GenreType[]>(
  'genres/loadData',
  async () => {
    const data: GenreType[] = [];

    await firestore()
      .collection('genres')
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          const result: any = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          data.push(result);
        });
      });
    // console.log('26969 ~ load genres from genres/loadData', data);

    return data;
  },
);
