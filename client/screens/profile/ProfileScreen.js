import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import React, { useRef, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';

// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// modal
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ModalSetting from '../../components/modal/ModalSetting';

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
      postsCount
    }
  }
`;

export default function ProfileScreen({ route }) {
  const dispatch = useDispatch();

  const userId = route?.params?.param;
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  // data
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      token: token,
      userId: userId
    }
  });

  // USER INFORMATION
  const fullname = `${data?.getUser?.firstName} ${data?.getUser?.lastName}`;
  const isMyProfile = loggedInUserId === userId;

  // modal
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);
  const openModal = () => {
      bottomSheetModalRef.current.present();
  }
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  if(loading){
    return <View className='flex-1 justify-center items-center'>
      <Text>Loading...</Text>
    </View>
  }
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='mx-3 my-4 flex-row justify-between items-center'>
        <TouchableOpacity onPress={openModal}>
          <MaterialIcons name='settings' size={25} />
        </TouchableOpacity>
        <Text className='text-[16px] font-semibold'>
          {data?.getUser?.username}
        </Text>
      </View>
      {/* card wrapper */}
      <View 
        className='bg-[#d4d4d4] h-[180px] px-[10px] mx-2 mb-2 rounded-xl
          flex-row justify-between items-center'
      >
        {/* picture path and username */}
        <View className='justify-center items-center gap-y-2'>
          <Avatar.Image 
            size={110} 
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
                {data.getUser.postsCount}
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
            {isMyProfile ? (
              <TouchableOpacity className='bg-deep-blue rounded-lg'>
                <Text className='text-center text-lg text-white font-semibold py-[2px]'>
                  Edit profile
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='bg-blue rounded-lg'>
                <Text className='text-center text-lg text-white font-semibold py-[2px]'>Follow</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
      <View className='mx-3'>
        <Text>agung is a good boy</Text>
      </View>

      {/* setting modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ModalSetting />
      </BottomSheetModal>
    </SafeAreaView>
  )
}