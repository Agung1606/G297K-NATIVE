import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper';
import React, { useRef, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProfilePostsScreen from './ProfilePostsScreen'
import ProfileTweetsScreen from './ProfileTweetsScreen'

// routin
import { useNavigation } from '@react-navigation/native';
// icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// modal
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ModalSetting from '../../components/modal/ModalSetting';
// secret variable
import { API_URL } from '@env'
// api
import { useQuery, gql, useMutation } from '@apollo/client';
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

const FOLLOW_UNFOLLOW = gql`
  mutation FollowUnfollow($token: String, $otherId: String, $userId: String) {
    followUnfollow(token: $token, otherId: $otherId, userId: $userId) {
      otherUpdated {
        _id
        followers
      }
      userUpdated {
        _id
        following
      }
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

  // follow unfollow api
  const [followUnfollow, { loading: loadingFollow }] = useMutation(FOLLOW_UNFOLLOW);
  const handleFollow = async () => {
    await followUnfollow({ variables: {
      token: token,
      otherId: userId,
      userId: loggedInUserId
    }})
  }

  const [screen, setScreen] = useState("Posts");
  const navigation = useNavigation();
  const goToEditProfileScreen = () => navigation.navigate('EditProfileScreen');
  const goToPreviousScreen = () => navigation.goBack();

  const goToPosts = () => {
    navigation.navigate('ProfilePostsScreen')
    setScreen("Posts")
  };
  const goToTweets = () => {
    navigation.navigate('ProfileTweetsScreen')
    setScreen("Tweets");
  };

  // USER INFORMATION // note max bio is 100
  const fullname = `${data?.getUser?.firstName} ${data?.getUser?.lastName}`;
  const isMyProfile = loggedInUserId === userId;
  const isFollowing = Boolean(
    data?.getUser?.followers?.find((id) => id === loggedInUserId)
  );
  const isFollowers = Boolean(
    data?.getUser?.following?.find((id) => id === loggedInUserId)
  );

  // modal
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const openModal = () => bottomSheetModalRef.current.present();
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  // style
  const selectedScreenStyle = "border-b border-blue";

  if (loading) {
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
                {data?.getUser?.followers.length}
              </Text>
              <Text>Followers</Text>
            </View>
            <View className="justify-center items-center">
              <Text className="text-lg font-bold">
                {data?.getUser?.following.length}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
          {/* button */}
          {isMyProfile ? (
            <TouchableOpacity
              onPress={goToEditProfileScreen}
              className="bg-deep-blue rounded-lg"
            >
              <Text className="text-center text-lg text-white font-semibold py-[2px]">
                Edit profile
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleFollow}
              className={`${
                isFollowing ? "bg-gray-900" : "bg-blue"
              } rounded-lg`}
            >
              <Text className="mx-auto text-lg text-white font-semibold py-[2px]">
                {loadingFollow ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : isFollowing ? (
                  "following"
                ) : !isFollowing && isFollowers ? (
                  "follow back"
                ) : (
                  "follow"
                )}
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

      {/* posts and tweets */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ProfilePostsScreen"
          component={ProfilePostsScreen}
          initialParams={{ userId: userId }}
          options={{
            presentation: "modal",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="ProfileTweetsScreen"
          component={ProfileTweetsScreen}
          initialParams={{ userId: userId }}
          options={{
            presentation: "modal",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>

      {/* setting modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ModalSetting
          goToEditProfileScreen={goToEditProfileScreen}
          closeModal={closeModal}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}