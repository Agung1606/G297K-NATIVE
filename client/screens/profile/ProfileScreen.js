import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Avatar } from 'react-native-paper';
import React, { useRef, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { FlatGrid } from 'react-native-super-grid';

// routin
import { useNavigation } from '@react-navigation/native';
import PostGrid from '../../components/PostGrid';
import Tweet from '../../components/widgets/Tweet';

// icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// modal
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ModalSetting from '../../components/modal/ModalSetting';

import { API_URL } from '@env'

// api
import { useQuery, useLazyQuery, gql } from '@apollo/client';
const GET_USER = gql`
  query GetUser($token: String, $userId: String) {
    getUser(token: $token, userId: $userId) {
      _id
      firstName
      lastName
      username
      profilePicturePath
      bio
      followers
      following
      postsCount
      tweetsCount
    }
  }
`;

const GET_IS_FOLLOWER = gql`
  query GetIsFollower(
    $token: String
    $followersUserId: String
    $userId: String
  ) {
    getIsFollower(token: $token, followersUserId: $followersUserId, userId: $userId) {
      username
    }
  }
`;

const GET_IS_FOLLOWING = gql`
  query GetIsFollowing(
    $token: String
    $followingUserId: String
    $userId: String
  ) {
    getIsFollowing(token: $token, followingUserId: $followingUserId, userId: $userId) {
      username
    }
  }
`;

const GET_USER_POSTS = gql`
  query GetUserPosts($token: String, $userId: String) {
    getUserPosts(token: $token, userId: $userId) {
      _id
      postPicturePath
    }
  }
`;

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

export default function ProfileScreen({ route }) {
  const userId = route?.params?.param;
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);

  // user data from api
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      token: token,
      userId: userId,
    },
  });

  // is follower
  const { data: isFollower, loading: isFollowerLoading } = useQuery(
    GET_IS_FOLLOWER,
    {
      variables: {
        token: token,
        followersUserId: loggedInUserId,
        userId: userId
      },
    }
  );
  
  // is following
  const { data: isFollowing, loading: isFollowingLoading } = useQuery(
    GET_IS_FOLLOWING,
    {
      variables: {
        token: token,
        followingUserId: loggedInUserId,
        userId: userId,
      },
    }
  );
  
  // user posts data from api
  const { data: postsData, loading: postLoading } = useQuery(GET_USER_POSTS, {
    variables: {
      token: token,
      userId: userId,
    },
  });
  
  // user tweets data from api
  const [getUserTweets, { data: tweetsData, loading: tweetLoading }] = useLazyQuery(GET_USER_TWEETS);
  
  const [screen, setScreen] = useState("Posts");
  const navigation = useNavigation();
  const goToPreviousScreen = () => navigation.goBack();
  const goToPosts = () => setScreen("Posts");
  const goToTweets = () => {
    setScreen("Tweets")
    if(data?.getUser?.tweetsCount > 0) getUserTweets({ variables: { token: token, userId: userId } });
  };

  // USER INFORMATION // note max bio is 100
  const fullname = `${data?.getUser?.firstName} ${data?.getUser?.lastName}`;
  const isMyProfile = loggedInUserId === userId;

  // modal
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const openModal = () => bottomSheetModalRef.current.present();
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  // style
  const selectedScreenStyle = "border-b border-blue";

  if (loading || isFollowerLoading || isFollowingLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#406aff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-3 my-2 flex-row justify-between items-center">
        {isMyProfile ? (
          <TouchableOpacity onPress={openModal}>
            <MaterialIcons name="settings" size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={goToPreviousScreen}>
            <MaterialIcons name="keyboard-arrow-left" size={30} />
          </TouchableOpacity>
        )}
        <Text className="text-[16px] font-semibold">
          {data?.getUser?.username}
        </Text>
      </View>
      {/* card wrapper */}
      <View
        className="bg-[#d4d4d4] h-[150px] px-[10px] mx-2 mb-2 rounded-xl
          flex-row justify-between items-center"
      >
        {/* picture path and username */}
        <View className="justify-center items-center gap-y-2">
          <Avatar.Image
            size={110}
            source={{
              uri: `${API_URL}/assets/${data?.getUser?.profilePicturePath}`,
            }}
          />
          <Text className="font-bold">{fullname}</Text>
        </View>
        {/* wrapper info */}
        <View className="space-y-4">
          {/* posts, followers, following */}
          <View className="flex-row items-center gap-x-[15px]">
            <View className="justify-center items-center">
              <Text className="text-lg font-bold">
                {screen === "Posts"
                  ? data?.getUser?.postsCount
                  : data?.getUser?.tweetsCount}
              </Text>
              <Text>{screen === "Posts" ? "Posts" : "Tweets"}</Text>
            </View>
            <View className="justify-center items-center">
              <Text className="text-lg font-bold">
                {data?.getUser?.followers}
              </Text>
              <Text>Followers</Text>
            </View>
            <View className="justify-center items-center">
              <Text className="text-lg font-bold">
                {data?.getUser?.following}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
          {/* button */}
          {isMyProfile ? (
            <TouchableOpacity className="bg-deep-blue rounded-lg">
              <Text className="text-center text-lg text-white font-semibold py-[2px]">
                Edit profile
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="bg-blue rounded-lg">
              <Text className="text-center text-lg text-white font-semibold py-[2px]">
                {
                  isFollowing?.getIsFollowing ? 'following' :
                  !isFollowing.getIsFollowing && isFollower?.getIsFollower ? 'follow back' :
                  'follow'
                }
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* bio */}
      {data?.getUser?.bio && (
        <View className="mx-3 mb-3">
          <Text>{item?.getUser?.bio}</Text>
        </View>
      )}

      {/* navigation post */}
      <View className="py-2 flex-row justify-around items-center border-y border-gray-500">
        <TouchableOpacity
          onPress={goToPosts}
          className={`justify-center items-center ${
            screen === "Posts" && selectedScreenStyle
          }`}
        >
          <MaterialCommunityIcons name="dots-grid" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToTweets}
          className={`justify-center items-center ${
            screen === "Tweets" && selectedScreenStyle
          }`}
        >
          <MaterialCommunityIcons name="bird" size={28} />
        </TouchableOpacity>
      </View>

      {/* posts or tweets */}
      {screen === "Posts" ? (
        postLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        ) : postsData?.getUserPosts.length > 0 ? (
          <FlatGrid
            itemDimension={80}
            data={postsData?.getUserPosts}
            renderItem={({ item }) => <PostGrid item={item} />}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
            <Text>No Posts</Text>
          </View>
        )
      ) : tweetLoading ? (
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

      {/* setting modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ModalSetting onPress={closeModal} />
      </BottomSheetModal>
    </SafeAreaView>
  );
}