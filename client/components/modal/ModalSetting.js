import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state/authSlice';

// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ModalSetting() {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(setLogout());
    return (
        <View className='px-2'>
            <View className='flex-row justify-between px-3 pb-2 border-b border-gray-600'>
                <Text className='text-xl font-bold'>Settings</Text>
                <MaterialIcons name='close' size={24} />
            </View>
            <View className='mt-4'>
                <TouchableOpacity>
                    <View 
                        className='flex-row justify-between items-center bg-gray-200 p-2 mb-3 rounded-lg'
                    >
                        <Text className='text-white text-[16px] font-semibold'>
                            Edit Profile
                        </Text>
                        <MaterialIcons name='keyboard-arrow-right' size={22} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <View 
                        className='flex-row justify-between items-center bg-gray-200 p-2 mb-3 rounded-lg'
                    >
                        <Text className='text-red-500 text-[16px] font-semibold'>
                            Log Out
                        </Text>
                        <MaterialIcons name='keyboard-arrow-right' size={22} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}