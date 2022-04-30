import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

import FixedContainer from '@components/FixContainer';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { IMAGE } from '@constants/image-path';
import { AllStackScreenProps } from '@navigators/all-stack';
import { useAuth } from '@hooks/useAuth';
import CustomHeader from '@components/Header';
import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';

const Login = (props: AllStackScreenProps<'Login'>) => {
  const { navigation } = props;
  const { signInWithFacebook, signInWithGoogle } = useAuth();
  const textErr = useAppSelector((state: RootState) => state.user.testError);

  return (
    <FixedContainer>
      <CustomHeader
        title="Đăng nhập"
        style={{ marginBottom: 15 * WIDTH_SCALE }}
      />

      <Text style={{ color: 'black' }}>{textErr && 'chua co ne'}</Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: WIDTH_SCALE * 50,
              height: WIDTH_SCALE * 50,
              marginBottom: WIDTH_SCALE * 10,
              marginRight: 5,
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={IMAGE.logo}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: pColor.black,
              fontWeight: 'bold',
            }}>
            CatManga
          </Text>
        </View>

        <FormInput />

        <MyTouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            width: '80%',
            backgroundColor: pColor.textColor3,
            paddingVertical: WIDTH_SCALE * 10,
            borderRadius: 5,
            marginBottom: WIDTH_SCALE * 5,
            marginTop: WIDTH_SCALE * 15,
          }}>
          <Text
            style={{
              color: pColor.white,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Đăng ký
          </Text>
        </MyTouchableOpacity>

        <MyTouchableOpacity
          onPress={signInWithFacebook}
          style={{
            width: '80%',
            backgroundColor: pColor.facebookBg,
            paddingVertical: WIDTH_SCALE * 10,
            borderRadius: 5,
            marginBottom: WIDTH_SCALE * 5,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="facebook" size={35} color={pColor.white} />
          </View>
          <Text
            style={{
              color: pColor.white,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Facebook
          </Text>
        </MyTouchableOpacity>

        <MyTouchableOpacity
          onPress={signInWithGoogle}
          style={{
            width: '80%',
            backgroundColor: pColor.googleBg,
            paddingVertical: WIDTH_SCALE * 10,
            borderRadius: 5,
            position: 'relative',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="google" size={35} color={pColor.white} />
          </View>
          <Text
            style={{
              color: pColor.white,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Google
          </Text>
        </MyTouchableOpacity>
      </View>
    </FixedContainer>
  );
};

const FormInput = React.memo(() => {
  const [isShow, setIsShow] = useState(false);
  const { signIn } = useAuth();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleShowPassword = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const onSubmit = useCallback((data) => {
    const { email, password } = data;

    signIn({ email, password });
  }, []);

  return (
    <View style={{ width: '80%' }}>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            type: 'email',
            name: 'email',
            rules: {
              required: {
                value: true,
                message: 'Email không được để trống',
              },
            },
            textInputProps: {
              style: {},
              label: 'Email',
              activeOutlineColor: 'black',
            },
          },
          {
            type: isShow ? 'text' : 'password',
            name: 'password',
            rules: {
              required: {
                value: true,
                message: 'Mật khẩu không được để trống',
              },
            },
            textInputProps: {
              label: 'Mật khẩu',
              activeOutlineColor: 'black',
              right: (
                <TextInput.Icon
                  onPress={handleShowPassword}
                  name={isShow ? 'eye-off' : 'eye'}
                />
              ),
            },
          },
        ]}
      />

      <MyTouchableOpacity
        style={{
          backgroundColor: pColor.black,
          borderRadius: 5,
          paddingVertical: WIDTH_SCALE * 10,
        }}
        onPress={handleSubmit(onSubmit)}>
        <Text
          style={{
            color: pColor.white,
            fontSize: 16,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          Đăng nhập
        </Text>
      </MyTouchableOpacity>
      <View>
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: pColor.black,
          }}>
          Hoặc
        </Text>
      </View>
    </View>
  );
});

export default Login;
