import { View, FlatList, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'
import Post from '../../components/widgets/Post';

import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

const GET_POSTS = gql`
  query GetPosts($token: String) {
    getPosts(token: $token) {
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


function PostsScreen() {
 
    const token = useSelector((state) => state.auth.token);
    const { data: postsData, loading: postsLoading } = useQuery(GET_POSTS, {
      variables: { token: token },
    });

    if(postsLoading) {
        return (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        );
    }
    return (
      <View className="flex-1 bg-white">
        <FlatList
          data={postsData.getPosts}
          renderItem={({ item }) => <Post item={item} />}
          keyExtractor={(item) => item._id}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={20}
        />
      </View>
    );
}

export default memo(PostsScreen);