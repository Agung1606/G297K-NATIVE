import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, memo, useRef, useMemo } from 'react'
import { Avatar } from 'react-native-paper'
import dayjs from 'dayjs'

import { API_URL } from '@env'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

// modal comment
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ModalComment from '../modal/ModalComment'

import { gql, useLazyQuery } from '@apollo/client'
const GET_POST_COMMENTS = gql`
  query GetPostComments($token: String, $postId: String) {
    getPostComments(token: $token, postId: $postId) {
      _id
      userId
      username
      profilePicturePath
      comment
    }
  }
`;

function Tweet({ item }) {
  const [moreTweet, setMoreTweet] = useState(false);
  const handleMoreTweet = () => setMoreTweet(true);

  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  // 
  const isLiked = Boolean(item?.likes?.find(id => id === loggedInUserId));
  const likesCount = Number(item?.likes.length);
  const longTweet = item?.tweet?.length > 550 && !moreTweet ? item?.tweet.slice(0, 550) : item?.tweet;

  // comment api
  const [getPostComments, { data, loading }] = useLazyQuery(GET_POST_COMMENTS);

  // modal comment
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['65%', '90%'], []);
  const openModal = () => {
    bottomSheetModalRef.current.present();
    if (item.comments > 0)
      getPostComments({ variables: { token: token, postId: item._id } });
  };
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  return (
    <View className="mb-7 p-2 border-b border-gray-400">
      <View className="flex-row gap-x-4">
        <TouchableOpacity>
          <Avatar.Image
            size={55}
            source={{
              uri: `${API_URL}/assets/${item?.userProfilePicturePath}`,
            }}
          />
        </TouchableOpacity>

        <View className="flex-1">
          {/* username and date post */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-2">
              <Text className="font-bold text-[15px]">{item?.username}</Text>
              <Text className="text-[10px]">
                {dayjs(item.postDate).format("MMMM D, YYYY")}
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={22} />
            </TouchableOpacity>
          </View>
          {/* tweets */}
          <Text className="text-[14px]">
            {longTweet} {""}
            {item?.tweet?.length > 550 && !moreTweet && (
              <Text
                className="text-[16px] text-[#007fff] font-semibold"
                onPress={handleMoreTweet}
              >
                ...more
              </Text>
            )}
          </Text>
          {/* like, comment, save */}
          <View className="mt-[10px] flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity>
                <FontAwesome
                  name={isLiked ? "heart" : "heart-o"}
                  color={isLiked ? "red" : "#7d7d7d"}
                  size={18}
                />
              </TouchableOpacity>
              <Text className="text-[#7d7d7d]">{likesCount}</Text>
            </View>
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity onPress={openModal}>
                <FontAwesome name="comment-o" size={18} color={"#7d7d7d"} />
              </TouchableOpacity>
              <Text className="text-[#7d7d7d]">{item.comments}</Text>
            </View>
            {/* </View> */}
            <TouchableOpacity>
              <MaterialIcons name="ios-share" size={20} color={"#7d7d7d"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        {loading ? (
          <View className="flex-1 justify-center">
            <ActivityIndicator size="large" color="#406aff" />
          </View>
        ) : (
          <ModalComment onPress={closeModal} data={data?.getPostComments} />
        )}
      </BottomSheetModal>
    </View>
  );
}

export default memo(Tweet);