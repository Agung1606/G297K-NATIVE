import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ModalCommentTweet({ onPress }) {
    const user = useSelector((state) => state.auth.user)
  return (
    <View>
      <Text>ModalCommentTweet</Text>
    </View>
  )
}