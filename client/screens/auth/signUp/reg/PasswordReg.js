import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
// ICONS
import { AntDesign } from '@expo/vector-icons'

// form
import { Formik } from 'formik';
import * as yup from 'yup';

const initialPasswordValue = {
    pw: ''
};
const passwordValidation = yup.object().shape({
    pw: yup
     .string()
     .pw('please use strong password so that others cannot guess')
     .required('Password is required')
});

export default function PasswordReg({ route }) {
    const navigation = useNavigation();
    const data = route?.params?.param;

    const [hidePassword, setHidePassword] = useState(true);
    
    const handlePwSubmit = (values) => {
        const newData = {
            ...data,
            pw: values.pw
        }
        console.log(newData)
    };

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='mt-8 mx-3'>
                <Pressable onPress={() => navigation.navigate('BirthdayReg')}>
                    <AntDesign name='arrowleft' size={30} color='#010026' />
                </Pressable>
            </View>
            <View className='mt-6 mx-3'>
                <Text className='text-3xl font-semibold'>
                    Create a password
                </Text>
                <Text className='tracking-wide mt-2 pr-8'>
                    Create a password with at least 6 letters and numbers.
                    It should be something others can't guess.
                </Text>
            </View>
            {/* form */}
            <View className='mt-8 mx-3'>
                <Formik
                    validationSchema={passwordValidation}
                    initialValues={initialPasswordValue}
                    onSubmit={handlePwSubmit}
                >
                    {({handleChange, handleSubmit, values, errors, isValid}) => (
                        <>
                            {/* password */}
                            <View>
                                <TextInput 
                                    placeholder='Password'
                                    underlineColor='transparent'
                                    activeUnderlineColor='#3bace2'
                                    secureTextEntry={hidePassword}
                                    right={
                                        <TextInput.Icon 
                                            onPress={() => setHidePassword(!hidePassword)}
                                            icon={hidePassword ? 'eye-off' : 'eye'}
                                        />
                                    }
                                    className='mb-2 bg-indigo-50 rounded-lg'
                                    value={values.pw}
                                    onChangeText={handleChange('pw')}
                                />
                                {errors.pw && 
                                    <Text className='text-red-600'>{errors.pw}</Text>
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
                    onPress={() => navigation.navigate('SignIn')}
                >
                Sudah punya akun?
                </Text>
            </View>
        </SafeAreaView>
    )
}