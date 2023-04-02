import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// post widget
import Post from '../../components/widgets/Post';
// icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { gql, useQuery } from '@apollo/client';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const GET_EXPLORE_POSTS = gql`
  query ExplorePosts($token: String) {
    explorePosts(token: $token) {
      _id
      userId
      username
      postDate
      postPicturePath
      userProfilePicturePath
      description
      likes
      comments
    }
  }
`;

export default function HomeScreen() {
  // navigation
  const navigation = useNavigation();
  const goToMessage = () => navigation.navigate('Message');

  const token = useSelector((state) => state.auth.token);
  // data
  const { data, loading } = useQuery(GET_EXPLORE_POSTS, { variables: {token: token} });

  return (
    <BottomSheetModalProvider>
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
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#406aff" />
        </View>
        ) : (
        <FlatList 
          data={data.explorePosts}
          renderItem={({ item }) => <Post item={item} />}
          keyExtractor={item => item._id}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={20}
        />
      )}
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}