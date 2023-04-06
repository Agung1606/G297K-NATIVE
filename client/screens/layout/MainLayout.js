import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import HomeScreen from '../home/HomeScreen'
import ProfileScreen from '../profile/ProfileScreen'
import ExploreScreen from '../explore/ExploreScreen'
import MessageScreen from '../message/MessageScreen'

// ICONS
import { FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

// routing
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
const Stack = createNativeStackNavigator();

export default function MainLayout() {
  const navigation = useNavigation();
  const loggedInUserId = useSelector((state) => state.auth.user._id);

  const goToHome = () => navigation.navigate('HomeScreen');
  const goToExplore = () => navigation.navigate('ExploreScreen');
  const goToMessage = () => navigation.navigate('MessageScreen');
  const goToProfile = () => navigation.navigate('ProfileScreen', { param: loggedInUserId });

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            presentation: "modal",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="ExploreScreen"
          component={ExploreScreen}
          options={{
            presentation: "modal",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{
            presentation: "modal",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            presentation: "modal",
            animation: "none",
          }}
        />
      </Stack.Navigator>
      {/* bottom nav */}
      <View className="h-[5%] flex-row justify-around items-center m-[5px] backdrop-blur-3xl">
        <TouchableOpacity onPress={goToHome}>
          <FontAwesome name="home" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToExplore}>
          <FontAwesome name="search" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMessage}>
          <FontAwesome5 name="telegram-plane" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToProfile}>
          <MaterialIcons name="account-circle" size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
}