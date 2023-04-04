import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { TextInput, Avatar } from 'react-native-paper'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function ModalComment({ onPress, data }) {
  return (
    <View className='px-2'>
        <View 
          className='flex-row justify-between px-3 pb-2 border-b border-gray-600'
        >
            <Text className='text-xl font-bold'>Comments</Text>
            <MaterialIcons name='close' size={24} onPress={onPress} />
        </View>
        <View className='pr-2 mt-2 flex-row items-center gap-x-4'>
            <TextInput 
                placeholder='Add a comment...'
                underlineColor='transparent'
                activeUnderlineColor='#3bace2'
                className='flex-1 h-[38px] bg-gray-300'
            />
            <TouchableOpacity>
                <MaterialIcons name='send' size={24} />
            </TouchableOpacity>
        </View>
        <FlatList 
            data={data}
            renderItem={({ item }) => (
                <Comment item={item} />
            )}
            keyExtractor={item => item._id}
        />
    </View>
  )
}

function Comment({ item }) {

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