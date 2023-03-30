import { View, Text, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import React from 'react'
// ICONS
import { AntDesign } from '@expo/vector-icons';

// formik
import { Formik } from 'formik';
import * as yup from 'yup';

const initialEmailValue = {
  email: ''
};
const emailValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required')
});

export default function EmailReg() {
  const navigation = useNavigation();
  const goToSignIn = () => navigation.navigate('SignIn');

  const handleEmailSubmit = (values) => {
    navigation.navigate('NameReg', { 
      param: values.email,
    });
  };

  return (
    <SafeAreaView className='flex-1 bg-white relative'>
      <View className='mt-8 mx-3'>
        <Pressable onPress={goToSignIn}>
          <AntDesign name='arrowleft' size={30} color='#010026' />
        </Pressable>
      </View>
      <View className='mt-6 mx-3'>
        <Text className='text-3xl font-semibold'>
          What's your email?
        </Text>
        <Text className='tracking-wide mt-2 pr-8'>
          Please enter your frequently used email, your email will be used if at any time you forget your password.
        </Text>
      </View>
      {/* form */}
      <View className='mt-8 mx-3'>
        <Formik
          validationSchema={emailValidation}
          initialValues={initialEmailValue}
          onSubmit={handleEmailSubmit}
        >
          {({handleChange, handleSubmit, values, errors, isValid}) => (
            <>
              {/* email */}
              <View>
                <TextInput 
                  placeholder='Email'
                  keyboardType='email-address'
                  underlineColor='transparent'
                  activeUnderlineColor='#3bace2'
                  className='mb-2 bg-indigo-50 rounded-lg'
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {errors.email && 
                  <Text className='text-red-600'>{errors.email}</Text>
                }
              </View>
              {/* button submit */}
              <Pressable 
                className='bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg'
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text className='text-center text-white font-semibold'>
                  Next
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
      {/* already have an account */}
      <View className='absolute bottom-6 w-full'>
        <Text 
          className='text-center font-bold text-blue'
          onPress={goToSignIn}
        >
          Sudah punya akun?
        </Text>
      </View>
    </SafeAreaView>
  )
}