import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch } from 'react-redux';
import { setLogout } from '../../state/authSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-3xl text-red-300'>Profile Screen</Text>
        <Button title='logout' onPress={() => dispatch(setLogout())} />
      </View>
    </SafeAreaView>
  )
}