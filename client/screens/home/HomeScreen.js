import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// api
import { useGetExplorePostsQuery } from '../../api/postApi';
// post widget
import Post from '../../components/widgets/Post';
// icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeScreen() {
  // navigation
  const navigation = useNavigation();
  const goToMessage = () => navigation.navigate('Message');

  const token = useSelector((state) => state.auth.token);
  // post data
  const { data: postsData, isLoading } = useGetExplorePostsQuery({ token });

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* top */}
      <View className='p-4 flex-row justify-between items-center'>
        <Text className='text-3xl font-itim text-deep-blue'>
          G297K
        </Text>
        <TouchableOpacity onPress={goToMessage}>
          <FontAwesome5 
            name='telegram-plane' 
            size={30} 
            className='text-deep-blue' 
          />
        </TouchableOpacity>
      </View>
      {/* posts */}
      {isLoading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#406aff" />
        </View>
        ) : (
        <FlatList 
          data={postsData}
          renderItem={({ item }) => <Post item={item} />}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  )
}