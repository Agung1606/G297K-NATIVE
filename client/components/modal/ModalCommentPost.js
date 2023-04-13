import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Avatar } from 'react-native-paper'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { FlatList } from 'react-native-gesture-handler'

import { API_URL } from '@env'
import { useSelector } from 'react-redux'

// api for comment
import { useMutation, useQuery, gql } from '@apollo/client'
const GET_COMMENT_POST = gql`
  query GetCommentPost($token: String, $postId: String) {
    getCommentPost(token: $token, postId: $postId) {
      _id
      username
      profilePicturePath
      comment
    }
  }
`;

const COMMENT_POST = gql`
  mutation CommentPost(
    $token: String
    $postId: String
    $username: String
    $profilePicturePath: String
    $comment: String
  ) {
    commentPost(
      token: $token
      postId: $postId
      username: $username
      profilePicturePath: $profilePicturePath
      comment: $comment
    ) {
      newComment {
        _id
        username
        profilePicturePath
        comment
      }
      postUpdated {
        _id
        comments
      }
    }
  }
`;

export default function ModalCommentPost({ onPress, postId, commentCount }) {
  const [height, setHeight] = useState(0); // for TextInput auto grow
  const [comment, setComment] = useState(''); // for comment value

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // fetching comment post
  const { data, loading: commentsLoading } = useQuery(GET_COMMENT_POST, {
    skip: commentCount === 0,
    variables: {
      token: token,
      postId: postId
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })

  // comment post
  const [commentPost, { loading }] = useMutation(COMMENT_POST, {
    fetchPolicy: "network-only",
    update(cache, { data: { commentPost} }) {
      cache.modify({
        fields: {
          getCommentPost(existingCommentPost = []) {
            const newCommentRef = cache.writeQuery({
              data: commentPost,
              query: gql`
                query CommentPost {
                  newComment {
                    _id
                    username
                    profilePicturePath
                    comment
                  }
                }
              `,
            });
            return [...existingCommentPost, newCommentRef]
          }
        }
      });
    },
  });

  const handleCommentPost = async () => {
    await commentPost({ variables: {
      token: token,
      postId: postId,
      username: user.username,
      profilePicturePath: user.profilePicturePath,
      comment: comment
    }})
    setComment('');
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
      {commentsLoading ? (
        <ActivityIndicator size="large" color="#406aff" />
      ) : (
        <FlatList
          data={data?.getCommentPost}
          renderItem={({ item }) => <Comment item={item} /> }
          keyExtractor={(item) => item._id}
        />
      )}
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