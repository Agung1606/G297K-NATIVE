import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '@env'
// pick image
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

// icons
import { AntDesign } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const goToPreviousScreen = () => navigation.goBack();

  // permission to take image
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [profileImage, setProfileImage] = useState(null);

  const sourceImageProfile = {
    uri: profileImage !== null
      ? profileImage
      : `${API_URL}/assets/${user?.profilePicturePath}`,
  };

  if (status === null) requestPermission();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
    });

    if(result.canceled) {
        alert('You did not select any image.');
    } else {
        setProfileImage(result.assets[0].uri);
    }
  };

  /*
  const handleEditProfile = async () => {
    
  };
  */

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* top */}
      <View className="mt-4 mx-4 flex-row justify-between items-center">
        <View className="flex-row justify-between items-center space-x-9">
          <TouchableOpacity onPress={goToPreviousScreen}>
            <AntDesign name="close" size={35} />
          </TouchableOpacity>
          <Text className="font-semibold text-[22px]">Edit profile</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="check" size={28} color="#406aff" />
        </TouchableOpacity>
      </View>
      {/* change profile */}
      <View className="py-10">
        <TouchableOpacity onPress={pickImageAsync} className="mx-auto space-y-3 items-center">
          <Avatar.Image size={110} source={sourceImageProfile} />
          <Text className="text-blue text-lg">Change profile photo</Text>
        </TouchableOpacity>
      </View>
      {/* change name and username */}
      <View className="mx-[13px] space-y-4">
        <TextInput
          label="First Name"
          value={user.firstName}
          className="bg-transparent rounded-lg"
          underlineColor="black"
          activeUnderlineColor="#406aff"
        />
        <TextInput
          label="Last Name"
          value={user.lastName}
          className="bg-transparent rounded-lg"
          underlineColor="black"
          activeUnderlineColor="#406aff"
        />
        <TextInput
          label="Username"
          value={user.username}
          className="bg-transparent rounded-lg"
          underlineColor="black"
          activeUnderlineColor="#406aff"
        />
      </View>
    </SafeAreaView>
  );
}