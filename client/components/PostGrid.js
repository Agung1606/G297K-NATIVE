import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { API_URL } from '@env'
import { useNavigation } from '@react-navigation/native';

export default function PostGrid({ item }) {
  const navigation = useNavigation();
  const goToPostScreen = () => navigation.navigate('PostScreen', {postId: item._id});

  return (
    <>
      <View className="h-[120px]">
        <TouchableOpacity onPress={goToPostScreen}>
          <Image
            source={{
              uri: `${API_URL}/assets/${item?.postPicturePath}`,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}