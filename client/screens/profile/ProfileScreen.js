import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch } from 'react-redux';
import { setLogout } from '../../state/authSlice';

export default function ProfileScreen({ route }) {
  const userId = route?.params?.param;
  console.log("🚀 ~ file: ProfileScreen.js:10 ~ ProfileScreen ~ userId:", userId)
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 justify-center items-center'>
        <Text>Profile Screen</Text>
        <Button title='logout' onPress={handleLogout} />
      </View>
    </SafeAreaView>
  )
}