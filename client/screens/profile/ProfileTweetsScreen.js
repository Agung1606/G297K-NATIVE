import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
// icons
import { MaterialCommunityIcons } from '@expo/vector-icons'
// widget tweet
import Tweet from '../../components/widgets/Tweet';
// api
import { useQuery, gql } from '@apollo/client';
const GET_USER_TWEETS = gql`
  query GetUserTweets($token: String, $userId: String) {
    getUserTweets(token: $token, userId: $userId) {
      _id
      username
      postDate
      userProfilePicturePath
      tweet
      likes
      comments
    }
  }
`;

function ProfileTweetsScreen({ route }) {
    const { userId } = route?.params;
    const token = useSelector((state) => state.auth.token);

    const { data: tweetsData, loading: tweetLoading } = useQuery(
      GET_USER_TWEETS,
      {
        variables: {
          token: token,
          userId: userId,
        },
      }
    );

    return (
      <View className="flex-1 bg-white">
        {tweetLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        ) : tweetsData?.getUserTweets?.length > 0 ? (
          <FlatList
            data={tweetsData?.getUserTweets}
            renderItem={({ item }) => <Tweet item={item} />}
            keyExtractor={(item) => item._id}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={20}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
            <Text>No Tweets</Text>
          </View>
        )}
      </View>
    );
}

export default memo(ProfileTweetsScreen)