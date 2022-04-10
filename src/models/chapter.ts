import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
export interface ImagesChapter {
  fullPath: string;
  nameFile: string;
  url: string;
}

export interface Chapter {
  id?: string;
  nameChapter: string;
  images: ImagesChapter[];
  createdAt?: FirebaseFirestoreTypes.FieldValue;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
}
