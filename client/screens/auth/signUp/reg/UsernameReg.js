import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
// ICONS
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function UsernameReg() {
    const navigation = useNavigation();

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
                {/* username */}
                <View>
                    <TextInput 
                        placeholder='Username'
                        underlineColor='transparent'
                        activeUnderlineColor='#3bace2'
                        className='mb-2 bg-indigo-50 rounded-lg'
                    />
                </View>

                {/* submit button */}
                <Pressable
                    className='bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg'
                    onPress={() => alert('login')}
                >
                    <Text className='text-center text-white font-semibold'>
                        Create account
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}