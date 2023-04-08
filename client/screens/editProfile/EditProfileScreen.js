import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userUpdate } from '../../state/authSlice';

import { API_URL } from '@env'
// pick image
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
// icons
import { AntDesign } from '@expo/vector-icons';
// form
import { Formik } from 'formik';
// api
import { useMutation, gql } from '@apollo/client'
const EDIT_PROFILE = gql`
  mutation EditProfile(
    $token: String
    $userId: String
    $firstName: String
    $lastName: String
    $username: String
  ) {
    editProfile(
      token: $token
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      username: $username
    ) {
      userUpdated {
        _id
        firstName
        lastName
        username
      }
      postsUpdated {
        _id
        username
      }
    }
  }
`;

export default function EditProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
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

  // api
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE);
  const handleEditProfile = async (values) => {
    const result = await editProfile({
      variables: {
        token,
        userId: user._id,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
      },
    });
    dispatch(
      userUpdate({
        firstName: result.data?.editProfile?.userUpdated?.firstName,
        lastName: result.data?.editProfile?.userUpdated?.lastName,
        username: result.data?.editProfile?.userUpdated?.username,
      })
    );
    goToPreviousScreen();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* change name and username */}
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        }}
        onSubmit={handleEditProfile}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            {/* top */}
            <View className="mt-4 mx-4 flex-row justify-between items-center">
              <View className="flex-row justify-between items-center space-x-9">
                <TouchableOpacity onPress={goToPreviousScreen}>
                  <AntDesign name="close" size={35} />
                </TouchableOpacity>
                <Text className="font-semibold text-[22px]">Edit profile</Text>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={
                  user.firstName === values.firstName &&
                  user.lastName === values.lastName &&
                  user.username === values.username
                }
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#406aff" />
                ) : (
                  <AntDesign name="check" size={28} color="#406aff" />
                )}
              </TouchableOpacity>
            </View>
            {/* change profile */}
            <View className="py-10">
              <TouchableOpacity
                onPress={pickImageAsync}
                className="mx-auto space-y-3 items-center"
              >
                <Avatar.Image size={110} source={sourceImageProfile} />
                <Text className="text-blue text-lg">Change profile photo</Text>
              </TouchableOpacity>
            </View>
            {/* input */}
            <View className="mx-[13px] space-y-4">
              <TextInput
                label="First Name"
                className="bg-transparent rounded-lg"
                underlineColor="black"
                activeUnderlineColor="#406aff"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
              />
              <TextInput
                label="Last Name"
                className="bg-transparent rounded-lg"
                underlineColor="black"
                activeUnderlineColor="#406aff"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
              />
              <TextInput
                label="Username"
                className="bg-transparent rounded-lg"
                underlineColor="black"
                activeUnderlineColor="#406aff"
                value={values.username}
                onChangeText={handleChange("username")}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}