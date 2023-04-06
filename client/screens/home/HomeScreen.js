import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// post widget
import Post from '../../components/widgets/Post';
// icons

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import Tweet from '../../components/widgets/Tweet';
const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($token: String) {
    getExplorePosts(token: $token) {
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

export default function HomeScreen() {
  const [screen, setScreen] = useState('Posts');
  
  const token = useSelector((state) => state.auth.token);
  // data
  const { data: postsData, loading: postsLoading } = useQuery(GET_EXPLORE_POSTS, { variables: {token: token} });
  const [getTweets, { data: tweetsData, loading: tweetsLoading }] = useLazyQuery(GET_TWEETS);
  
  const goToPosts = () => setScreen('Posts');
  const goToTweets = () => {
    setScreen('Tweets')
    getTweets({ variables: { token: token }});
  };

  // style
  const selectedStyle = "text-[15px] font-semibold border-b-[2px] border-blue";
  const notSelectedStyle = "text-[15px] text-gray-600";

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* top */}
      <View className="px-2 py-[4px] border-b border-gray-600 flex-row justify-center items-center">
        <Text className="text-xl font-itim text-deep-blue">G297K</Text>
      </View>
      <View className="px-2 py-[10px] border-b border-gray-600 flex-row justify-around items-center">
        <TouchableOpacity onPress={goToPosts}>
          <Text
            className={screen === "Posts" ? selectedStyle : notSelectedStyle}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToTweets}>
          <Text
            className={screen === "Tweets" ? selectedStyle : notSelectedStyle}
          >
            Tweets
          </Text>
        </TouchableOpacity>
      </View>

      {postsLoading || tweetsLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#406aff" />
        </View>
      ) : (
        <FlatList
          data={screen === "Posts" ? postsData.getExplorePosts : tweetsData.getTweets}
          renderItem={({ item }) => screen === "Posts" ? <Post item={item} /> : <Tweet item={item} />}
          keyExtractor={(item) => item._id}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={20}
        />
      )}
    </SafeAreaView>
  );
}