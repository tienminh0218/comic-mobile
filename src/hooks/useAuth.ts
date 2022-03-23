import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { InsertNewUser } from '@models/user';
import { SignInType, SignUpType } from '@models/common';

export const useAuth = () => {
  const navigation = useNavigation();

  const insetNewUser = async (
    { info, providerId }: InsertNewUser,
    uid: string,
  ) => {
    return firestore()
      .collection('users')
      .doc(uid)
      .set({
        info: {
          dob: '',
          phoneNumber: '',
          gender: 'Nam',
          email: '',
          photoURL: '',
          ...info,
        },
        providerId: providerId,
        histories: {
          viewed: [],
          comicsWasInteracted: [],
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  const signIn = async ({ email, password }: SignInType) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result from sign in', result);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTab',
            },
          ],
        });
      })
      .catch((error) => {
        console.log('error here -> ', error);
      });
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpType) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User account created & signed in!', result);

      const { uid: id, providerId } = result.user;
      const newUser: InsertNewUser = {
        info: {
          firstName,
          lastName,
          email: result.user?.email || '',
        },
        providerId,
      };
      await insetNewUser(newUser, id);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTab',
          },
        ],
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };

  const signOut = async () => {
    return auth().signOut();
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};
