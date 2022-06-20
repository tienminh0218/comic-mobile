import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import ToastManager from '../../../forked_node_modules/toastify-react-native';

import FixedContainer from '@components/FixContainer';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { IMAGE } from '@constants/image-path';
import { AllStackScreenProps } from '@navigators/all-stack';
import { useAuth } from 'src/hooks/useAuth';
import CustomHeader from '@components/Header';

const Register = (props: AllStackScreenProps<'Register'>) => {
  return (
    <FixedContainer>
      <CustomHeader title="Đăng ký" />
      <ToastManager />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginTop: -80,
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
      </View>
    </FixedContainer>
  );
};

const FormInput = React.memo(() => {
  const [isShow, setIsShow] = useState(false);
  const { signUp } = useAuth();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    mode: 'onBlur',
  });

  const handleShowPassword = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const onSubmit = useCallback(async (data) => {
    try {
      signUp(data);
    } catch (error) {
      console.log('error catch', error);
    }
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
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: 'Vui lòng nhập email hợp lệ',
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
          {
            type: 'text',
            name: 'firstName',
            rules: {
              required: {
                value: true,
                message: 'Tên không được để trống',
              },
              minLength: {
                value: 2,
                message: 'Tên ít nhất 2 kí tự',
              },
              maxLength: {
                value: 20,
                message: 'Tên ít hơn 2 kí tự',
              },
              pattern: {
                value: /^([^0-9]*)$/,
                message: 'Tên không bao gồm số',
              },
            },
            textInputProps: {
              style: {},
              label: 'Tên',
              activeOutlineColor: 'black',
            },
          },
          {
            type: 'text',
            name: 'lastName',
            rules: {
              required: {
                value: true,
                message: 'Họ không được để trống',
              },
              minLength: {
                value: 2,
                message: 'Họ ít nhất 2 kí tự',
              },
              maxLength: {
                value: 20,
                message: 'Họ ít hơn 2 kí tự',
              },
              pattern: {
                value: /^([^0-9]*)$/,
                message: 'Họ không bao gồm số',
              },
            },
            textInputProps: {
              style: {},
              label: 'Họ',
              activeOutlineColor: 'black',
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
          Đăng Ký
        </Text>
      </MyTouchableOpacity>
    </View>
  );
});

export default Register;
