import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// ICONS
import { AntDesign } from '@expo/vector-icons';

export default function NameReg() {
    const navigation = useNavigation();

    const styleInput = 'mb-2 bg-indigo-50 rounded-lg';

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='mt-8 mx-3'>
                <Pressable onPress={() => navigation.navigate('EmailReg')}>
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
                {/* first name */}
                <View>
                    <TextInput 
                        placeholder='First Name'
                        underlineColor='transparent'
                        activeUnderlineColor='#3bace2'
                        className={styleInput}
                    />
                </View>
                {/* last name */}
                <View>
                    <TextInput 
                        placeholder='Last Name'
                        underlineColor='transparent'
                        activeUnderlineColor='#3bace2'
                        className={styleInput}
                    />
                </View>
                {/* submit button */}
                <Pressable  
                    className='bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg'
                    onPress={() => navigation.navigate('BirthdayReg')}
                >
                    <Text className='text-center text-white font-semibold'>
                        Next
                    </Text>
                </Pressable>
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