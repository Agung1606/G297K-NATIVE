import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
// ICONS
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

// api
import { useRegisterUserMutation } from '../../../../api/authApi';

// form
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message'

const initialUsernameValue = {
    username: '',
};
const usernameValidation = yup.object().shape({
    username: yup
        .string()
        .required('Username is required and must be unique')
});

export default function UsernameReg({ route }) {
    const navigation = useNavigation();
    const data = route?.params?.param;

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    // handle register
    const handleUsernameSubmit = async (values, onSubmitProps) => {
        try {
            const newData = {
                ...data,
                username: values.username
            }
            const registerPromise = await registerUser(newData).unwrap();
            console.log(registerPromise)
            onSubmitProps.resetForm();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.data.msg
            })
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='mt-8 mx-3'>
                <Pressable onPress={() => navigation.navigate('PasswordReg')}>
                    <AntDesign name='arrowleft' size={30} color='#010026' />
                </Pressable>
            </View>
            <View className='mt-6 mx-3'>
                <Text className='text-3xl font-semibold'>
                    What's your username?
                </Text>
                <Text className='tracking-wide mt-2 pr-8'>
                    Please make your username unique from people around the world.
                </Text>
            </View>
            {/* form */}
            <View className='mt-8 mx-3'>
                <Formik
                    validationSchema={usernameValidation}
                    initialValues={initialUsernameValue}
                    onSubmit={handleUsernameSubmit}
                >
                    {({handleChange, handleSubmit, values, errors, isValid}) => (
                        <>
                            {/* username */}
                            <View>
                                <TextInput 
                                    placeholder='Username'
                                    underlineColor='transparent'
                                    activeUnderlineColor='#3bace2'
                                    className='mb-2 bg-indigo-50 rounded-lg'
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                />
                                {errors.username && 
                                    <Text className='text-red-600'>{errors.username}</Text>
                                }   
                            </View>

                            {/* submit button */}
                            <Pressable
                                className='bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg'
                                disabled={!isValid}
                                onPress={handleSubmit}
                            >
                                <Text className='text-center text-white font-semibold'>
                                    {
                                        isLoading 
                                        ? <ActivityIndicator size="small" color="#fff" /> 
                                        : 'Create account'
                                    }
                                </Text>
                            </Pressable>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}