import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { setLogin } from '../../../state/authSlice'
import { useDispatch, useSelector } from 'react-redux';

// form
import { Formik } from 'formik';
import Toast from 'react-native-toast-message'

import { useMutation, gql } from '@apollo/client'
const LOGIN = gql`
  mutation Login($username: String, $pw: String) {
    login(username: $username, pw: $pw) {
       userData {
            _id
            username
            profilePicturePath
        }
        token
    }
  }
`;

export default function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigation();
  const goToRegister = () => navigation.navigate('FlowRegister');

  const [hidePassword, setHidePassword] = useState(true);
  const handleHidePassword = () => setHidePassword(!hidePassword)

  const inputStyle = 'w-[95%] mx-auto mb-2 bg-indigo-50 rounded-lg';
  const formStyle = 'w-[350px] sm:w-[400px] h-auto px-3 py-5 rounded-xl mt-4 sm:bg-black/5 backdrop-blur-sm sm:border sm:border-black/30'

  const [login, { loading }] = useMutation(LOGIN);
  const handleLoginSubmit = async (values, onSubmitProps) => {
    try {
      const loginPromise = await login({ variables: {
        username: values.username,
        pw: values.pw
      } });
      dispatch(
        setLogin({
          user: loginPromise.data.login.userData,
          token: loginPromise.data.login.token
        })
      )
      onSubmitProps.resetForm();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message
      })
    }
  };

  return (
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 flex-col sm:flex-row justify-center items-center'>
          <Text className='text-5xl font-itim text-[#2A2A72]'>
            G297K
          </Text>

          {/* FORM */}
          <View className={formStyle}>
            <Formik 
              initialValues={{
                username: user?.username || '',
                pw: ''
              }}
              onSubmit={handleLoginSubmit}
            >
              {({ handleChange, handleSubmit, values}) => (
                <>
                  {/* username */}
                  <View>
                    <TextInput 
                      placeholder='Username'
                      underlineColor='transparent'
                      activeUnderlineColor='#3bace2'
                      className={inputStyle}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      />
                  </View>

                  {/* password */}
                  <View>
                    <TextInput 
                      placeholder='Password'
                      underlineColor='transparent'
                      activeUnderlineColor='#3bace2'
                      secureTextEntry={hidePassword}
                      right={
                        <TextInput.Icon 
                          onPress={handleHidePassword}
                          icon={hidePassword ? 'eye-off' : 'eye'}
                        />
                      }
                      className={inputStyle}
                      value={values.pw}
                      onChangeText={handleChange('pw')}
                    />
                  </View>

                  {/* button submit */}
                  <Pressable
                    className='bg-[#3bace2] active:bg-[#229dd6] w-[95%] mx-auto mt-2 py-[10px] rounded-lg'
                    onPress={handleSubmit}
                  >
                    <Text className='text-center text-white font-semibold'>
                      {
                        loading 
                          ? <ActivityIndicator size="small" color="#fff" /> 
                          : 'Login'
                      }
                    </Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
          
          <View>
            <Text className='text-blue cursor-pointer'>
              Lupa Password?
            </Text>
          </View>

          <View className='mt-10 flex-row space-x-1'>
            <Text className='text-deep-blue'>Belum punya akun?</Text>
            <Text 
              className='text-blue'
              onPress={goToRegister}
            >
              Daftar
            </Text>
          </View>

        </View>
      </SafeAreaView>
  )
}