import { View, FlatList, ActivityIndicator } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux';

import Tweet from '../../components/widgets/Tweet';

import { gql, useQuery } from '@apollo/client'
const GET_TWEETS = gql`
  query GetTweets($token: String) {
    getTweets(token: $token) {
      _id
      userId
      username
      postDate
      userProfilePicturePath
      tweet
      likes
      comments
    }
  }
`;


function TweetsScreen() {
    const token = useSelector((state) => state.auth.token);
    const { data: tweetsData, loading: tweetsLoading } = useQuery(GET_TWEETS, {
      variables: { token: token },
    });

    if (tweetsLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#406aff" />
        </View>
      );
    }
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={tweetsData.getTweets}
        renderItem={({ item }) => <Tweet item={item} />}
        keyExtractor={(item) => item._id}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={15}
        removeClippedSubviews={true}
      />
    </View>
  );
}

export default memo(TweetsScreen)