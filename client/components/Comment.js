import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import React from 'react'

export default function Comment({ item }) {

  return (
    <View className='p-2 my-2 border-t border-gray-600'>
      <View className='flex-row gap-x-2'>
          <TouchableOpacity>
            <Avatar.Image 
                size={30} 
                source={{uri: `http://192.168.0.106:6002/assets/${item?.profilePicturePath}`}} 
            />
          </TouchableOpacity>
          <View>
              <Text className='text-[12px] text-gray-400'>
                  {item.username}
              </Text>
              <Text>
                  {item.comment}
              </Text>
          </View>
      </View>
    </View>
  )
}