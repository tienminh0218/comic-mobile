import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface InfoUser {
  firstName: string | any;
  lastName: string | any;
  dob?: string;
  phoneNumber?: string;
  gender?: string;
  email?: string;
  photoURL?: string;
}

export interface HistoryViewed {
  // idComic?: string;
  // createdAt?: string;
  // updatedAt?: string;
  // nameChapter: string;
  // idChapter: string;
  // imageURL: string;
  // nameComic: string;
  // listChap: string[];

  idComic: string;
  idChapter: string;
  nameChapter?: string;
  listChap: string[];
  createdAt: number;
  updatedAt: number;
}

export interface ComicWasInteracted {
  idComic?: string;
  isLike: boolean;
  isBookmark: boolean;
}

export interface HistoryUser {
  comicsWasInteracted: ComicWasInteracted[];
  viewed: HistoryViewed[];
}

export interface User {
  id?: string;
  providerId: string;
  info: InfoUser;
  histories: HistoryUser;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  updatedAt: FirebaseFirestoreTypes.FieldValue;
}

export interface InsertNewUser {
  providerId: string;
  info: InfoUser;
}
