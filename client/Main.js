import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { useSelector } from 'react-redux';

import SignIn from './screens/auth/signIn/SignIn';
import FlowRegister from './screens/auth/signUp/FlowRegister';
import MainLayout from './screens/layout/MainLayout';
import MessageScreen from './screens/message/MessageScreen';

export default function Main() {
    const isAuth = useSelector((state) => state.auth.token);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuth 
                ? <>
                    <Stack.Screen name='MainLayout' component={MainLayout} />
                    <Stack.Screen name='Message' component={MessageScreen} />
                  </>
                : <Stack.Group>
                    <Stack.Screen name='SignIn' component={SignIn} />
                    <Stack.Screen name='FlowRegister' component={FlowRegister} />
                  </Stack.Group>
            }
        </Stack.Navigator>
    )
}