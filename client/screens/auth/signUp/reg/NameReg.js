import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// ICONS
import { AntDesign } from '@expo/vector-icons';

// form
import { Formik } from 'formik';
import * as yup from 'yup';

const initialNameValue = {
    firstName: '',
    lastName: '',
};
const nameValidation = yup.object().shape({
    firstName: yup
        .string()
        .min(3, ({ min }) => `First name must be at least ${min} characters`)
        .required('first name is required'),
    lastName: yup
        .string()
});

export default function NameReg({ route }) {
    const navigation = useNavigation();
    const goToSignIn = () => navigation.navigate('SignIn');
    const goToEmailReg = () => navigation.navigate('EmailReg');

    const email = route?.params?.param;

    const handleNameSubmit = (values) => {
        const newData = {
            ...values,
            email
        };
        navigation.navigate('BirthdayReg', {param: newData});
    };

    const styleInput = 'mb-2 bg-indigo-50 rounded-lg';
    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='mt-8 mx-3'>
                <Pressable onPress={goToEmailReg}>
                    <AntDesign name='arrowleft' size={30} color='#010026' />
                </Pressable>
            </View>
            <View className='mt-6 mx-3'>
                <Text className='text-3xl font-semibold'>
                    What's your name?
                </Text>
            </View>
            {/* form */}
            <View className='mt-8 mx-3'>
                <Formik
                    validationSchema={nameValidation}
                    initialValues={initialNameValue}
                    onSubmit={handleNameSubmit}
                >
                    {({handleChange, handleSubmit, values, errors}) => (
                        <>
                            {/* first name */}
                            <View>
                                <TextInput 
                                    placeholder='First Name'
                                    underlineColor='transparent'
                                    activeUnderlineColor='#3bace2'
                                    className={styleInput}
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                />
                                {errors.firstName && 
                                    <Text className='text-red-600'>{errors.firstName}</Text>}
                            </View>
                            {/* last name */}
                            <View>
                                <TextInput 
                                    placeholder='Last Name'
                                    underlineColor='transparent'
                                    activeUnderlineColor='#3bace2'
                                    className={styleInput}
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                />
                                {errors.lastName && 
                                    <Text className='text-red-600'>{errors.lastName}</Text>}
                            </View>
                            {/* submit button */}
                            <Pressable  
                                className='bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg'
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