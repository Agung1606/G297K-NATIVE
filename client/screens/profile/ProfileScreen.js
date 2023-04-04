import { View, Text, Button, Pressable } from 'react-native'
import { Avatar } from 'react-native-paper';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../state/authSlice';

// api
import { useQuery, gql } from '@apollo/client';
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
    }
  }
`;

export default function ProfileScreen({ route }) {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());

  const userId = route?.params?.param;
  const token = useSelector((state) => state.auth.token);
  // data
  const { data } = useQuery(GET_USER, {
    variables: {
      token: token,
      userId: userId
    }
  });

  // USER INFORMATION
  const fullname = `${data?.getUser?.firstName} ${data?.getUser?.lastName}`;
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='mx-3'>
        <Text>close button</Text>
      </View>
      {/* wrapper */}
      <View 
        className='bg-[#d4d4d4] h-[180px] px-[10px] mx-2 mt-6 rounded-xl
          flex-row justify-between items-center'
      >
        {/* picture path and username */}
        <View className='justify-center items-center gap-y-2'>
          <Avatar.Image 
            size={95} 
            source={{uri: `http://192.168.0.106:6002/assets/${data?.getUser?.profilePicturePath}`}} 
          />
          <Text className='font-bold'>{fullname}</Text>
        </View>
        {/* wrapper info */}
        <View className='space-y-4'>
          {/* posts, followers, following */}
          <View className='flex-row items-center gap-x-[15px]'>
            <View className='justify-center items-center'>
              <Text className='text-lg font-bold'>
                16
              </Text>
              <Text>Posts</Text>
            </View>
            <View className='justify-center items-center'>
              <Text className='text-lg font-bold'>
                {data.getUser.followers}
              </Text>
              <Text>Followers</Text>
            </View>
            <View className='justify-center items-center'>
              <Text className='text-lg font-bold'>
                {data.getUser.following}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
          {/* button */}
          <Pressable className='bg-deep-blue rounded-lg'>
            <Text className='text-center text-lg font-semibold py-[2px]'>
              Edit profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}