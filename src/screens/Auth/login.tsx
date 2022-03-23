import FixedContainer from '@components/FixContainer';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { IMAGE } from '@constants/image-path';
import React, { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { TextInput, IconButton } from 'react-native-paper';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import { AllStackScreenProps } from '@navigators/all-stack';

const Login = (props: AllStackScreenProps<'Login'>) => {
  const { navigation } = props;

  return (
    <FixedContainer
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
          marginTop: WIDTH_SCALE * 30,
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
      <MyTouchableOpacity
        style={{
          width: WIDTH_SCALE * 100,
          alignSelf: 'flex-end',
        }}>
        <Text
          style={{
            textAlign: 'right',
            marginTop: 10,
            color: pColor.black,
          }}>
          Quên mật khẩu.
        </Text>
      </MyTouchableOpacity>
    </View>
  );
});

export default Login;
