import React, { useRef, useMemo } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// icons
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// animation
import { useSharedValue, withSpring } from 'react-native-reanimated';
// modal comment
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalCommentTweet from '../../components/modal/ModalCommentTweet';

import dayjs from 'dayjs';
import { API_URL } from '@env'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import LikeAnimation from '../../components/animation/LikeAnimation';
const GET_TWEET = gql`
  query GetTweet($token: String, $tweetId: String) {
    getTweet(token: $token, tweetId: $tweetId) {
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

const LIKE_TWEET = gql`
  mutation LikeTweet($token: String, $tweetId: String, $userId: String) {
    likeTweet(token: $token, tweetId: $tweetId, userId: $userId) {
      _id
      likes
    }
  }
`;

export default function TweetScreen({ route }) {
  const navigation = useNavigation();
  const goToPreviousScreen = () => navigation.goBack();

  const { tweetId } = route?.params;
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);

  const {data: tweetData, loading: tweetLoading} = useQuery(GET_TWEET, {
    variables: {
      token: token,
      tweetId: tweetId
    }
  })

  // tweet config
  const isLiked = Boolean(tweetData?.getTweet.likes.find((id) => id === loggedInUserId));
  const likesCount = Number(tweetData?.getTweet.likes.length)
  const sourceImageProfile = {
    uri: `${API_URL}/assets/${tweetData?.getTweet?.userProfilePicturePath}`,
  };

  // modal comment
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const openModal = () => {
    bottomSheetModalRef.current.present();
  };
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  // like animation config
  const [likeTweet] = useMutation(LIKE_TWEET);
  const liked = useSharedValue(isLiked ? 1 : 0);
  const handleLiked = async () => {
    await likeTweet({
      variables: {
        token: token,
        tweetId: tweetData?.getTweet._id,
        userId: loggedInUserId,
      },
    });
    liked.value = withSpring(liked.value ? 0 : 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-whitebefore:">
      <View className="pb-2 px-3 flex-row items-center border-b border-gray-300">
        <TouchableOpacity onPress={goToPreviousScreen}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-bold">Tweet</Text>
      </View>

      {tweetLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#406aff" />
        </View>
      ) : (
        <ScrollView>
          <View className="my-2 p-2 border-b border-gray-300">
            {/* username and more vertical */}
            <View className="flex-row items-center gap-x-[16px] mb-2">
              <TouchableOpacity>
                <Avatar.Image size={55} source={sourceImageProfile} />
              </TouchableOpacity>
              <View className="flex-1 flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold">
                    {tweetData?.getTweet.username}
                  </Text>
                  <Text className="text-[10px]">
                    {dayjs(tweetData?.getTweet.postDate).format("MMMM D, YYYY")}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={19} />
                </TouchableOpacity>
              </View>
            </View>
            {/* tweets */}
            <View>
              <Text className="text-[16px] tracking-wider">
                {tweetData?.getTweet.tweet}
              </Text>
            </View>
            {/* love, comment, and share */}
            <View className="my-3 px-6 py-4 border-t border-b border-gray-300">
              <View className="flex-row justify-between items-center">
                {/* love */}
                <View className="flex-row items-center gap-x-1">
                  <TouchableOpacity onPress={handleLiked}>
                    <LikeAnimation color="#7d7d7d" size={22} liked={liked} />
                  </TouchableOpacity>
                  <Text className="text-[#7d7d7d]">{likesCount}</Text>
                </View>
                {/* comment */}
                <View className="flex-row items-center gap-x-1">
                  <TouchableOpacity onPress={openModal}>
                    <FontAwesome name="comment-o" size={22} color={"#7d7d7d"} />
                  </TouchableOpacity>
                  <Text className="text-[#7d7d7d]">
                    {tweetData?.getTweet.comments}
                  </Text>
                </View>
                {/* share */}
                <TouchableOpacity>
                  <MaterialIcons name="ios-share" size={22} color={"#7d7d7d"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {/* modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ModalCommentTweet onPress={closeModal} replyingTo={tweetData?.getTweet.username} />
      </BottomSheetModal>
    </SafeAreaView>
  );
}