import { View, Pressable, Image } from 'react-native'
import React from 'react'
import { API_URL } from '@env'

export default function Posts({ item }) {
  return (
    <View className="h-[100px]">
      <Pressable onPress={() => alert(item._id)}>
        <Image
          source={{
            uri: `${API_URL}/assets/${item?.postPicturePath}`,
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
}