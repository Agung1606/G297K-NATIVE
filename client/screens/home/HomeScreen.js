import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

// posts screens
import PostsScreen from '../postAndTweetScreen/PostsScreen';
import TweetsScreen from '../postAndTweetScreen/TweetsScreen';

import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [screen, setScreen] = useState('Posts');
  
  const goToPosts = () => {
    setScreen('Posts');
    navigation.navigate('PostsScreen');
  };
  const goToTweets = () => {
    setScreen('Tweets')
    navigation.navigate('TweetsScreen')
  };

  // style
  const selectedStyle = "text-[15px] font-semibold border-b-[2px] border-blue";
  const notSelectedStyle = "text-[15px] text-gray-600";

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* top */}
      <View className="px-2 py-[4px] border-b border-gray-600 flex-row justify-center items-center">
        <Text className="text-xl font-itim text-deep-blue">G297K</Text>
      </View>
      <View className="px-2 py-[10px] border-b border-gray-600 flex-row justify-around items-center">
        <TouchableOpacity onPress={goToPosts}>
          <Text
            className={screen === "Posts" ? selectedStyle : notSelectedStyle}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToTweets}>
          <Text
            className={screen === "Tweets" ? selectedStyle : notSelectedStyle}
          >
            Tweets
          </Text>
        </TouchableOpacity>
      </View>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="TweetsScreen"
          component={TweetsScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}