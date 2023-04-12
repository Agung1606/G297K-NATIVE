import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Avatar } from 'react-native-paper'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { API_URL } from '@env'
import { useSelector } from 'react-redux'

// api for comment
import { useMutation, gql } from '@apollo/client'
const COMMENT_POST = gql`
  mutation CommentPost($token: String, $userId: String, $postId: String, $username: String, $profilePicturePath: String, $comment: String) {
    commentPost(
      token: $token,
      userId: $userId,
      postId: $postId,
      username: $username,
      profilePicturePath: $profilePicturePath,
      comment: $comment
    ) {
      _id
      userId
      username
      profilePicturePath
      comment
    }
  }
`;

export default function ModalCommentPost({ onPress, data, postId }) {
  const [height, setHeight] = useState(0); // for TextInput auto grow
  const [comment, setComment] = useState(''); // for comment value

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // comment post
  const [commentPost, { loading }] = useMutation(COMMENT_POST, {
    fetchPolicy: 'no-cache'
  });
  const handleCommentPost = async () => {
    await commentPost({ variables: {
      token: token,
      userId: user._id,
      postId: postId,
      username: user.username,
      profilePicturePath: user.profilePicturePath,
      comment: comment
    }})
  };

  return (
    <View className="px-2">
      <View className="flex-row justify-between px-3 pb-2 border-b border-gray-600">
        <Text className="text-xl font-bold">Comments</Text>
        <MaterialIcons name="close" size={24} onPress={onPress} />
      </View>
      <View className="pr-2 my-2 flex-row items-center gap-x-[14px]">
        <TextInput
          placeholder="Add a comment..."
          underlineColor="transparent"
          activeUnderlineColor="#3bace2"
          className={`flex-1 h-[${height}px] bg-gray-300`}
          multiline
          onContentSizeChange={(e) =>
            setHeight(e.nativeEvent.contentSize.height)
          }
          value={comment}
          onChangeText={(comment) => setComment(comment)}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#406aff" />
        ) : (
          <TouchableOpacity disabled={!comment} onPress={handleCommentPost}>
            <MaterialIcons name="send" size={26} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Comment item={item} />}
        keyExtractor={(item) => item._id}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        windowSize={15}
        removeClippedSubviews={true}
      />
    </View>
  );
}

function Comment({ item }) {
  return (
    <View className="py-2 border-t border-gray-600">
      <View className="flex-row gap-x-2">
        <TouchableOpacity>
          <Avatar.Image
            size={30}
            source={{ uri: `${API_URL}/assets/${item?.profilePicturePath}` }}
          />
        </TouchableOpacity>
        <View>
          <Text className="text-[12px] text-gray-400">{item.username}</Text>
          <Text>{item.comment}</Text>
        </View>
      </View>
    </View>
  );
}