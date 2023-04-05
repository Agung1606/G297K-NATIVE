import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import HomeScreen from '../home/HomeScreen'
import ProfileScreen from '../profile/ProfileScreen'
import ExploreScreen from '../explore/ExploreScreen'

// ICONS
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// routing
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
const Stack = createNativeStackNavigator();

export default function MainLayout() {
  const navigation = useNavigation();
  const loggedInUserId = useSelector((state) => state.auth.user._id);

  const goToHome = () => navigation.navigate('HomeScreen');
  const goToExplore = () => navigation.navigate('ExploreScreen');
  const goToProfile = () => navigation.navigate('ProfileScreen', { param: loggedInUserId });

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
      <View className="h-[8%] flex-row justify-around items-center m-2 backdrop-blur-3xl">
        <TouchableOpacity onPress={goToHome}>
          <FontAwesome name="home" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToExplore}>
          <FontAwesome name="search" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToProfile}>
          <MaterialIcons name="account-circle" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
}