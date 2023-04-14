import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '@env'
// icons
import { MaterialIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper';

export default function ModalCommentTweet({ onPress, replyingTo }) {
  const user = useSelector((state) => state.auth.user);
  const [height, setHeight] = useState(0); // for TextInput auto grow
  const [comment, setComment] = useState('') // for comment value

  const handleCommentTweet = () => alert('request comment to server');

  // 
 const sourceImageProfile = {
   uri: `${API_URL}/assets/${user?.profilePicturePath}`,
 };

  return (
    <View className="flex-1 px-4">
      {/* close and reply button */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-[${
            !comment ? "#87CEFA" : "#3399FF"
          }] px-[16px] py-[6px] rounded-full`}
          onPress={handleCommentTweet}
          disabled={!comment}
        >
          <Text className="font-semibold text-white text-[16px]">Reply</Text>
        </TouchableOpacity>
      </View>
      {/* comment */}
      <View className="mt-8 flex-row gap-x-4">
        <View className='items-center space-y-4'>
          <Avatar.Image source={sourceImageProfile} size={55} />
          <Text className='text-gray-500 text-xs'>
            {comment.length}/500
          </Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text>
            <Text className="text-gray-500">Replying to</Text>{" "}
            <Text className="text-[#3399FF]">{replyingTo}</Text>
          </Text>
          <ScrollView className="mb-20">
            <TextInput
              className={`text-lg h-[${height}px]`}
              placeholder="Tweet your reply"
              multiline
              maxLength={500}
              autoFocus={true}
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
              value={comment}
              onChangeText={(comment) => setComment(comment)}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}