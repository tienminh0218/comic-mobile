import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Toast } from 'toastify-react-native';

import { InsertNewUser } from '@models/user';
import { SignInType, SignUpType } from '@models/common';
import { clearUser, updateError } from '@stores/reducer/user/userSlice';
import { useAppDispatch } from '@stores/store/storeHook';

export const useAuth = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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

  const signIn = ({ email, password }: SignInType) => {
    return auth()
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
        console.log('error sigIn', error.message);
        Toast.error('Tài khoản hoặc mật khẩu không đúng');
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
      let errorMsg = '';
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        errorMsg = 'Email đã tồn tại';
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        errorMsg = 'Email không hợp lệ';
      }
      Toast.error(errorMsg);
      console.log('269696 error from signUp', error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log('result from login fb', result);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const userFb = await auth().signInWithCredential(facebookCredential);
      const { user, additionalUserInfo } = userFb;

      if (additionalUserInfo?.isNewUser) {
        const newUser: InsertNewUser = {
          info: {
            firstName: additionalUserInfo?.profile?.first_name,
            lastName: additionalUserInfo?.profile?.last_name,
            email: user?.email || '',
            photoURL: user?.photoURL || '',
          },
          providerId: additionalUserInfo?.providerId || '',
        };
        await insetNewUser(newUser, user.uid);
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTab',
          },
        ],
      });
    } catch (error) {
      console.log('269696 error from signInWithFacebook', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '119260786744-9m5ibblokcopnarnn2sk9pvalrf9k993.apps.googleusercontent.com',
      });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user, additionalUserInfo } = await auth().signInWithCredential(
        googleCredential,
      );

      if (additionalUserInfo?.isNewUser) {
        const newUser: InsertNewUser = {
          info: {
            firstName: additionalUserInfo?.profile?.given_name,
            lastName: additionalUserInfo?.profile?.family_name,
            email: user?.email || '',
            photoURL: user?.photoURL || '',
          },
          providerId: additionalUserInfo?.providerId || '',
        };
        await insetNewUser(newUser, user.uid);
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTab',
          },
        ],
      });
    } catch (error) {
      console.log('269696 error from signInWithGoogle', error);
      dispatch(updateError(error?.message));
    }
  };

  const signOut = async () => {
    dispatch(clearUser());
    return auth().signOut();
  };

  return {
    signIn,
    signUp,
    signInWithFacebook,
    signInWithGoogle,
    signOut,
  };
};
