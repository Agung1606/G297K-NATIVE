import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

import { gql, useQuery } from "@apollo/client";

export default function Posts() {
    const token = useSelector((state) => state.auth.token);
  return (
    <View>
        <Text>Posts</Text>
    </View>
  );
}