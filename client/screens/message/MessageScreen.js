import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function MessageScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-xl text-deep-blue'>Message Screen</Text>
        <Text className='text-deep-blue'>Maaf fitur ini sedang dalam proses pengembangan</Text>
      </View>
    </SafeAreaView>
  )
}