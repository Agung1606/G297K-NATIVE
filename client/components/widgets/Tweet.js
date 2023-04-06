import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, memo } from 'react'
import { Avatar } from 'react-native-paper'
import dayjs from 'dayjs'

import { API_URL } from '@env'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

function Tweet({ item }) {
  const [moreTweet, setMoreTweet] = useState(false);
  const handleMoreTweet = () => setMoreTweet(true);

  const loggedInUserId = useSelector((state) => state.auth.user._id);
  // 
  const isLiked = Boolean(item?.likes?.find(id => id === loggedInUserId));
  const longTweet = item?.tweet?.length > 550 && !moreTweet ? item?.tweet.slice(0, 550) : item?.tweet;

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
            <View className="flex-row gap-x-4">
              <TouchableOpacity>
                <FontAwesome
                  name={isLiked ? "heart" : "heart-o"}
                  color={isLiked ? "red" : undefined}
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="comment-o" size={18} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <MaterialIcons name='ios-share' size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(Tweet);