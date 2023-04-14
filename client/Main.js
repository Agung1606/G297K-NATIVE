import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { useSelector } from 'react-redux';

import SignIn from './screens/auth/signIn/SignIn';
import FlowRegister from './screens/auth/signUp/FlowRegister';
import MainLayout from './screens/layout/MainLayout';
import EditProfileScreen from './screens/editProfile/EditProfileScreen';
import PostScreen from './screens/postAndTweetScreen/PostScreen';
import TweetScreen from './screens/postAndTweetScreen/TweetScreen';

export default function Main() {
    const isAuth = useSelector((state) => state.auth.token);
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <>
            <Stack.Screen name="MainLayout" component={MainLayout} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="PostScreen"
              component={PostScreen}
              options={{
                presentation: "modal",
                animation: "none",
              }}
            />
            <Stack.Screen
              name="TweetScreen"
              component={TweetScreen}
              options={{
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />
          </>
        ) : (
          <Stack.Group>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="FlowRegister" component={FlowRegister} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    );
}