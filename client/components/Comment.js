import { View, Text } from 'react-native'
import React from 'react'

export default function Comment({ item }) {
  return (
    <View>
      <Text>{item.comment}</Text>
    </View>
  )
}