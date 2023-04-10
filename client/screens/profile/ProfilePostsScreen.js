import { View, Text, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'

import { useSelector } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import PostGrid from '../../components/PostGrid';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useQuery, gql } from '@apollo/client'
const GET_USER_POSTS = gql`
  query GetUserPosts($token: String, $userId: String) {
    getUserPosts(token: $token, userId: $userId) {
      _id
      postPicturePath
    }
  }
`;

function ProfilePostsScreen({ route }) {
    const { userId } = route.params
    const token = useSelector((state) => state.auth.token);
    
    const { data: postsData, loading: postLoading } = useQuery(GET_USER_POSTS, {
      variables: {
        token: token,
        userId: userId,
      },
    });

    return (
      <View className="flex-1 bg-white">
        {postLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        ) : postsData?.getUserPosts.length > 0 ? (
          <FlatGrid
            itemDimension={95}
            spacing={5}
            data={postsData?.getUserPosts}
            renderItem={({ item }) => <PostGrid item={item} />}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
            <Text>No Posts</Text>
          </View>
        )}
      </View>
    );
}

export default memo(ProfilePostsScreen)